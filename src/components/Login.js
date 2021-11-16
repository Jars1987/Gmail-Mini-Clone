import { Button } from '@mui/material';
import React from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { signInUser } from '../state/features/userSlice';

function Login() {
  const dispatch = useDispatch();
  const signIn = async () => {
    dispatch(signInUser());
  };

  return (
    <div className='Login'>
      <div className='Login__container'>
        <img
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FK-q2WRPRyxxzzPLjxHGt26swMfM%3D%2F0x0%3A1320x880%2F1200x800%2Ffilters%3Afocal(555x335%3A765x545)%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_image%2Fimage%2F67587450%2Fnewgmaillogo.0.jpg&f=1&nofb=1'
          alt=''
        />
        <Button id='googleButton' onClick={() => signIn()}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
