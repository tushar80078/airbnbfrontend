import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from './Notification';

const ToastContainer = () => {
    notify();

  return (
    <ToastContainer />
  )
}

export default ToastContainer