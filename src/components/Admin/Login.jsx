import React, { useContext, useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from '../../AdminContext';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {admin, setAdmin, adminReady,setAdminReady}=useContext(AdminContext)


  const handleLoginSubmit=async(ev) =>{
    
    ev.preventDefault();
    try {
      const userInfo = await axios.post(
        '/admin/login',
        { email, password },
        { withCredentials: true, credentials: 'include' }
      );

      toast.success('Login Successfully!!', { autoClose: 2000, theme:"colored" }); // Display success toast notification
      setEmail('');
      setPassword('');

          setTimeout(()=>{
           
                if(userInfo)
                {
                  setAdmin(userInfo.data.data);
                   setAdminReady(true);
                }
                
          },[1000])

    } catch (err) {
      toast.error('Login Failed', {theme:"colored"}); // Display error toast notification
    }
  }

 

  return (
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
    <div className="card" style={{ width: "30rem" }}>
      <div
        className="pt-2 pb-2"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3 className="text-2xl text-bold pt-2">Admin Login</h3>
      </div>
      <form className="p-10 flex flex-column " onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(ev)=>setEmail(ev.target.value)} value={email} name='email'
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
            onChange={(ev)=>setPassword(ev.target.value)} value={password} name='password'
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn  rounded-lg p-2  col-12 bg-info btn-success"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Login