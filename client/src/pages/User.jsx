
import '../App.css';
import { useEffect, useState } from "react";
import CouchFunctions from '../couch';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

function User() {
  const [user, setUser] = useState(null);
  const [completedChores, setCompletedChores] = useState(null);
  const [allChores, setAllChores] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const user = await CouchFunctions.GetUserByID(id);
      const allCompletedChores = await CouchFunctions.GetAllCompletedChores();
      const allChores = await CouchFunctions.GetAllChores();
      setCompletedChores(allCompletedChores);
      setUser(user);
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
      const formattedDate = dayjs(completedChore.timeCompleted).format("dddd[ ]MMM D, YYYY");
      const formattedTime = dayjs(completedChore.timeCompleted).format("h:mm A");
      const timeChanged = formattedDate !== prevFormattedDate;
      if(id !== completedChore.userID) {
        return (<></>);
      } else {
        prevFormattedDate = formattedDate;
      }
      return (<>
        {timeChanged ? <><br/><div className='completedChoreDate'>{formattedDate}</div></> : ""}
        <li key={index}>
          <span className='completedChoreDate'>{formattedTime}:</span> {choreDetails.choreName} for {choreDetails.chorePointsPerMinute ? choreDetails.chorePoints * completedChore.minutesTaken : choreDetails.chorePoints} points {choreDetails.chorePointsPerMinute ? "(" + completedChore.minutesTaken + " minutes)" : ""}&nbsp;
          <Link to={"/completedChore/" + completedChore._id + "/edit"}>Edit</Link>
        </li>
      </>);
    });
  }

  return (
    <div className="App">
      {loading ? <>Loading...</> : 
        <>
          <div>User name: {user.userName}</div>
          <div>Points: {user.currentPoints}</div>
          <Link to={"/user/" + id + "/edit"}>Edit</Link>
          <hr/>
          <div style={{textAlign:"left"}}>{choreList}</div>
        </>
      }
    </div>
  );
}

export default User;
