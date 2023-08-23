import React, { useState } from 'react';
import './Contactus.css';

const Contactus = (props) => {
    const[feed,setFeed]=useState({
        gmail:"",
        phonenum:"",
        message:""
    });
    const sendFeed=async()=>{
        if(feed.gmail && feed.phonenum && feed.message){
            const send=await fetch('/feedback',{
                method:"POST",
                headers:{
                    'content-type':"application/json"
                },
                body:JSON.stringify({
                    Feedback:feed
                })
            });
            const res=await send.json();
            if(res.msg){
                alert(res.msg);
                setFeed({gmail:"",phonenum:"",message:""});
            }
            else{
                alert(res.msg);
            }
        }
        else{
            alert("All fields are required");
        }
    }
    let name,value;
    const handleinputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setFeed({...feed,[name]:value});
    }
  return (
    <>
    <div className="contactus-container" ref={props.contactus}>
        <div className="contactsus-inner-container-part1">
            <h1>About Contact Us</h1>
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing 
            elit. Aliquam dolore quasi excepturi in eaque velit 
            doloremque iusto consectetur deserunt atque. Aut saepe v
            eniam vero architecto eos nobis minus asperiores
            dignissimos.
            </p>
        </div>
        <div className="contactus-inner-container">
        <input type="text" placeholder='enter gmail' onChange={handleinputs} name="gmail" value={feed.gmail}/>
        <input type="text" placeholder='enter phonenumber' onChange={handleinputs} name="phonenum" value={feed.phonenum}/>
        <textarea cols="30" rows="10" placeholder='Enter message' onChange={handleinputs} name="message" value={feed.message}></textarea>
        <button onClick={sendFeed}>send</button>
        </div>
    </div>
    </>
  )
}

export default Contactus