
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function CompletedChoreList() {
  const [text, setText] = useState(null);
  const [chores, setChores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
        const allCompletedChores = await CouchFunctions.GetAllCompletedChores();
        setChores(allCompletedChores);
        setLoading(false);
    }
    asyncGet();
  }, []);

  let choreList = <></>;
  if(chores) {
    choreList = chores.map((chore) => {
        return (<li>{chore.doc.choreName}</li>);
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
