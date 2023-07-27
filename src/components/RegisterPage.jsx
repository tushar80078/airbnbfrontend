import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function regiterUser(event){
        event.preventDefault();

        try {
              await axios.post('/auth/register',{
                name,
                email,
                password
            });

            setName('');
            setEmail('');
            setPassword('');
            toast.success('Registration Successful!!. Now you can log in!!', { autoClose: 2000, theme:"colored" });
           
        } catch (error) {
          toast.error('Registration Failed. Try With Another user name or try again after some time!!', { autoClose: 2000, theme:"colored" });
        }
      
    }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
          <h1 className='text-4xl text-center mb-4'>Register Page</h1>
          {
            //Register Form
          }
          <form className='max-w-md mx-auto border p-10 pt-6 rounded-2xl border-gray ' onSubmit={regiterUser}>
            <input type="text" placeholder='John Doe' 
                    value={name} 
                    onChange={ev => setName(ev.target.value)} />

            <input type="email" placeholder="your@email.com"
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)} /> 

            <input type="password" placeholder="password"
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)} />

            <button style={{backgroundColor:"#F5385D"}} className='text-white w-full rounded-full btn btn-light mt-3 w-20'>Register</button>
            <div className='text-center py-2 text-gray-500'>Already a member? <Link to={"/login"} className='underline text-black'>Login</Link></div>
          </form>
          <ToastContainer />
      </div>
     
    </div>
  )
}

export default RegisterPage