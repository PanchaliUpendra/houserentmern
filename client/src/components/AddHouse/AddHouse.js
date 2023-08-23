import React, { useContext, useEffect, useState } from 'react';
import {Maincontext} from '../Contextstore/AuthContext';
import {useNavigate} from 'react-router-dom';
import './AddHouse.css';

const AddHouse = () => {
  const navigate=useNavigate();
  const{user,check,myposts}= useContext(Maincontext);
  const[addmore,setAddmore]=useState([]);
  const[createdposts,setCreatedposts]=useState(myposts);
  const[housedata,setHousedata]=useState({
    Type:"",
    Address:"",
    City:"",
    Phonenum:"",
    Price:""
  })
  const[detail,setDeatil]=useState();
  const Adddetail=()=>{
    
    setAddmore([...addmore,detail]);
    setDeatil(" ");
  }

  //handling inputs
  let name,value;
  const handleinputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setHousedata({...housedata,[name]:value});
  }
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

  //send data to backend
  const Send=async()=>{
    const data=await fetch('/addhouse',{
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify({
        housedata:housedata,AuthorID:user,addmore:addmore
      })
    });
    const res=await data.json();
    if(res.status===200){
      alert(res.msg);
      setCreatedposts(res.userposts);
      setAddmore([]);
      setHousedata({
        Type:"",
        Address:"",
        City:"",
        Phonenum:"",
        Price:""
      })
      check();
    }
    else{
      alert(res.msg);
    }
    
  }
//delete post
let val;
const deletepost=async(e)=>{
  val=e.target.value;
  const datadel=await fetch(`/deletepost/${val}`,{
    method:"GET",
    headers:{
      "content-type":"Application/json"
    }
  });
  const res=await datadel.json();
  if(res.status===200){
    alert(res.msg);
    setCreatedposts(res.userposts);
  }
  else{
    alert(res.msg);
  }
}


  return (
    <>
    <div className="addhouse-container">
    <div>
    <div className="addhouse-container-first-part">
    <h1>AddHouse</h1>
    <div className="addhouse-container-first-part-housedetailsform">
      <input type="text" placeholder='enter type of house' name='Type' value={housedata.Name} onChange={handleinputs}/> <br />
      <input type="text" placeholder='enter address' name='Address' value={housedata.Address} onChange={handleinputs}/> <br />
      <input type="text" placeholder='enter city' name='City' value={housedata.City} onChange={handleinputs}/> <br />
      <input type="text" placeholder='phonenum' name='Phonenum' value={housedata.Phonenum} onChange={handleinputs}/> <br />
      <input type="Number" placeholder='enter cost' name='Price' value={housedata.Price} onChange={handleinputs}/> <br />
      <div className="addhouse-container-input-add-btn">
      <input type="text"placeholder='enter other details'onChange={e=>setDeatil(e.target.value)} value={detail}/><button onClick={Adddetail}>Add</button>
      </div>
      <ul>
      {
        addmore&& addmore.map((data ,index)=>{
          return(
            <>
            <li key={index.toString()}>{data}</li>
            </>
          )
        })
      }
      </ul>
      <div className="addhouse-submit-btn">
      <button onClick={Send} className="addhouse-container-input-add-btn-div1">submit</button>
      </div>
    </div>
    </div>
    <div className="addhouse-container-second-part">
    <h1>My posts</h1>
    <div className="myposts">
      
      <div>
        <ul className="mypost-contaer-addhouse">
        {
          createdposts.length==0?"No post available": createdposts && createdposts.map((data)=>{
            return(
              <>
              <div className="add-house-my-posts">
              <li>{data.Type}</li>
              <li>{data.Address}</li>
              <button value={data._id} onClick={deletepost}>delete</button>
              </div>
              </>
            )
          })
        }
        </ul>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>

  )
}

export default AddHouse