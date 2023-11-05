
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [text, setText] = useState(null);
  const userNameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <div>User name: <input placeholder='User name' ref={userNameRef}/></div>
      <button onClick={async () => {
        await CouchFunctions.AddUser(userNameRef.current.value);
        navigate("/users");
      }}>Add User</button>
    </div>
  );
}

export default AddUser;
