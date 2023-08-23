import React, { useContext } from 'react';
import './Navbar.css';
import Logoimg from '../../images/logoimg.jpg';
import { NavLink ,useNavigate} from 'react-router-dom'
import {Maincontext} from '../Contextstore/AuthContext';
import Homepage from '../Homepage/Homepage';

function Navbar(props){
    function handleClick() {
        props.scrollToRef(props.contentRef);
      }

      function clickhandle(){
        props.scrollToRef(props.contactus);
      }
      function homeclick(){
        props.scrollToRef(props.homeref);
      }
    const navigate=useNavigate();
    const{status,setStatus,setUser}=useContext(Maincontext);
    const Logout=async()=>{
        const logoutuser=await fetch('/logout',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await logoutuser.json();
        if(res.status===200){
            setStatus(false);
            setUser("");
            navigate('/login');
        }
    }
    const[resnav,setres]=React.useState(false);

    return(
        <>
        
        <div className="Navbar-container">
        <NavLink to={'/'}><img src={Logoimg} alt="logo" className="navbar-logo" onClick={homeclick}/></NavLink>
        <ul className="Navbar-container-ul">
            <NavLink to={'/'} onClick={homeclick}> <li>Home</li> </NavLink>
            <NavLink to={'/'} onClick={handleClick}><li >About Us</li></NavLink>
            <NavLink to={'/'} onClick={clickhandle}><li >Contact Us</li></NavLink>
            <NavLink to={'/Addhouse'}> <li>AddHouse</li> </NavLink>
            <NavLink to={'/findhouse'}> <li>Search House</li> </NavLink>
        </ul>
        <div className="Navbar-container-login-reg">
            {
            status?
            <div className="Navbar-container-login-reg">
                 <NavLink onClick={Logout}><p className="Navbar-container-login-reg-nth-child-1">Logout</p></NavLink>
                 <NavLink to={'/profile'}><p className="Navbar-container-login-reg-nth-child-2">Profile</p></NavLink>
            </div>
            :
            <div className="Navbar-container-login-reg">
             <NavLink to={'/login'}><p className="Navbar-container-login-reg-nth-child-1">Login</p></NavLink>
             <NavLink to={'/signup'}><p className="Navbar-container-login-reg-nth-child-2">Register</p></NavLink>
            </div>
            }

        </div>
        {/* <div className="Navbar-container-login-reg-part2" >
            <label className="hamburger">
            <input type="checkbox" onClick={()=>setres(!resnav)}/>
            <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
            </svg>
            </label>
        </div> */}
        <div className={resnav===true ?"second-naverbar-ul":"second-navbar-hidden-ul"}>
        <ul className="Navbar-container-ul">
            <NavLink to={'/'} onClick={()=>{homeclick();setres(!resnav)}}> <li>Home</li> </NavLink>
            <NavLink to={'/'} onClick={()=>{handleClick();setres(!resnav)}}><li >About Us</li></NavLink>
            <NavLink to={'/'} onClick={()=>{clickhandle();setres(!resnav)}}><li >Contact Us</li></NavLink>
            <NavLink to={'/Addhouse'} onClick={()=>setres(!resnav)}> <li>AddHouse</li> </NavLink>
            <NavLink to={'/findhouse'} onClick={()=>setres(!resnav)}> <li>Search House</li> </NavLink>
            {
                status?
                     <ul>
                    <NavLink onClick={()=>{Logout();setres(!resnav)}}><li>Logout</li></NavLink>
                     <NavLink to={'/profile'} onClick={()=>setres(!resnav)}> <li>Profile</li></NavLink>
                     </ul>
                     :
                     <ul>
                    <NavLink  to={'/login'} onClick={()=>setres(!resnav)}><li>Login</li></NavLink>
                     <NavLink  to={'/signup'} onClick={()=>setres(!resnav)}> <li>Register</li></NavLink>
                     </ul>
            }

        </ul>
        </div>
        <div className="Navbar-container-login-reg-part2" >
            <label className="hamburger">
            <input type="checkbox" onClick={()=>setres(!resnav)} className={resnav?"menu":"close"}/>
            <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
            </svg>
            </label>
        </div>
        </div> 
        </>
    );
}
export default Navbar;