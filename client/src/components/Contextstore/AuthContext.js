import React, { createContext, useEffect, useState } from 'react'



const Maincontext=createContext();
const AuthContext = ({children}) => {
    const [status,setStatus]=useState(false);
    const[user,setUser]=useState("");
    const[myposts,setMyposts]=useState([]);
    const[allposts,setAllposts]=useState([]);
    const check=async()=>{
        const clientdata=await fetch('/checkstatus',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await clientdata.json();
        if(res.status===200){
            setStatus(res.user);
            setUser(res.clientdata);
            setMyposts(res.userposts);
            setAllposts(res.Allposts);
            console.log(res.Allposts);
            // console.log(res.userposts);
        }
        else{
            setStatus(false);
        }
    }
    useEffect(()=>{
        check();
    },[])
  return (
    <>
      <Maincontext.Provider value={{status,setStatus,user,setUser,check,myposts,allposts }}>{children}</Maincontext.Provider>
    </>
  )
}

export {AuthContext,Maincontext};