import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewUser = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const regiterUser=async(event)=>{
      event.preventDefault();

      try{
        await axios.post('/admin/register',{
          email,password
        });

        toast.success('Login Successfully!!', { autoClose: 2000, theme:"colored" });


        setEmail('');
        setPassword('')

      }catch(err)
      {
        alert('Registration Failed. Please try agian later.')
      }
  }


  return (
    <div>
      <div className="">
        <h2 className="text-2xl pl-4 pt-2">
        <FontAwesomeIcon className="nav-icon " icon={faUserPlus} />
            &nbsp; Register Admin User
        </h2>
      </div>
      
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="card -mt-40" style={{ width: "30rem" }}>
          <form className="p-10 flex flex-column " onSubmit={regiterUser}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email" value={email} onChange={(ev)=>setEmail(ev.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn p-2  rounded-lg p-2  col-12 bg-info btn-success"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer  /> 
    </div>
  );
};

export default NewUser;
