// AdminRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import Admin from "./components/Admin/Admin";
import Users from "./components/Admin/Users";
import NewUser from "./components/Admin/NewUser";
import { AdminContextProvider } from "./AdminContext";
import UserPlaces from "./components/Admin/UserPlaces";
import RejectedPlaces from "./components/Admin/RejectedPlaces";
import Approved from "./components/Admin/Approved";
import Requested from "./components/Admin/Requested";

const AdminRoutes = () => {
  return (
    <AdminContextProvider>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/userplaces/:id" element={<UserPlaces/>} />
          <Route path="/rejected" element={<RejectedPlaces/>} />
          <Route path="/approved" element={<Approved/>} />
          <Route path="/requested" element={<Requested/>}></Route>
        </Route>
      </Routes>
    </AdminContextProvider>
  );
};

export default AdminRoutes;
  