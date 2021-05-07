import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from './Todos';
import {toast,ToastContainer} from 'react-toastify';


import {firebaseConfig} from './Config';
import firebase from 'firebase/app';
import 'firebase/database';

import {v4} from 'uuid';




firebase.initializeApp(firebaseConfig);
const App=()=>{
   const [todo,setTodo]=useState('');
   const [todos,setTodos]=useState({});
   const [bookmark,setBookmark]=useState(false);

   const readTodo=(e)=>{
       e.preventDefault();
       setTodo(e.target.value);
   }
   async function addTodoToFirebase()
   {
       try{
        firebase.database().ref('todos/'+v4())
        .set({
            todo:todo,
            bookmark:bookmark
        });
        
       }
       catch(error)
       {
           console.log(error);
       }
    }
    async function updateTodosState(data)
    {
        setTodos(data);
    }
    async function getTodoFromFirebase()
    {
        try{
           var getTodo= await firebase.database().ref('todos/');
        //    console.log(getTodo);
           getTodo.on('value',(snapshot)=>{
               const data=snapshot.val();
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
        var getTodo= await firebase.database().ref('todos/'+key);
        getTodo.remove();
    }
    async function deleteAllTodo()
    {
        var getTodo=await firebase.database().ref('todos/');
        getTodo.remove();
    }

    
    useEffect(()=>{
        getTodoFromFirebase();
    },[])



    


    
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
           <Todos todos={todos} deleteTodo={deleteTodo}/>
           
           <button className="btn" id="btn-clear" onClick={deleteAllTodo}>clear List</button>
       </>
   )
}
export default App;