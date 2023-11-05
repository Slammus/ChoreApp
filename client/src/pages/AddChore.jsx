
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate } from 'react-router-dom';

function AddChore() {
  const [text, setText] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const choreNameRef = useRef(null);
  const chorePointsRef = useRef(null);
  const chorePointsPerMinuteRef = useRef(null);
  const choreAssigneeRef = useRef(null);
  const choreInstructionsRef = useRef(null);

  useEffect(() => {
    const asyncGet = async () => {
      const allUsers = await CouchFunctions.GetAllUsers();
      setUsers(allUsers);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let userList = <></>;
  if(users) {
    userList = users.map((user, index) => {
        return (<option key={index} value={user.id}>{user.doc.userName}</option>);
    });
    userList.unshift((<option key={-1} value={0}>None</option>));
  }

  return (
    <div className="App">
      {
        loading ? <>Loading...</> : 
        <>
          <div>Chore name: <input placeholder='Chore name' ref={choreNameRef}/></div>
          <div>Points: <input placeholder="0" type="number" ref={chorePointsRef}/> Per minute?: <input type="checkbox" ref={chorePointsPerMinuteRef}/></div>
          <div>Assignee: <select ref={choreAssigneeRef}>{userList}</select></div>
          <div>Instructions: <textarea placeholder='Instructions' cols={100} rows={10} ref={choreInstructionsRef}></textarea></div>
          <button onClick={async () => {
            await CouchFunctions.AddChore(choreNameRef.current.value, 
                                          parseFloat(chorePointsRef.current.value), 
                                          chorePointsPerMinuteRef.current.value == "on", 
                                          choreAssigneeRef.current.value, 
                                          choreInstructionsRef. 
                                          current.value);
            //navigate("/chores");
          }}>Add Chore</button>
        </>
      }
    </div>
    
  );
}

export default AddChore;
