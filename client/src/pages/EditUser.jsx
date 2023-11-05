
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userNameRef = useRef(null);
  const navigate = useNavigate();

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
      {loading ? <>Loading...</> : <>
        <div>User name: <input placeholder='User name' ref={userNameRef} defaultValue={user.userName}/></div>
        <button onClick={async () => {
          await CouchFunctions.EditUser(user._id, userNameRef.current.value);
          navigate("/users");
        }}>Save User</button>
        <button onClick={async () => {
          await CouchFunctions.RemoveUser(user._id);
          navigate("/users");
        }}>Delete User</button>
      </>}
    </div>
  );
}

export default EditUser;
