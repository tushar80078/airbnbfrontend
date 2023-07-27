import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import axios from 'axios';

const Header = () => {
  const [requests,setAllRequests]=useState(0);

  useEffect(()=>{
    axios.get("/admin/reqplaces").then(({data})=>{
      setAllRequests(data.length)
    }).catch(err=>{
      console.log(err);
    })
  },[])

  return (
    <>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
      </li>

    </ul>

      <LogOut/>



    {/* Right navbar links */}
  </nav>

  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <Link to={'/admin'} className=" bg-white  flex justify-center p-3 mt-2 mx-3 rounded-full gap-2">
    <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 text-white  rounded-full p-1  h-8 -rotate-90"
              style={{backgroundColor:'#F5385D'}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>

            <span className="font-bold text-2xl sm:text-xl mt-0.5  " style={{color:'#F5385D'}}>
              Airbnb
            </span></Link>
    {/* Sidebar */}
    <div className="sidebar mt-3">
     
      {/* SidebarSearch Form */}
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw" />
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav mt-4 nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
          <li className="nav-item  m-1">
            <Link to={'/admin'} className="nav-link ">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              </p>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <Link to={'/admin/users'} className="nav-link">
              <i className="nav-icon fas fa-user" />
              <p>
                Users
              </p>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <Link to={"/admin/requested"} className="nav-link">
              <i className="nav-icon fas fa-book" />
              <p>
                Requests
                <span className="badge badge-info right">{requests}</span>
              </p>
            </Link>
          </li>



          <li className="nav-item mt-2">
            <Link to={"/admin/approved"} className="nav-link">
              <i className="nav-icon fas fa-thumbs-up" />
              
              <p>
                Approved
              </p>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <Link to={"/admin/rejected"} className="nav-link">
            <FontAwesomeIcon className="nav-icon " icon={faTriangleExclamation} />
              <p>
                Rejected
              </p>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <Link to={'/admin/newuser'} className="nav-link">
            <FontAwesomeIcon className="nav-icon " icon={faUserPlus} />
              <p>
                Create Admin User
              </p>
            </Link>
          </li>
        </ul>

      </nav>
    </div>
  </aside>
  </>
  )
}

export default Header