
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
    let prevFormattedDate = null;
    choreList = completedChores.map((completedChore, index) => {
      const choreDetails = allChores.find((choreItem) => completedChore.choreID == choreItem.id).doc;
      const userDetails = allUsers.find((userItem) => completedChore.userID == userItem.id).doc;
      const formattedDate = dayjs(completedChore.timeCompleted).format("dddd[ ]MMM D, YYYY");
      const formattedTime = dayjs(completedChore.timeCompleted).format("h:mm A");
      const timeChanged = formattedDate !== prevFormattedDate;
      prevFormattedDate = formattedDate;
      return (<>
        {timeChanged ? <><br/><div className='completedChoreDate'>{formattedDate}</div></> : ""}
        <li key={index}>
          <span className='completedChoreDate'>{formattedTime}:</span> {choreDetails.choreName} done by <span className='completedChoreDate'>{userDetails.userName}</span> for {choreDetails.chorePointsPerMinute ? choreDetails.chorePoints * completedChore.minutesTaken : choreDetails.chorePoints} points {choreDetails.chorePointsPerMinute ? "(" + completedChore.minutesTaken + " minutes)" : ""}&nbsp;
          <Link to={"/completedChore/" + completedChore._id + "/edit"}>Edit</Link>
        </li>
      </>);
    });
  }

  return (
    <div className="App">
      { loading ? <>Loading...</> : <><ul style={{textAlign:"left"}}>{choreList}</ul></> }
    </div>
  );
}

export default CompletedChoreList;
