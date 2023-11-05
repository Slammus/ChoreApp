
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate, useParams } from 'react-router-dom';

function EditChore() {
  const [chore, setChore] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const {id} = useParams();

  const choreNameRef = useRef(null);
  const chorePointsRef = useRef(null);
  const chorePointsPerMinuteRef = useRef(null);
  const choreAssigneeRef = useRef(null);
  const choreInstructionsRef = useRef(null);

  useEffect(() => {
    const asyncGet = async () => {
      const chore = await CouchFunctions.GetChoreByID(id);
      const allUsers = await CouchFunctions.GetAllUsers();
      setChore(chore);
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
      {loading ? <>Loading...</> : 
      <>
        <div>Chore name: <input placeholder='Chore name' ref={choreNameRef} defaultValue={chore.choreName}/></div>
        <div>Points: <input placeholder="0" type="number" ref={chorePointsRef} defaultValue={chore.chorePoints}/> Per minute?: <input type="checkbox" ref={chorePointsPerMinuteRef} defaultChecked={chore.chorePointsPerMinute ? true : null}/></div>
        <div>Assignee: <select ref={choreAssigneeRef} defaultValue={chore.choreAssigneeID ? chore.choreAssigneeID : -1}>{userList}</select></div>
        <div>Instructions: <textarea placeholder='Instructions' cols={100} rows={10} ref={choreInstructionsRef} defaultValue={chore.choreInstructions}></textarea></div>
        <button onClick={async () => {
          await CouchFunctions.EditChore( chore._id,
                                          choreNameRef.current.value, 
                                          parseFloat(chorePointsRef.current.value), 
                                          chorePointsPerMinuteRef.current.value == "on", 
                                          choreAssigneeRef.current.value, 
                                          choreInstructionsRef.current.value);
          navigate("/chores");
        }}>Save Chore</button>
        <button onClick={async () => {
          await CouchFunctions.RemoveChore(chore._id);
          navigate("/chores");
        }}>Delete Chore</button>
      </>}
    </div>
  );
}

export default EditChore;
