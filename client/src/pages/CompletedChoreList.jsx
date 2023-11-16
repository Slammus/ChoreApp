
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function CompletedChoreList() {
  const [text, setText] = useState(null);
  const [completedChores, setCompletedChores] = useState(null);
  const [allChores, setAllChores] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
      const allCompletedChores = await CouchFunctions.GetAllCompletedChores();
      const allChores = await CouchFunctions.GetAllChores();
      const allUsers = await CouchFunctions.GetAllUsers();
      setCompletedChores(allCompletedChores);
      setAllUsers(allUsers);
      setAllChores(allChores);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let choreList = <></>;
  if(completedChores) {
    choreList = completedChores.map((completedChore, index) => {
      const choreDetails = allChores.find((choreItem) => completedChore.doc.choreID == choreItem.id).doc;
      const userDetails = allUsers.find((userItem) => completedChore.doc.userID == userItem.id).doc;
      const formattedTime = dayjs(completedChore.doc.timeCompleted).format("HH:mm:ss[ on ]dddd[ ]DD-MM-YYYY");
      return (<li key={index}>
        {choreDetails.choreName} done by {userDetails.userName} at {formattedTime} for {choreDetails.chorePointsPerMinute ? choreDetails.chorePoints * completedChore.doc.minutesTaken : choreDetails.chorePoints} points {choreDetails.chorePointsPerMinute ? "(" + completedChore.doc.minutesTaken + " minutes)" : ""}&nbsp;
        <Link to={"/completedChore/" + completedChore.id + "/edit"}>Edit</Link>
      </li>);
    })
  }

  return (
    <div className="App">
      <div>{text}</div>
      { loading ? <>Loading...</> : <><ul>{choreList}</ul></> }
    </div>
  );
}

export default CompletedChoreList;
