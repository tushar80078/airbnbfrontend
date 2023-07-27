import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./components/Index";
import Login from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import React, { useEffect } from "react";
import Account from "./components/Account";
import AccountNav from "./components/AccountNav";
import Places from "./components/Places";
import PlacesForm from "./components/PlacesForm";
import PlacePage from "./components/PlacePage";
import BookingsPage from "./components/BookingsPage";
import BookingPage from "./components/BookingPage";
import AdminRoutes from "./AdminRoutes";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>


    </UserContextProvider>
  );
}

export default App;
