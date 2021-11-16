import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './EmailRow.css';
import { selectMail } from '../state/features/mailSlice';
import { Checkbox, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

function EmailRow({ title, subject, description, time, id }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const openMail = () => {
    dispatch(selectMail({ title, subject, description, time, id }));
    navigate('/mail');
  };

  return (
    <div onClick={openMail} className='emailRow'>
      <div className='emalRow__options'>
        <Checkbox />
        <IconButton>
          <StarBorderIcon />
        </IconButton>
        <IconButton>
          <LabelImportantIcon />
        </IconButton>
      </div>
      <h3 className='emailRow__title'>{title}</h3>
      <div className='emailRow__message'>
        <h4>
          {subject}{' '}
          <span className='emailRow__description'> - {description}</span>
        </h4>
      </div>
      <div className='emailRow__time'>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default EmailRow;
