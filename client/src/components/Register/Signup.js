import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import './Signup.css';
import registerimg from '../../images/girlImg.jpg';

const Signup = () => {
  const navigate=useNavigate();
  const[userdata,setUserdata]=useState(
    {
      name:"",
      email:"",
      contact:"",
      password:"",
      confirmpass:"",
      secretkey:""
    }
  );
  let name,value;
  const handleinputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUserdata({...userdata,[name]:value});
  }

  const Registeruser=async(e)=>{
    e.preventDefault();
    const{name,email,contact,password,confirmpass,secretkey}=userdata;
    if(name&&email&&contact&&password&&confirmpass&&secretkey){
      if(password===confirmpass){
        const user_register=await fetch('/register_user',{
          method:"POST",
          headers:{
            "Content-Type":"Application/json"
          },
          body:JSON.stringify({
            name:name,email:email,contact:contact,password:password,secretkey:secretkey
          })
        });
        const res=await user_register.json();
        if(res.status===200){
          alert(res.msg);
          navigate('/login');
        }
        else{
          alert(res.msg);
        }
    }
    else{
      alert("password and confirm password are not same");
    }
    }
    else{
      alert("All fields are required");
    }

  }

  return (
    <>
    <div className="register-container">
    <div>
          <div className="register-container-head">
          <h1>Create an account</h1>
          </div>
          
          <div className="register-form">
              <form action="">
              <div className="register-form-divs">
              <label htmlFor="">name:</label>
              <input type="text" name="name" value={userdata.name} onChange={handleinputs} required/>
              </div>
              <div className="register-form-divs">
              <label htmlFor="">gmail:</label>
              <input type="email" name="email" value={userdata.email} onChange={handleinputs} required/>
              </div>
              <div className="register-form-divs">
              <label htmlFor="">contact num</label>
              <input type="text" name="contact" value={userdata.contact} onChange={handleinputs} required/>
              </div>
              <div className="register-form-divs">
              <label htmlFor="">password</label>
              <input type="password" name="password" value={userdata.password} onChange={handleinputs} required/>
              </div>
              <div className="register-form-divs">
              <label htmlFor="">confirm password</label>
              <input type="password" name="confirmpass" value={userdata.confirmpass} onChange={handleinputs} required/>
              </div>
              <div className="register-form-divs">
              <label htmlFor="">secret key</label>
              <input type="text" name="secretkey" value={userdata.secretkey} onChange={handleinputs} required/>
              </div>
              <button onClick={Registeruser} className="register-button">register</button>
              <p className="register-last-para">Already have an account?<NavLink to={'/login'}>   <span className="register-last-para-span">Sign in</span></NavLink></p>
              </form>
          </div>
          </div>
      </div>
    </>
  )
}

export default Signup