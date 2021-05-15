import React,{useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import firebase from 'firebase/app';

import 'firebase/auth';
import {Redirect} from 'react-router-dom';

toast.configure();

const Signin=({lav,setLav})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [uid,setUid]=useState(null);
    
    function getPassword(e)
    {
        e.preventDefault();
        setPassword(e.target.value);
       
    }
    function getEmail(e)
    {
        e.preventDefault();
        setEmail(e.target.value);
    }
      function userSignIn(e)
    {
        e.preventDefault();
        
        // 8XCWGBSJAGRg2h390GJpOKfc1nw1
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            
            
            setUid(userCredential.user.uid);
            localStorage.setItem('user',userCredential.user.uid);
            

            
        })
        .catch((e)=>{
        
        toast(e.message,{type:"info"});
    });
        
    }
    if(uid!==null)
    {
        setLav(uid);
        return(
            <Redirect to="/Home"/>
        )
    }
    return(
      
        <div className="Signup-div">
        <h2>User Signin</h2>
      <form className="Signin-form">
        <label>Email:</label>
        <input id="inp" className="email" type="email" onChange={getEmail}/><br/><br/>
        <label>Password:</label>
        <input id="inp" type="password" onChange={getPassword}/><br/><br/>
        <button id="signbtn" className="btn" onClick={userSignIn}>Sign In</button>
    </form>
       
   </div>
    )
}
export default Signin;