import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import Login from "./Login";
import { AdminContext } from "../../AdminContext";

const AdminLayout = () => {
  const { adminReady, admin } = useContext(AdminContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (adminReady) {
      navigate('/admin');
    }
  }, []);

  return (
    <div>
      {admin ? (
        <div>
          <Header />
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AdminLayout;
