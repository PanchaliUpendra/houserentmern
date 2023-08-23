import React, { useContext, useEffect, useState } from 'react'
import {Maincontext} from '../Contextstore/AuthContext'
import './Profile.css';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const navigate=useNavigate();
  const{check,user}=useContext(Maincontext);
  //checking
  const Authcheck=async()=>{
    if(!user._id){
      alert("Please login");
      navigate('/login');
    }
}
useEffect(()=>{
  Authcheck();
},[]);
  const[data,setData]=useState({
    Name:user.Name,
    Gmail: user.Gmail,
    Contact:user.Contact,
    OldPassword:"",
    Password:"",
    Securitykey:"",
    OldSecuritykey:""
  })
  let name,val;
  const handleinputs=(e)=>{
    name=e.target.name;
    val=e.target.value;
    setData({...data,[name]:val});
  }
  const updatedata=async()=>{
    const dataupdate=await fetch(`/updateprofile/${user._id}`,{
      method:"POST",
      headers:{
        'content-type':"Application/json"
      },
      body:JSON.stringify({
        data:data
      })
    });
    const res=await dataupdate.json();
    if(res.status===200){
      alert(res.msg);
    }
    else{
      alert(res.msg);
    }
  };
  return (
    <>
    <div className="profile-container">
    <div>
        <h1>Profile</h1>
        <div className="profile-container-inner-one">
          <div className="profile-inner-container">
            <div className="profile-inner-container-part1-div">
              <input type="text" placeholder='Enter name' name='Name' value={ data.Name==undefined?user.Name:data.Name} onChange={handleinputs}/>
              <input type="text" placeholder='enter gmail'name='Gmail' value={data.Gmail==undefined?user.Gmail:data.Gmail}  onChange={handleinputs}/>
              <input type="text" placeholder='enter contact num' name='Contact' value={ data.Contact==undefined?user.Contact:data.Contact} onChange={handleinputs}/> 
            </div>
            <div className="profile-inner-container-part1-div">
              <input type="password" placeholder='enter previous password' name='OldPassword' value={data.OldPassword}onChange={handleinputs}/>
              <input type="password" placeholder='Change Password' name='Password' value={data.Password}onChange={handleinputs}/>
              <input type="text" placeholder='enter previous securitykey'name='OldSecuritykey' value={data.OldSecuritykey} onChange={handleinputs}/>
            </div>
          </div>
          <div className="profile-inner-container-part2">
              <input type="text" placeholder='Change security key'name='Securitykey' value={data.Securitykey} onChange={handleinputs}/>
              <button onClick={updatedata}>update</button>
          </div>
            
        </div>
        </div>
    </div>
    </>
  )
}

export default Profile