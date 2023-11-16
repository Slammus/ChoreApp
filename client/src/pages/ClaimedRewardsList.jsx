
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ClaimedRewardsList() {
  const [claimedRewards, setClaimedRewards] = useState(null);
  const [allRewards, setAllRewards] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
      const allClaimedRewards = await CouchFunctions.GetAllClaimedRewards();
      const allRewards = await CouchFunctions.GetAllRewards();
      const allUsers = await CouchFunctions.GetAllUsers();
      setClaimedRewards(allClaimedRewards);
      setAllUsers(allUsers);
      setAllRewards(allRewards);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let claimedRewardList = <></>;
  if(claimedRewards) {
    claimedRewardList = claimedRewards.map((claimedReward, index) => {
      const rewardDetails = allRewards.find((rewardItem) => claimedReward.doc.rewardID == rewardItem.id).doc;
      const userDetails = allUsers.find((userItem) => claimedReward.doc.userID == userItem.id).doc;
      const formattedTime = dayjs(claimedReward.doc.timeCompleted).format("HH:mm:ss[ on ]dddd[ ]DD-MM-YYYY");
      return (<li key={index}>
        {rewardDetails.rewardName} claimed by {userDetails.userName} at {formattedTime}&nbsp;
        <Link to={"/claimedReward/" + claimedReward.id + "/edit"}>Edit</Link>
      </li>);
    })
  }

  return (
    <div className="App">
      { loading ? <>Loading...</> : <><ul>{claimedRewardList}</ul></> }
    </div>
  );
}

export default ClaimedRewardsList;
