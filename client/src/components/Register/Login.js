import React, {  useContext, useEffect, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom';
import { Maincontext } from '../Contextstore/AuthContext';
import './Login.css';

const Login = () => {
  const{setStatus,check}=useContext(Maincontext);
  const navigate=useNavigate();
  const [gmail,setGmail]=useState("");
  const[password,setPassword]=useState("");

  const loginuser=async(e)=>{
    if(gmail&&password){
      e.preventDefault();
      const checkuser=await fetch('/loginuser',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({gmail:gmail,password:password})
      });
      const res=await checkuser.json();
      if(res.status===200){
      alert(res.msg);
      setStatus(true);
      check(); //this check is from the contextstore
      navigate('/');
      }
      else{
        alert(res.msg);
      }
    }
    else{
      alert("All fields are required");
    }
  }
 
  return (
   <>
   <div className='Login-container'>
    <div className='login-innaer-container'>
        <div>
            <div className='login-inner-header'>Login</div>
            <form action="" >
              <div className='login-inner-div'>
              <label htmlFor="">gmail</label>
              <input autocomplete="off" type="text" onChange={(e)=>setGmail(e.target.value)}/>
              </div>
              <div className='login-inner-div'>
              <label htmlFor="">password</label>
              <input autocomplete="off" type="password" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button onClick={loginuser} className='login-btn'>login</button>
              <div className='login-forgot-and-signup'>
              <div>
              <p className='forgotpasswd-btn'>forgot password?</p>
              {/* 
              <label htmlFor="">security key</label>
              <input type="text" />
              */}
              </div>
              <NavLink to={'/signup'}><p className="register-last-para"><span className="register-last-para-span">Sign Up</span></p></NavLink>
              </div>
            </form>
          </div>
        </div>
    </div>
   </>
  )
}

export default Login