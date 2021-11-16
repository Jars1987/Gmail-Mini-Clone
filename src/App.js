import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Mail from './components/Mail';
import EmailList from './components/EmailList';
import SendMail from './components/SendMail';
import { useSelector, useDispatch } from 'react-redux';
import { selectSendMessageIsOpen } from './state/features/mailSlice';
import { logIn, selectUser } from './state/features/userSlice';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          logIn({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!currentUser ? (
        <>
          <Login />
        </>
      ) : (
        <div className='app'>
          <Header />

          <div className='app__body'>
            <Sidebar />
            <Routes>
              <Route path='/mail' element={<Mail />} />
              <Route exact path='/' element={<EmailList />} />
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
