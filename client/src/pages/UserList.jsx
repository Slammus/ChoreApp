
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function UserList() {
  const [text, setText] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
        const allUsers = await CouchFunctions.GetAllUsers();
        setUsers(allUsers);
        setLoading(false);
    }
    asyncGet();
  }, []);

  let userList = <></>;
  if(users) {
    userList = users.map((user, index) => {
        return (<li key={index}><Link to={"/user/" + user.id}>{user.doc.userName}</Link></li>);
    });
  }

  return (
    <div className="App">
      <div>{text}</div>
      { loading ? <>Loading...</> : <><ul>{userList}</ul></> }
      <Link to="/AddUser">Add User</Link>
    </div>
  );
}

export default UserList;
