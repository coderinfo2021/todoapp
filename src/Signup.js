import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Redirect} from 'react-router-dom';
import './App.css';
import {ToastContainer,toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Signup=({lav,setLav})=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [uid,setUid]=useState(null);
    
    function getPassword(e)
    {
        e.preventDefault();
        setPassword(e.target.value);
       
    }
    console.log(email);
    function getEmail(e)
    {
        e.preventDefault();
        setEmail(e.target.value);
    }
   
  
    function userSignUp(e)
    {
        e.preventDefault();
        //validate correct email
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            console.log('success');
            console.log(userCredential);
            setUid(userCredential.user.uid);
            localStorage.setItem('user',`${uid}`);

        })
        .catch((e)=>{
            toast(e.message,{type:"info"})
        });

    }
    if(uid!==null)
    {
        setLav(uid);
        return(
            <Redirect to="/Home" />
        )
    }
   

   
    return(
        
        <div className="Signup-div">
            <h2>User Signup</h2>
          <form className="Signup-form">
            <label>Email:</label>
            <input className="email" id="inp" type="email" onChange={getEmail}/><br/><br/>
            <label>Password:</label>
            <input className="pass" id="inp" type="password" onChange={getPassword}/><br/><br/>
            <button className="btn" id="signbtn" onClick={userSignUp}>Sign Up</button>
        </form>
            <h4>Already have an account?<a className="link" href="/Signin">Sign In</a></h4>
       </div>
       
    )
}
export default Signup;