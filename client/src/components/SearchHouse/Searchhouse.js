import React, { useContext, useEffect, useState } from 'react'
import {Maincontext} from '../Contextstore/AuthContext'
import {useNavigate} from 'react-router-dom'
import './Searchhouse.css';

const Searchhouse = () => {
    const navigate=useNavigate();
    const{user,check,allposts}= useContext(Maincontext);
    const[search,setSearch]=useState("");
    const [filter,setFilter]=useState(allposts);
    const[newfilter,setNewfilter]=useState([]);
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
const Searchhouse=async()=>{
  const data=await fetch(`/searchhouse/${search.toLowerCase()}`,{
    method:"GET",
    headers:{
      "content-type":"application/json"
    }
  });
  const res=await data.json();
  if(res.status===200){
    if(res.filterdata.length>0){
      setNewfilter(res.filterdata);
    }
    else{
      alert("Not available");
    }
  }
}
const Filtermydata=(e)=>{
  let val=e.target.value;
  let newvals=allposts.filter((data)=>{
    return val==""?data:data.City.toLowerCase().includes(val);
  });
  if(newvals.length>0){
    setNewfilter(newvals);
  }
  else {
    alert("Not available");
    setNewfilter("");
  }
}
  return (
    <>
    <div className="Searchhouse-container">
    {/*<div className='search-house-heading'>Search</div>*/}
    <div className="search-house-searchbar">
      <div>
      <input type="text" onChange={Filtermydata} placeholder='enter city'/> 
          {/* <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='enter city'/>  */}
          <button onClick={Searchhouse}>search</button>
      </div>
    </div>
    <div className='search-house-available-houses'>
      <div className='search-house-second-header'>
      <h1>Available houses</h1>
      </div>
      <div className='search-house-inner-container-part2-container'>

      {
        newfilter.length==0?
        filter&&filter.map((data)=>{
          return(
            <>
            <div className='search-house-inner-container-part2'>
            <h4 className='search-house-inner-container-part2-h4'>Type:<span class="search-house-inner-container-part2-span">{data.Type}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Price:<span class="search-house-inner-container-part2-span">{data.Price}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Address:<span class="search-house-inner-container-part2-span">{data.Address}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>City:<span class="search-house-inner-container-part2-span">{data.City}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Contact Details:<span class="search-house-inner-container-part2-span">{data.AuthorName}</span>,<span class="search-house-inner-container-part2-span">{data.Phonenum}</span></h4>
            </div>
            </>
          )
        })
        :
        newfilter&&newfilter.map((data)=>{
          return(
            <>
            <div className='search-house-inner-container-part2'>
            <h4 className='search-house-inner-container-part2-h4'>Type:<span class="search-house-inner-container-part2-span">{data.Type}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Price:<span class="search-house-inner-container-part2-span">{data.Price}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Address:<span class="search-house-inner-container-part2-span">{data.Address}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>City:<span class="search-house-inner-container-part2-span">{data.City}</span></h4>
            <h4 className='search-house-inner-container-part2-h4'>Contact Details:<span class="search-house-inner-container-part2-span">{data.AuthorName}</span>,<span class="search-house-inner-container-part2-span">{data.Phonenum}</span></h4>
            </div>
           
            </>
          )
        })
      }

    </div>
    </div>
    </div>
    </>
  )
}

export default Searchhouse