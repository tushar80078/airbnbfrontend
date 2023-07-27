import axios from 'axios'
import React, { useEffect, useState } from 'react'

const RejectedPlaces = () => {

    const [places,setPlaces]=useState();
    const [place,setPlace]=useState();
    const [flag,setFlag]=useState(false)

    useEffect(()=>{
        axios.get("/admin/getrejectedplaces").then(({data})=>{
            
            setPlaces(data);
        }).catch(err=>{
            console.log(err);
        })
    },[flag])




    const deleteRejectedPlace=(id)=>{
    
      axios.delete(`/admin/deleterejected/${id}`).then(({data})=>{
        setFlag(!flag);
      }).catch(err=>{
        console.log(err);
      })
    }

    const retrievData=(data)=>{
     
      axios.post("/admin/addplacerejected",data).then(data=>{
          setFlag(!flag);
      }).catch(err=>{
        console.log(err);
      })
    }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Rejected Places</h3>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Place Title</th>
                <th>Price</th>
                <th>Message</th>
                <th>See&nbsp;Details</th>
                <th>See&nbsp;Images</th>
                <th>Retrive</th>
                <th>Delete&nbsp;Forever</th>
              </tr>
            </thead>
            <tbody>
              {places?.map((placeData, i) => {
                return (
                  <tr>
                    <td>{placeData?.rejectedPlace?.title}</td>
                    
                    <td>${placeData?.rejectedPlace?.price}/Night</td>
                    <td>{placeData?.rejectedMessage}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        onClick={() => setPlace(placeData.rejectedPlace)}
                      >
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModalLong2"
                        onClick={() => setPlace(placeData)}
                      >
                        Images
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm "
                        data-toggle="modal"
                        data-target="#exampleModalCenter3"
                        onClick={()=>retrievData(placeData)}
                      >
                        Retrieve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm "
                        data-toggle="modal"
                        data-target="#exampleModalCenter3"
                        onClick={()=>deleteRejectedPlace(placeData._id)}
                      >
                        Delete
                      </button>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
            
          </table>
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
                <h2 className="text-bold text-lg">{place?.title} </h2>

                <div className="mt-2   text-center ">
                  <h4 className="text-bold  text-right">
                    {" "}
                    <p className="btn btn-info btn-sm mr-2 text-bold ">
                      Price ${place?.price}
                    </p>
                  </h4>
                </div>

                <div className="mt-2">
                  <h4 className="text-bold">- Address</h4>
                  <div>&nbsp;&nbsp; {place?.address}</div>
                </div>

                <div className="mt-3">
                  <h4 className="text-bold justify-text">- Description</h4>
                  <div>&nbsp;&nbsp; {place?.description}</div>
                </div>

                <div className="mt-3">
                  <h4 className="text-bold justify-text mt-2">- Perks</h4>
                  <div className="mt-2">
                    &nbsp;&nbsp;{" "}
                    {place?.perks?.map((ele) => {
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
                  <div>&nbsp;&nbsp; {place?.extraInfo}</div>
                </div>

                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Check In - {place?.checkIn}
                  </h4>
                </div>

                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Check Out - {place?.checkOut}
                  </h4>
                </div>

                <div className="mt-2">
                  <h4 className="text-bold justify-text">
                    - Max Guests - {place?.maxGuests}
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
                <h2 className="text-bold text-lg">{place?.rejectedPlace?.title} </h2>

                <div className=" bg-black text-white  min-h-screen">
                  <div className="bg-black p-8 grid gap-4">
                    {place?.rejectedPlace?.photos?.length > 0 &&
                      place?.rejectedPlace?.photos.map((photo, i) => (
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
        
      </div>

      

      
    </div>
  )
}

export default RejectedPlaces