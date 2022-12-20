import React, { useState } from "react";
import "../style.scss";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import { useNavigate, Link} from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{ 
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });

    }catch(error){ 
      console.log("The error is: ",error);
      setError(true)
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Encrypted Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name"></input>
          <input type="email" placeholder="Enter Email"></input>
          <input type="password" placeholder="Enter Password"></input>
          <input style={{ display: "none" }} type="file" id="file"></input>
          <label htmlFor="file">
            <p>Add an avatar</p>
          </label>
          <button>Sign Up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>Already have an account? <Link to = "/login">Login</Link> </p>
      </div>
    </div>
  );
};

export default Register;
