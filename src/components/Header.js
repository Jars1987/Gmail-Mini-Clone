import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../state/features/userSlice';
import { auth } from '../firebase';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const signOutUser = () => {
    auth.signOut();
    dispatch(logOut());
  };
  return (
    <div className='header'>
      <div className='header__left'>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src='https://www.amocrm.com/static/images/pages/integrations/logo/gmail.png'
          alt=''
        />
      </div>
      <div className='header__middle'>
        <SearchIcon />
        <input type='text' placeholder='Search mail' />
        <ArrowDropDownIcon className='header__inputCaret' />
      </div>
      <div className='header__right'>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Avatar
          className='header__avatar'
          src={user?.photoUrl}
          onClick={signOutUser}
        />
      </div>
    </div>
  );
}

export default Header;
