
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';

function AddChore() {
  const [text, setText] = useState(null);

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <div>Add a chore here bro</div>
    </div>
  );
}

export default AddChore;
