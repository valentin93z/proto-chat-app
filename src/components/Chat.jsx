import { Avatar, Button, Container, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../firebaseConfig';


const Chat = () => {

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  
  const isMounted = useRef();

  const [user] = useAuthState(auth);
  const collectionRef = collection(database, 'messages');

  const sendMessage = () => {
    addDoc(collectionRef, {
      uid:  user.uid,
      time: String(new Date(Date.now())),
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      value: value,
    })
    .then(() => {
      setValue('');
      scrollDown();
    })
    .catch(() => {
      alert('Message is not send');
    })
  };

  const getMessages = () => {
    onSnapshot(collectionRef, (data) => {
      setMessages(data.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      }))
    })
  };

  const scrollDown = () => {
    let chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  }


  const getTime = (dateStr) => {

    const time = new Date(dateStr);
  
    const year = time.getFullYear();
    const month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    const day = time.getDate() + 1 < 10 ? `0${time.getDate() + 1}` : time.getDate() + 1;

    const hours = time.getHours() + 1 < 10 ? `0${time.getHours() + 1}` : time.getHours() + 1;
    const minutes = time.getMinutes() + 1 < 10 ? `0${time.getMinutes() + 1}` : time.getMinutes() + 1;

    const currentDate = new Date(Date.now());

    if (currentDate.getFullYear() === time.getFullYear() &&
        currentDate.getMonth() === time.getMonth() &&
        currentDate.getDate() === time.getDate()) {
          return `${hours}:${minutes}`;
        } else {
          return `${day}-${month}-${year} ${hours}:${minutes}`
        }
  }


  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getMessages();
  }, [messages]);

  useEffect(() => {
    setTimeout(scrollDown, 1000);
  }, []);

  return (
      <div className='chat__container'>
        <div className='chat' id='chat'>
          <div className='chat__messages'>
            {messages.sort((m1, m2) => m1.time > m2.time ? 1 : -1).map((message) =>
              <div className={user.uid === message.uid ? 'chat__message message-wrap-right' : 'chat__message message-wrap-left'}
                key={message.id}
                style={{
                  alignSelf: user.uid === message.uid ? 'flex-end' : 'flex-start',
                  justifyContent: user.uid === message.uid ? 'flex-end' : 'flex-start',
                }}
              >
                <Avatar alt={message.displayName} src={message.photoURL} />
                <div className='chat__message-text'>
                  <p className='message__value'>{message.value}</p>
                  <p className='message__time'>{getTime(message.time)}</p>
                  <div className={user.uid === message.uid ? 'triangle triangle-right' : 'triangle triangle-left'}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='chat__input'>
          <TextField
            fullWidth variant='outlined' 
            maxRows={2}
            style={{margin: '10px 0'}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={sendMessage} variant='contained'>Send</Button>
        </div>
      </div>
  )
}

export default Chat;