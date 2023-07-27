import React, { useContext, useState } from 'react';
import Header from './Header';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const userInfo = await axios.post(
        '/auth/login',
        { email, password },
        { withCredentials: true, credentials: 'include' }
      );
      setUser(userInfo.data.data);
      toast.success('Login Successfully!!', { autoClose: 2000, theme:"colored" }); // Display success toast notification
      setEmail('');
      setPassword('');

          setTimeout(()=>{
          setRedirect(true);
          },[1000])

    } catch (err) {
      toast.error('Login Failed', {theme:"colored"}); // Display error toast notification
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto border p-10 rounded-2xl border-gray' onSubmit={handleLoginSubmit}>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button style={{backgroundColor:"#F5385D"}} className='text-white w-full rounded-full btn btn-light mt-3 w-20'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet? <Link to={'/register'} className='underline text-black'>Register now</Link>
          </div>
        </form>
        <ToastContainer  /> 
      </div>
     {/* Display the toast notifications */}
    </div>
  );
};

export default Login;
