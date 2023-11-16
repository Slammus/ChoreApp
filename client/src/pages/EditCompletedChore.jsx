
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function EditCompletedChore() {
  const [completedChore, setCompletedChore] = useState(null);
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

  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const completedChore = await CouchFunctions.GetCompletedChoreByID(id);
      const allUsers = await CouchFunctions.GetAllUsers();
      const allChores = await CouchFunctions.GetAllChores();
      setCompletedChore(completedChore);
      setUsers(allUsers);
      setChores(allChores);
      setLoading(false);
      setSelectedChore(allChores.find((chore) => chore.id == completedChore.choreID).doc);
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
          <div>Chore: <select ref={choreRef} onChange={choreChangeFn} defaultValue={completedChore.choreID}>{choreList}</select></div>
          <div>User: <select ref={userRef} defaultValue={completedChore.userID}>{userList}</select></div>
          <div>Time:&nbsp;
            <LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker defaultValue={dayjs(completedChore.timeCompleted)} ref={dateTimeRef} onChange={(time) => {setSelectedTime(time)}}/></LocalizationProvider>
          </div>
          {selectedChore && selectedChore.chorePointsPerMinute
            ? <div>Number of minutes taken:&nbsp;<input type="number" defaultValue={completedChore.minutesTaken} ref={numMinsRef}/></div>
            : <></>
          }
          <div>Notes: <textarea placeholder='Notes' cols={100} rows={10} ref={notesRef} defaultValue={completedChore.notes}></textarea></div>
          
          <button onClick={async () => {
            if(!selectedTime) {
              alert("Select a time!");
              return;
            }
            await CouchFunctions.EditCompletedChore(id, choreRef.current.value, userRef.current.value, selectedTime, numMinsRef.current ? parseFloat(numMinsRef.current.value) : 0, notesRef.current.value);
            navigate("/completedChores");
          }}>Edit Completed Chore</button>
          <button onClick={async () => {
            await CouchFunctions.RemoveCompletedChore(completedChore._id);
            navigate("/completedChores");
          }}>Delete Completed Chore</button>
        </>
      }
    </div>
    
  );
}

export default EditCompletedChore;
