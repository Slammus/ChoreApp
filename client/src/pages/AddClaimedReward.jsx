
import '../App.css';
import { useEffect, useState, useRef } from "react";
import CouchFunctions from '../couch';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AddClaimedReward() {
  const [users, setUsers] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const navigate = useNavigate();

  const rewardRef = useRef(null);
  const userRef = useRef(null);
  const dateTimeRef = useRef(null);

  useEffect(() => {
    const asyncGet = async () => {
      const allUsers = await CouchFunctions.GetAllUsers();
      const allRewards = await CouchFunctions.GetAllRewards();
      console.log(allRewards);
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
          <div>Reward: <select ref={rewardRef}>{rewardList}</select></div>
          <div>User: <select ref={userRef}>{userList}</select></div>
          <div>Time:&nbsp;
            <LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker value={selectedTime} ref={dateTimeRef} onChange={(time) => {setSelectedTime(time)}}/></LocalizationProvider>
          </div>
          
          <button onClick={async () => {
            if(!selectedTime) {
              alert("Select a time!");
              return;
            }
            await CouchFunctions.AddClaimedReward(rewardRef.current.value, userRef.current.value, selectedTime);
            navigate("/claimedRewards");
          }}>Claim Reward</button>
        </>
      }
    </div>
    
  );
}

export default AddClaimedReward;
