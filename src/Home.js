import React,{useState,useEffect,useContext} from 'react';

import {toast,ToastContainer} from 'react-toastify';
import Todos from './Todos';

import firebase from 'firebase/app'
import 'firebase/auth';
import {v4} from 'uuid';
import { Redirect } from 'react-router';

toast.configure();

const Home=({lav,setLav})=>{
    const [todo,setTodo]=useState('');
    const [todos,setTodos]=useState({});
    const [bookmark,setBookmark]=useState(false);
    const [out,setOut]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    
    


    const readTodo=(e)=>{
        e.preventDefault();
        setTodo(e.target.value);
    }
    async function addTodoToFirebase()
    {
        try{
         firebase.database().ref(`todos/${lav}/`+v4())
         .set({

             todo:todo,
             bookmark:bookmark
         });
         toast("TODO SUCCESSFULLY ADDED",{type:"success"});
         
        }
        catch(error)
        {
            toast(error.message,{type:"error"});
        }
     }
     async function updateTodosState(data)
     {
         setTodos(data);
     }
     async function getTodoFromFirebase()
     {
         try{
            var getTodo= await firebase.database().ref(`todos/${lav}/`);
         //    console.log(getTodo);
            getTodo.on('value',(snapshot)=>{
                const data=snapshot.val();
                setIsLoading(false);
                updateTodosState(data);
            })
         
         }
         catch(error)
         {
             console.log(error);
         }
     }
     
     async function deleteTodo(key)
     {
         try{
               var getTodo= await firebase.database().ref(`todos/${lav}/`+key);
         getTodo.remove();
         toast("TODO DELETED",{type:"success"});

         }
         catch(error)
         {
            toast(error.message,{type:"error"});
         }
       
     }
     async function deleteAllTodo()
     {
         var getTodo=await firebase.database().ref(`todos/${lav}/`);
         getTodo.remove();
     }
    
 
     
     useEffect(()=>{
         
         getTodoFromFirebase();
         
     },[])
 
 
     if(out!==false)
     {
         return(
             <Redirect to="/"/>
         )
     }
     if(isLoading)
     {
         return(
             <div className="loading">
                 <h1>Loading...</h1>
             </div>
         )
     }
 
     
 
 
    return(
        <>
           <h1>Todo Input</h1>
           <div className="form-div">
               <input className="inp" type="text" placeholder="add a new todo item..." 
               onChange={readTodo}/>
               <button className="btn" id="btn-add"
               onClick={addTodoToFirebase}>Add Item</button>
           </div>
           <h1>Todo List</h1>
           <Todos todos={todos} deleteTodo={deleteTodo} lav={lav}/>
           
           <button className="btn" id="btn-clear" onClick={deleteAllTodo}>clear List</button>
           {/* <button className="btn" id="btn-clear" onClick={logout}>Log Out</button> */}

        </>

    )
}
export default Home;