
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import ChoreList from './pages/ChoreList';
import UserList from './pages/UserList';
import AddChore from './pages/AddChore';
import AddUser from './pages/AddUser';
import CompletedChoreList from './pages/CompletedChoreList';
import RewardList from './pages/RewardList';
import AddReward from './pages/AddReward';
import Chore from './pages/Chore';
import User from './pages/User';
import EditUser from './pages/EditUser';
import EditChore from './pages/EditChore';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/chores">Chore List</Link>
          </li>
          <li>
            <Link to="/users">User List</Link>
          </li>
          <li>
            <Link to="/completedChores">Completed Chores List</Link>
          </li>
          <li>
            <Link to="/rewards">Rewards List</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/" element={<ChoreList />}/>
          <Route path="/chores" element={<ChoreList />}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/completedChores" element={<CompletedChoreList/>}/>
          <Route path="/rewards" element={<RewardList/>}/>

          <Route path="/addChore" element={<AddChore/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/addReward" element={<AddReward/>}/>

          <Route path="/chore/:id" element={<Chore/>}/>
          <Route path="/user/:id" element={<User/>}/>

          <Route path="/chore/:id/edit" element={<EditChore/>}/>
          <Route path="/user/:id/edit" element={<EditUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

/*  return (
    <div className="App">
      <div>{text}</div>

      <button onClick={async () => {
        const allDocs = await CouchFunctions.GetAll();
        setText(JSON.stringify(allDocs));
      }}>Get Chore List</button>

      <input ref={choreNameRef}/>
      <input type="number" ref={chorePointsRef}/>
      <button onClick={async () => {
        const response = await CouchFunctions.AddChore(choreNameRef.current.value, parseInt(chorePointsRef.current.value));
        setText(JSON.stringify(response));
      }}>Add Chore</button>

    </div>
  );*/

export default App;
