
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link, useParams } from 'react-router-dom';

function Chore() {
  const [chore, setChore] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const chore = await CouchFunctions.GetChoreByID(id);
      setChore(chore);
      if(chore.choreAssignee) {
        const assignee = await CouchFunctions.GetUserByID(chore.choreAssigneeID);
        setAssignee(assignee);
      }
      setLoading(false);
    }
    asyncGet();
  }, []);

  return (
    <div className="App">
      {loading ? <>Loading...</> : 
      <>
        <div>User name: {chore.choreName}</div>
        <div>Points: {chore.chorePoints} {chore.chorePointsPerMinute ? " per minute" : ""}</div>
        <div>Assignee: {assignee ? assignee.userName : "None"}</div>
        <div>Instructions: {chore.choreInstructions}</div>
        <Link to={"/chore/" + chore._id + "/edit"}>Edit</Link>
      </>
      }
    </div>
  );
}

export default Chore;
