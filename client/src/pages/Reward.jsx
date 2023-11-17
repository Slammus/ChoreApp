
import '../App.css';
import { useEffect, useState } from "react";
import CouchFunctions from '../couch';
import { Link, useParams } from 'react-router-dom';

function Reward() {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const reward = await CouchFunctions.GetRewardByID(id);
      console.log(reward);
      setReward(reward);
      setLoading(false);
    }
    asyncGet();
  }, []);

  return (
    <div className="App">
      {loading ? <>Loading...</> : 
      <>
        <div>Reward name: {reward.rewardName}</div>
        <div>Required points: {reward.rewardRequiredPoints}</div>
        <Link to={"/reward/" + reward._id + "/edit"}>Edit</Link>
      </>
      }
    </div>
  );
}

export default Reward;
