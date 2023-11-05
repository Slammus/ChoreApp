
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function ChoreList() {
  const [text, setText] = useState(null);
  const [chores, setChores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
      const allChores = await CouchFunctions.GetAllChores();
      setChores(allChores);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let choreList = <></>;
  if(chores) {
    choreList = chores.map((chore, index) => {
      return (<li key={index}><Link to={"/chore/" + chore.id}>{chore.doc.choreName}</Link></li>);
    });
  }

  return (
    <div className="App">
      <div>{text}</div>
      {loading ? <>Loading...</> : <><ul>{choreList}</ul></>}
      <Link to="/addChore">Add Chore</Link>
    </div>
  );
}

export default ChoreList;
