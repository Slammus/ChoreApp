
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AddCompletedChore() {
  const [text, setText] = useState(null);
  const [users, setUsers] = useState(null);
  const [chores, setChores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChore, setSelectedChore] = useState(null);
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const navigate = useNavigate();

  const choreRef = useRef(null);
  const userRef = useRef(null);
  const dateTimeRef = useRef(null);
  const notesRef = useRef(null);
  const numMinsRef = useRef(null);

  useEffect(() => {
    const asyncGet = async () => {
      const allUsers = await CouchFunctions.GetAllUsers();
      const allChores = await CouchFunctions.GetAllChores();
      if(allChores.length > 0) {
        setSelectedChore(allChores[0].doc);
      }
      setUsers(allUsers);
      setChores(allChores);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let userList = <></>;
  if(users) {
    userList = users.map((user, index) => {
        return (<option key={index} value={user.id}>{user.doc.userName}</option>);
    });
  }

  let choreList = <></>;
  if(chores) {
    choreList = chores.map((chore, index) => {
        return (<option key={index} value={chore.id}>{chore.doc.choreName}</option>);
    });
  }

  const choreChangeFn = (event) => {
    setSelectedChore(chores.find((chore) => chore.id == event.target.value).doc);
  }

  return (
    <div className="App">
      {
        loading ? <>Loading...</> : 
        <>
          <div>Chore: <select ref={choreRef} onChange={choreChangeFn}>{choreList}</select></div>
          <div>User: <select ref={userRef}>{userList}</select></div>
          <div>Time:&nbsp;
            <LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker value={selectedTime} ref={dateTimeRef} onChange={(time) => {setSelectedTime(time)}}/></LocalizationProvider>
          </div>
          {selectedChore && selectedChore.chorePointsPerMinute
            ? <div>Number of minutes taken:&nbsp;<input type="number" defaultValue={5} ref={numMinsRef}/></div>
            : <></>
          }
          <div>Notes: <textarea placeholder='Notes' cols={100} rows={10} ref={notesRef}></textarea></div>
          
          <button onClick={async () => {
            if(!selectedTime) {
              alert("Select a time!");
              return;
            }
            await CouchFunctions.AddCompletedChore(choreRef.current.value, userRef.current.value, selectedTime, numMinsRef.current ? parseFloat(numMinsRef.current.value) : 0, notesRef.current.value);
            navigate("/completedChores");
          }}>Complete Chore</button>
        </>
      }
    </div>
    
  );
}

export default AddCompletedChore;