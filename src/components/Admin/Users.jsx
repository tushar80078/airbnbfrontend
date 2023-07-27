import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get("/admin/getallusers")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]); // Fetch users whenever flag changes

  useEffect(() => {
    if (users) {
      axios
        .get("/admin/getallplaces")
        .then(({ data }) => {
          setAllPlaces(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [users]);

  const filterUserData = (ev, id) => {
    return navigate(`/admin/userplaces/${id}`);
  };

  const findTotalUserAccomondations = (id) => {
    let userPlaces = [];
    if (allPlaces) {
      userPlaces = allPlaces?.filter((ele) => ele.owner === id);
    }
    return userPlaces.length;
  };

  const deleteUser = (id) => {
    axios.post("/admin/deleteuser", { id }).then((data) => {
      toast.error("User Deleted!!!", {
        autoClose: 2000, // Duration in milliseconds
        pauseOnHover: false, // Correct option format: not a string, but a boolean
        theme: "colored", // Correct option format
      });
      setFlag(!flag); // Toggle the flag to trigger re-fetching of user data
    }).catch(err => {
      console.log(err);
    });
  };


  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Users</h3>
      </div>
      {/* /.card-header */}
      <div className="card-body">
        <table id="example1" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email Id</th>
              <th>Total Accommodations</th>
              <th>See All Accommodations</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{findTotalUserAccomondations(user._id)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={(ev) => filterUserData(ev, user._id)}
                    >
                      Show Accommodations
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={()=>deleteUser(user._id)}>Delete</button>
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default Users;
