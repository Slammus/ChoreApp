
import '../App.css';
import { useEffect, useState } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chores, setChores] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [allCompletedChores, setAllCompletedChores] = useState(null);
  const [allClaimedRewards, setAllClaimedRewards] = useState(null);

  useEffect(() => {
    const asyncGet = async () => {
      const allUsers = await CouchFunctions.GetAllUsers();
      const allChores = await CouchFunctions.GetAllChores();
      const allRewards = await CouchFunctions.GetAllRewards();
      const allCompletedChores = await CouchFunctions.GetAllCompletedChores();
      const allClaimedRewards = await CouchFunctions.GetAllClaimedRewards();
      setUsers(allUsers);
      setChores(allChores);
      setRewards(allRewards);
      setAllCompletedChores(allCompletedChores);
      setAllClaimedRewards(allClaimedRewards);
      setLoading(false);
    }
    asyncGet();
  }, []);

  if(loading) {
    return (<>Loading...</>);
  }

  const choresByUser = {};
  const rewardsByUser = {};
  for(let user of users) {
    choresByUser[user.id] = [];
    rewardsByUser[user.id] = []; 
  }

  for(let completedChore of allCompletedChores) {
    choresByUser[completedChore.doc.userID].push(completedChore);
  }


  for(let claimedReward of allClaimedRewards) {
    rewardsByUser[claimedReward.doc.userID].push(claimedReward);
  }

  let userList = <></>;
  if(users) {
    userList = users.map((user, index) => {
      let pointsTotal = 0;
      for(let chore of choresByUser[user.id]) {
        const choreDetails = chores.find((choreItem) => chore.doc.choreID == choreItem.id).doc;
        pointsTotal += choreDetails.chorePointsPerMinute ? choreDetails.chorePoints * chore.doc.minutesTaken : choreDetails.chorePoints;
      }
      for(let reward of rewardsByUser[user.id]) {
        const rewardDetails = rewards.find((rewardItem) => reward.doc.rewardID == rewardItem.id).doc;
        pointsTotal -= rewardDetails.rewardRequiredPoints;
      }
      return (<li key={index}><Link to={"/user/" + user.id}>{user.doc.userName} ({pointsTotal} points)</Link></li>);
    });
  }

  return (
    <div className="App">
      <ul>{userList}</ul>
      <Link to="/AddUser">Add User</Link>
    </div>
  );
}

export default UserList;
