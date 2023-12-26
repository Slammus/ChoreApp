
import '../App.css';
import { useEffect, useState } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function CompletedChoreList() {
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
      const choreDetails = allChores.find((choreItem) => completedChore.choreID == choreItem.id).doc;
      const userDetails = allUsers.find((userItem) => completedChore.userID == userItem.id).doc;
      const formattedTime = dayjs(completedChore.timeCompleted).format("HH:mm:ss[ on ]dddd[ ]DD-MM-YYYY");
      return (<li key={index}>
        {choreDetails.choreName} done by {userDetails.userName} at {formattedTime} for {choreDetails.chorePointsPerMinute ? choreDetails.chorePoints * completedChore.minutesTaken : choreDetails.chorePoints} points {choreDetails.chorePointsPerMinute ? "(" + completedChore.minutesTaken + " minutes)" : ""}&nbsp;
        <Link to={"/completedChore/" + completedChore._id + "/edit"}>Edit</Link>
      </li>);
    })
  }

  return (
    <div className="App">
      { loading ? <>Loading...</> : <><ul>{choreList}</ul></> }
    </div>
  );
}

export default CompletedChoreList;
