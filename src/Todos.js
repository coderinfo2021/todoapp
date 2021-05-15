import React, { useState } from 'react';
import {MdDelete,MdBookmarkBorder, MdBookmark} from 'react-icons/md';
import firebase from 'firebase/app';
import './App.css';
import {toast,ToastContainer} from 'react-toastify';
toast.configure();
const Todos=({todos,deleteTodo,lav})=>{
    const [item,setItem]=useState([]);
    
    function bookmarkTodo(key,bookmark)
    {
        firebase.database().ref(`/todos/${lav}/${key}`).update(
        {
            bookmark: !bookmark,
        });
        (bookmark===false)?(toast('Todo Complete')):(toast('Todo Incompleted'));

    }
    return(
        <>
          {
            todos!==null?( 
               <>
                  {
                     Object.entries(todos).map(([key,value])=>{
                    return (
                        <div className="todos-container" key={key}>
                            <h3>{value.todo}</h3>
                                <div className="icons">
                                    {
                                        value.bookmark ? (
                                            <MdBookmark className="edit" onClick={()=>{bookmarkTodo(key,value.bookmark)}}/>
                                         ):(
                                            <MdBookmarkBorder className="edit" onClick={()=>{bookmarkTodo(key,value.bookmark)}}/>
                                        )
                                          
                                    }
                                     <MdDelete className="delete"
                                         onClick={()=>deleteTodo(key)}/>
                                </div>
                                  </div>
                              )
                      })

                }
                </>):(<></>)
            }
        </>
    )
}
export default Todos;