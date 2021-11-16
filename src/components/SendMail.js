import React from 'react';
import './SendMail.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from '../state/features/mailSlice';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function SendMail() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async formData => {
    const docRef = await addDoc(collection(db, 'mail'), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timeStamp: serverTimestamp(),
    });
    console.log(docRef);
    dispatch(closeSendMessage());
  };

  return (
    <div className='sendMail'>
      <div className='sendMail__header'>
        <h3>New Message</h3>
        <CloseIcon
          className='sendMail__close'
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('to', { required: true })}
          placeholder='To'
          type='email'
        />
        {errors.to && <p className='sendMail__error'>To is required!</p>}
        <input
          placeholder='Subject'
          type='text'
          {...register('subject', { required: true })}
        />
        {errors.subject && <p className='sendMail__error'>To is required!</p>}

        <input
          {...register('message', { required: true })}
          placeholder='Message...'
          type='text'
          className='sendMail__message'
        />
        {errors.message && <p className='sendMail__error'>To is required!</p>}

        <div className='sendMail__options'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='sendMail__send'>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
