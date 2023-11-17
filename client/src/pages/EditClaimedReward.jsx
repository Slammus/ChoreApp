
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function EditClaimedReward() {
  const [claimedReward, setClaimedReward] = useState(null);
  const [users, setUsers] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const navigate = useNavigate();

  const rewardRef = useRef(null);
  const userRef = useRef(null);
  const dateTimeRef = useRef(null);

  const {id} = useParams();

  useEffect(() => {
    const asyncGet = async () => {
      const claimedReward = await CouchFunctions.GetClaimedRewardByID(id);
      const allUsers = await CouchFunctions.GetAllUsers();
      const allRewards = await CouchFunctions.GetAllRewards();
      setClaimedReward(claimedReward);
      setUsers(allUsers);
      setRewards(allRewards);
      setLoading(false);
    }
    asyncGet();
  }, []);

  let userList = <></>;
  if(users) {
    userList = users.map((user, index) => {
        return (<option key={index} value={user.id}>{user.doc.userName}</option>);
    });
  }

  let rewardList = <></>;
  if(rewards) {
    rewardList = rewards.map((reward, index) => {
        return (<option key={index} value={reward.id}>{reward.doc.rewardName}</option>);
    });
  }

  return (
    <div className="App">
      {
        loading ? <>Loading...</> : 
        <>
          <div>Reward: <select ref={rewardRef} defaultValue={claimedReward.rewardID}>{rewardList}</select></div>
          <div>User: <select ref={userRef} defaultValue={claimedReward.userID}>{userList}</select></div>
          <div>Time:&nbsp;
            <LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker defaultValue={dayjs(claimedReward.timeCompleted)} ref={dateTimeRef} onChange={(time) => {setSelectedTime(time)}}/></LocalizationProvider>
          </div>
          
          <button onClick={async () => {
            if(!selectedTime) {
              alert("Select a time!");
              return;
            }
            await CouchFunctions.EditClaimedReward(id, rewardRef.current.value, userRef.current.value, selectedTime);
            navigate("/claimedRewards");
          }}>Edit Claimed Reward</button>
          <button onClick={async () => {
            await CouchFunctions.RemoveClaimedReward(claimedReward._id);
            navigate("/claimedRewards");
          }}>Delete Claimed Reward</button>
        </>
      }
    </div>
  );
}

export default EditClaimedReward;
