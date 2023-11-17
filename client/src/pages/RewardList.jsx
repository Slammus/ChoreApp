
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function RewardList() {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGet = async () => {
        const allRewards = await CouchFunctions.GetAllRewards();
        setRewards(allRewards);
        setLoading(false);
    }
    asyncGet();
  }, []);

  let rewardList = <></>;
  if(rewards) {
    rewardList = rewards.map((reward, index) => {
        return (<li key={index}><Link to={"/reward/" + reward.id}>{reward.doc.rewardName}</Link></li>);
    })
  }

  return (
    <div className="App">
      { loading ? <>Loading...</> : <><ul>{rewardList}</ul></> }
      <Link to="/addReward">Add Reward</Link>
    </div>
  );
}

export default RewardList;
