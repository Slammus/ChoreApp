
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
import AddCompletedChore from './pages/AddCompletedChore';
import EditCompletedChore from './pages/EditCompletedChore';
import Reward from './pages/Reward';
import EditReward from './pages/EditReward';
import AddClaimedReward from './pages/AddClaimedReward';
import ClaimedRewardsList from './pages/ClaimedRewardsList';
import EditClaimedReward from './pages/EditClaimedReward';

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
            <Link to="/claimedRewards">Claimed Rewards List</Link>
          </li>
          <li>
            <Link to="/rewards">Rewards List</Link>
          </li>
          <li>
            <Link to="/completeChore">Complete a chore</Link>
          </li>
          <li>
            <Link to="/claimReward">Claim a reward</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/" element={<ChoreList />}/>
          <Route path="/chores" element={<ChoreList />}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/completedChores" element={<CompletedChoreList/>}/>
          <Route path="/rewards" element={<RewardList/>}/>
          <Route path="/claimedRewards" element={<ClaimedRewardsList/>}/>

          <Route path="/completeChore" element={<AddCompletedChore/>}/>
          <Route path="/claimReward" element={<AddClaimedReward/>}/>

          <Route path="/addChore" element={<AddChore/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/addReward" element={<AddReward/>}/>

          <Route path="/chore/:id" element={<Chore/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/reward/:id" element={<Reward/>}/>

          <Route path="/chore/:id/edit" element={<EditChore/>}/>
          <Route path="/user/:id/edit" element={<EditUser/>}/>
          <Route path="/completedChore/:id/edit" element={<EditCompletedChore/>}/>
          <Route path="/reward/:id/edit" element={<EditReward/>}/>
          <Route path="/claimedReward/:id/edit" element={<EditClaimedReward/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
