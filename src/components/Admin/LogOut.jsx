import React, { useContext } from 'react'
import { AdminContext } from '../../AdminContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {

    const {admin, setAdmin, adminReady,setAdminReady}=useContext(AdminContext);
    const navigate=useNavigate();

    async function logout() {
         axios.post("/admin/logout").then(data=>{
            
            toast.warning("Logged Out",{autoClose:2000, theme:"colored"})
    
                setTimeout(() => {
                setAdminReady(false);
                setAdmin(null);
                navigate('/admin')
                }, 3000);


                });
            
        
      }




  return (
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className='btn btn-danger' onClick={logout}>Logout</button>
        </li>
        <ToastContainer/>
    </ul>
  )
}

export default LogOut