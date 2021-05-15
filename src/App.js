import React, { useState } from 'react';
import './App.css';

import {firebaseConfig} from './Config';
import firebase from 'firebase/app';
import 'firebase/database';


import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';



import {BrowserRouter,Route,Switch} from 'react-router-dom';
firebase.initializeApp(firebaseConfig);
const App=()=>{
    const [lav,setLav]=useState(localStorage.getItem('user'));
    //   async function logout(e)
    //  {
    //      e.preventDefault();
    //      await firebase.auth().signOut()
    //      .then(()=>{
    //          console.log('success');
    //         //  setOut(true);
    //      })
    //      .catch((error)=>{
    //          console.log("Something went wrong");
    //      })
    //  }
    
   return(
       <BrowserRouter>
            <Switch>
                <Route exact path="/"  render={()=> <Signup lav={lav} setLav={setLav}/>}/>
                <Route excat path="/Signin"  render={()=> <Signin lav={lav} setLav={setLav}/>} />
                <Route excat path="/Home" render={()=><Home lav={lav} setLav={setLav}
                />}/>
            </Switch>
       </BrowserRouter>
  
   )
}
export default App;