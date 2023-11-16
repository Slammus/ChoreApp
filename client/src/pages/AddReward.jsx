
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate } from 'react-router-dom';

function AddReward() {
  const navigate = useNavigate();

  const rewardNameRef = useRef(null);
  const rewardRequiredPointsRef = useRef(null);

  return (
    <div className="App">
      <>
        <div>Reward name: <input placeholder='Reward name' ref={rewardNameRef}/></div>
        <div>Required points: <input placeholder="0" type="number" ref={rewardRequiredPointsRef}/></div>
        <button onClick={async () => {
          await CouchFunctions.AddReward(rewardNameRef.current.value,
                                         parseInt(rewardRequiredPointsRef.current.value));
          navigate("/rewards");
        }}>Add Reward</button>
      </>
    </div>
    
  );
}

export default AddReward;
