import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../AdminContext';


const Admin = () => {

  const [places,setAllPlaces]=useState(0);
  const [requests,setRequests]=useState(0);
  const [users,setUsers]=useState(0);
  const [rejected,setRejected]=useState(0);
  const { adminReady, admin } = useContext(AdminContext);

  useEffect(()=>{
    
    if(adminReady)
    {
      axios.get("/admin/getallplaces").then(({data})=>{
        setAllPlaces(data?.length);
      }).catch(err=>{
        console.log("Error : ",err);
      })

      axios.get("/admin/getallusers").then(({data})=>{
        setUsers(data?.length);
      }).catch(err=>{
        console.log("Error : ",err);
      })

      axios.get("/admin/getrejectedplaces").then(({data})=>{
        setRejected(data?.length);
      }).catch(err=>{
        console.log("Error : ",err);
      })
    }
     
  },[])

  return (
   <div className="flex ">
    <div className='mt-2 ml-4 flex gap-5'>
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">

        <h3 className="text-4xl">Total Places</h3>
        <div>
        <h2 className="card-text text-md mt-3">Total Placess Added By Users</h2>
        </div>
        
       <button className='btn btn-warning mt-4 w-full text-xl text-bold text-white'>{places}</button>
      </div>
    </div>

    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">

        <h3 className="text-4xl">Total Users</h3>
        <div>
        <h2 className="card-text text-md mt-3">Total Enrolled Users</h2>
        </div>
        
       <button className='btn btn-info mt-4 w-full text-xl text-bold text-white '>{users}</button>
      </div>
    </div>

    <div className="card" style={{width: '19rem'}}>
      <div className="card-body">

        <h3 className="text-4xl">Total Rejected</h3>
        <div>
        <h2 className="card-text text-md mt-3">Total Rejected Places</h2>
        </div>
        
       <button className='btn btn-danger mt-4 w-full text-xl text-bold text-white'>{rejected}</button>
      </div>
    </div>
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">

        <h3 className="text-4xl">Total Request</h3>
        <div>
        <h2 className="card-text text-md mt-3">Total Requested Places</h2>
        </div>
        
       <button className='btn btn-dark mt-4 w-full text-xl text-bold text-white'>{requests}</button>
      </div>
    </div>
    </div>

    
  
      

    </div>

  )
}

export default Admin