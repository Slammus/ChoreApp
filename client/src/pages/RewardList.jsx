
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { Link } from 'react-router-dom';

function RewardList() {
  const [text, setText] = useState(null);
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
    rewardList = rewards.map((reward) => {
        return (<li><Link to={"/reward/" + reward.id}>{reward.doc.rewardName}</Link></li>);
    })
  }

  return (
    <div className="App">
      <div>{text}</div>
      { loading ? <>Loading...</> : <><ul>{rewardList}</ul></> }
      <Link to="/addReward">Add Reward</Link>
    </div>
  );
}

export default RewardList;
