import React, { useContext, useReducer } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import desFunctions from '../util/des';
import vigenereFunctions from '../util/vigenere';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  // const desKey = process.env.REACT_APP_DES_KEY
  // const vigKey = process.env.REACT_APP_VIG_KEY

  console.log(message);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageInfo'>
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='people'></img>
        <span>just now</span>
      </div>

      <div className='messageContent'>
      <p>{desFunctions.decrypt(vigenereFunctions.decrypt(message.text, "abc"), "abc")}</p>  
      </div>
    </div>
  )
}

export default Message