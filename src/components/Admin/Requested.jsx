import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Requested = () => {
  
    const [places,setAllPlaces]=useState([]);
    const [place,setPlace]=useState([]);
    const [message,setMessage]=useState('');
    const [flag, setFlag] = useState(false);
    const [rejectPlaceData, setRejectPlaceData] = useState('');
  
    useEffect(()=>{
          axios.get("/admin/reqplaces").then(({data})=>{
            setAllPlaces(data)
          }).catch(err=>{
            console.log(err);
          })
    },[flag]);
  
    const rejectPlace = async () => {
      try {
        await axios.post('/admin/addreqrejplaces', {
          rejectedMessage: message,
          rejectedPlace: rejectPlaceData
        });
    
        toast.error("Place Rejected!!!", {
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        });
    
        setFlag(!flag);

      } catch (error) {
        console.log(error);
      }
    };

    const approveRequest=(plData)=>{
        axios.post('/admin/approve',plData).then(({data})=>{
            console.log(data);
            setFlag(!flag);
        }).catch(err=>{
            console.log(err);
        })

    }
  
  
    return (
      <div >
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Approved Places</h3>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Place Title</th>
                <th>Address</th>
                <th>Price</th>
                <th>Details</th>
                <th>Images</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {places?.map((placeData, i) => {
                return (
                  <tr>
                    <td>{placeData.title}</td>
                    <td>{placeData.address}</td>
                    <td>${placeData.price}/Night</td>
                    
                    <td>
                      <button
                        className="btn btn-info"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        onClick={() => setPlace(placeData)}
                      >
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark"
                        data-toggle="modal"
                        data-target="#exampleModalLong2"
                        onClick={() => setPlace(placeData)}
                      >
                        Images
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success "
                        onClick={()=>approveRequest(placeData)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger "
                        data-toggle="modal"
                        data-target="#exampleModalCenter3"
                        onClick={()=>setRejectPlaceData(placeData)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            
          </table>
        </div>
        {/* /.card-body */}
      </div>
       {/* Modal */}
       <div
          className="modal fade"
          id="exampleModalLong"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Place Details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <h2 className="text-bold text-lg">{place.title} </h2>
  
                <div className="mt-2   text-center ">
                  <h4 className="text-bold  text-right">
                    {" "}
                    <p className="btn btn-info btn-sm mr-2 text-bold ">
                      Price ${place.price}
                    </p>
                  </h4>
                </div>
  
                <div className="mt-2">
                  <h4 className="text-bold">- Address</h4>
                  <div>&nbsp;&nbsp; {place.address}</div>
                </div>
  
                <div className="mt-3">
                  <h4 className="text-bold justify-text">- Description</h4>
                  <div>&nbsp;&nbsp; {place.discirption}</div>
                </div>
  
                <div className="mt-3">
                  <h4 className="text-bold justify-text mt-2">- Perks</h4>
                  <div className="mt-2">
                    &nbsp;&nbsp;{" "}
                    {place.perks?.map((ele) => {
                      return (
                        <button className="mr-1 btn btn-sm btn-warning">
                          {ele}
                        </button>
                      );
                    })}
                  </div>
                </div>
  
                <div className="mt-3">
                  <h4 className="text-bold justify-text">- Extra Info</h4>
                  <div>&nbsp;&nbsp; {place.extraInfo}</div>
                </div>
  
                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Check In - {place.checkIn}
                  </h4>
                </div>
  
                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Check Out - {place.checkOut}
                  </h4>
                </div>
  
                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Max Guests - {place.maxGuests}
                  </h4>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                
              </div>
            </div>
          </div>
        </div>
  
          {/* Modal */}
          <div
          className="modal fade"
          id="exampleModalLong2"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  All Images
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <h2 className="text-bold text-lg">{place.title} </h2>
  
                <div className=" bg-black text-white  min-h-screen">
                  <div className="bg-black p-8 grid gap-4">
                    {place?.photos?.length > 0 &&
                      place.photos.map((photo, i) => (
                        <div key={i}>
                          <img
                            className="w-full"
                            src={"http://localhost:4000/uploads/" + photo}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        {/* Modal */}
        <div
          className="modal fade -mt-20"
          id="exampleModalCenter3"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Reject This Place
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Reason
                <textarea
                  name="message"
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button  className="btn btn-danger" data-dismiss="modal"
                   onClick={()=>rejectPlace()}
                >
                  Reject
                </button>
  
              </div>
            </div>
          </div>
        </div>
        </div>
      
  
      
    </div>
    )
}

export default Requested