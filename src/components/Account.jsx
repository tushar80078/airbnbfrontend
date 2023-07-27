import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import Places from "./Places";
import AccountNav from "./AccountNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage == undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/auth/logout");

    toast.warning("Logged Out",{autoClose:1000, theme:"colored"})

    setTimeout(() => {
      setRedirect("/");
      setUser(null);
    }, 2000);
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  return (
    <div>
      <AccountNav />

      {
        //Profile Info
        subpage === "profile" && (
          <div className="text-center border p-10 rounded-2xl border-gray-300 max-w-lg mx-auto mt-8">
            Logged in as <span className="font-bold">{user.name}</span> (
            {user.email})<br />
            <button onClick={logout} className="primaryy max-w-sm mt-2">
              Logout
            </button>
          </div>
        )
      }

      {
        //Places Info

        subpage === "places" && <Places />
      }
       <ToastContainer  /> 
    </div>
  );
};

export default Account;
