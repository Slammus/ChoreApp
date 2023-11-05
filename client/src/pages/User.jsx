
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link, useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const user = await CouchFunctions.GetUserByID(id);
      setUser(user);
      setLoading(false);
    }
    asyncGet();
  }, []);

  return (
    <div className="App">
      {loading ? <>Loading...</> : 
      <>
        <div>User name: {user.userName}</div>
        <div>Points: {user.currentPoints}</div>
        <Link to={"/user/" + id + "/edit"}>Edit</Link>
      </>
      }
    </div>
  );
}

export default User;
