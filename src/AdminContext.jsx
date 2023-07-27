// AdminContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [adminReady, setAdminReady] = useState(false);

  useEffect(() => {
    if (!admin) {
      axios.get("/admin/profile").then(({ data }) => {
        setAdmin(data);
        setAdminReady(true);
      });
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, adminReady,setAdminReady }}>
      {children}
    </AdminContext.Provider>
  );
}
