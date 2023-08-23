import React,{ useRef } from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Navbar from '../Navbar/Navbar'
import Login from '../Register/Login'
import Signup from '../Register/Signup'
import Addhouse from '../AddHouse/AddHouse'
import Profile from '../profile/Profile'
import Searchhouse from '../SearchHouse/Searchhouse'
const MyRoutes = () => {
  const contentRef = useRef();
  const contactus=useRef();
  const homeref=useRef();

  function scrollToRef(ref) {
    setTimeout(()=>{
      ref.current.scrollIntoView({ behavior: "smooth" });
    },500)
    
  }
  return (
    <>
  <Navbar scrollToRef={scrollToRef} contentRef={contentRef} contactus={contactus} homeref={homeref}/>  
 <div>
   
    <Routes>
        <Route path='/' element={<Homepage contentRef={contentRef} contactus={contactus} homeref={homeref}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/addHouse' element={<Addhouse/>}></Route>
        <Route path='/findhouse' element={<Searchhouse/>}></Route>

    </Routes>
 </div>
    </>
    )
}

export default MyRoutes