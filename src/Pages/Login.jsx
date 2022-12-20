import React, { useState} from 'react'
import { auth } from '../firebase';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{ 
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")

    }catch(err){ 
      console.log("The error is: ", err);
      setError(true)
    }

  }
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>Encrypted  Chat</span>
        <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Email'></input>
                <input type= "password" placeholder='Enter Password'></input>
                <button>Sign In</button>
                {error && <span>Error Logging in </span>}
            </form>
            <p>You don't have an account? <Link to = "/register">Register</Link> </p>
        </div>
    </div>
  )
}

export default Login