
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate, useParams } from 'react-router-dom';

function EditReward() {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const {id} = useParams();

  const rewardNameRef = useRef(null);
  const rewardRequiredPointsRef = useRef(null);

  useEffect(() => {
    const asyncGet = async () => {
      const reward = await CouchFunctions.GetRewardByID(id);
      setReward(reward);
      setLoading(false);
    }
    asyncGet();
  }, []);

  return (
    <div className="App">
      {loading ? <>Loading...</> : 
      <>
        <div>Reward name: <input placeholder='Reward name' ref={rewardNameRef} defaultValue={reward.rewardName}/></div>
        <div>Required points: <input placeholder="0" type="number" ref={rewardRequiredPointsRef} defaultValue={reward.rewardRequiredPoints}/></div>
        <button onClick={async () => {
          await CouchFunctions.EditReward(reward._id,
                                          rewardNameRef.current.value, 
                                          parseInt(rewardRequiredPointsRef.current.value));
          navigate("/rewards");
        }}>Save Reward</button>
        <button onClick={async () => {
          await CouchFunctions.RemoveReward(reward._id);
          navigate("/rewards");
        }}>Delete Reward</button>
      </>}
    </div>
  );
}

export default EditReward;
