import { Checkbox, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './EmailList.css';
import { useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from '../state/features/mailSlice';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RedoIcon from '@mui/icons-material/Redo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';

function EmailList() {
  const [emails, setEmails] = useState([]);
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);

  const fetchMails = async () => {
    const q = query(collection(db, 'mail'), orderBy('timeStamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.docs.forEach(doc => {
      data.push({ id: doc.id, data: doc.data() });
    });

    setEmails([...data]);
  };

  /* *********
  EmailList was not re-rendering when I sent a new email
  This happened because there was nothing to watch for db updates
  Since when an email is sent the db updates we use the redux state sendMessageIsOpen to re-render the component
  ********** */

  useEffect(() => {
    fetchMails();
  }, [sendMessageIsOpen]);

  const emailRows = () =>
    emails.map(({ id, data: { to, subject, message, timeStamp } }) => (
      <EmailRow
        title={to}
        subject={subject}
        description={message}
        time={new Date(timeStamp?.seconds * 1000).toUTCString()}
        id={id}
        key={id}
      />
    ));

  return (
    <div className='emailList'>
      <div className='emailList__settings'>
        <div className='emailList__settingsLeft'>
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className='emailList__settingsRigth'>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className='emailList__section'>
        <Section Icon={InboxIcon} title='Primary' color='red' selected />
        <Section Icon={PeopleIcon} title='Social' color='#1a73e8' />
        <Section Icon={LocalOfferIcon} title='Promotions' color='green' />
      </div>

      <div className='emailList__List'>{emailRows()}</div>
    </div>
  );
}

export default EmailList;
