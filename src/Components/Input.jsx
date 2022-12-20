import { arrayUnion, Timestamp, updateDoc, doc, serverTimestamp} from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {v4 as uuid} from "uuid"
import vigenereFunctions from "../util/vigenere"
import desFunctions from '../util/des';

const Input = () => {
  const [text, setText] = useState("")
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  // const desKey = process.env.REACT_APP_DES_KEY
  // const vigKey = process.env.REACT_APP_VIG_KEY

  const handleSend = async() => { 
    await updateDoc(doc(db, "chats", data.chatId), { 
      messages: arrayUnion({ 
        id: uuid(), 
        text: vigenereFunctions.encrypt(desFunctions.encrypt(text, "abc"), "abc"), 
        senderId: currentUser.uid, 
        date: Timestamp.now()
      })
    })
    setText("")
  }

  return (
    <div className='input'>
      <input type="text" value={text} placeholder="Type a message" onChange={e => setText(e.target.value)} />
      <div className='send'>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input