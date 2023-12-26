
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ChoreList() {
  const [chores, setChores] = useState(null);
  const [completedChores, setCompletedChores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
      const allChores = await CouchFunctions.GetAllChores();
      const allCompletedChores = await CouchFunctions.GetAllCompletedChores();
      setChores(allChores);
      setCompletedChores(allCompletedChores);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let choreList = <></>;
  if(chores) {
    const choreByID = {};
    for(const chore of completedChores) {
      if(!choreByID[chore.choreID] || chore.timeCompleted > choreByID[chore.choreID].timeCompleted) {
        choreByID[chore.choreID] = chore;
      }
    }

    choreList = chores.map((chore, index) => {
      const formattedTime = choreByID[chore.id] ? dayjs(choreByID[chore.id].doc.timeCompleted).format("HH:mm:ss[ on ]dddd[ ]DD-MM-YYYY") : "Never";
      return (<li key={index}><Link to={"/chore/" + chore.id}>{chore.doc.choreName}</Link> (Last completed: {formattedTime})</li>);
    });
  }

  return (
    <div className="App">
      {loading ? <>Loading...</> : <><ul>{choreList}</ul></>}
      <Link to="/addChore">Add Chore</Link>
    </div>
  );
}

export default ChoreList;
