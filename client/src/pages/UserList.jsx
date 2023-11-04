
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function UserList() {
  const [text, setText] = useState(null);

  useEffect(() => {
    const asyncGet = async () => {
        const allUsers = await CouchFunctions.GetAllUsers();
        setText(JSON.stringify(allUsers));
    }
    asyncGet();
  }, []);

  return (
    <div className="App">
      <div>{text}</div>
      <Link to="/AddUser">Add User</Link>
    </div>
  );
}

export default UserList;
