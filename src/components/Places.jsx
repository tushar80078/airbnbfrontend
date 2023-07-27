import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccountNav from './AccountNav';
import axios from 'axios';

const Places = () => {
  const [places,setPlaces]=useState([]);
  const [requestedPlace,setRequestedPlace]=useState([]);
  const [rejectedData,setRejectedData]=useState([]);


  useEffect(()=>{
    axios.get('auth/places').then(({data})=>{
      setPlaces(data);
    });
  },[])

  useEffect(()=>{
    axios.get('/auth/req-places').then(({data})=>{
      setRequestedPlace(data);
    });
  },[])

  useEffect(()=>{
    axios.get('/auth//rej-places').then(({data})=>{
      setRejectedData(data);
    });
  },[])

  console.log("here",rejectedData);


  
  return (
    <div>
      <AccountNav/>
      
          <div className='text-center '>
            <Link className='inline-flex gap-1 bg-primary text-white p-1 px-4 rounded mt-5' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                Add New Place</Link>
        </div>

        <div className='mt-4'>
            {places.length > 0 && places.map((place, i) => (
              <Link to={'/account/places/' + place._id} key={i}>
                <div className='flex mt-3 bg-gray-100 gap-4 p-4 justify-between rounded-2xl'>
                  <div className='w-32 h-32 m-1 bg-gray-300 shrink-0 rounded-2xl'>
                    {place.photos.length > 0 && (
                      <img className='w-32 h-32 shrink-0 rounded-2xl' src={'http://localhost:4000/uploads/' + place.photos[0]} alt=''></img>
                    )}
                  </div>
                  <div className='flex-grow'>
                    <h2 className='text-xl'>{place.title}</h2>
                    <p className='text-sm mt-2'>{place.discirption}</p>
                  </div>
                  <div className='card flex-shrink-0 justify-center' style={{ width: "10rem", backgroundColor:"#097969",color:"white",alignItems:"center" }}>
                      <div className='text-2xl'>
                        Approved
                      </div>
                  </div>
                </div>
              </Link>
            ))}
</div>

<div>
{requestedPlace.length > 0 && requestedPlace.map((reqPlace, i) => (
              <div key={i}>
                <div className='flex mt-3 bg-gray-100 gap-4 p-4 justify-between rounded-2xl'>
                  <div className='w-32 h-32 m-1 bg-gray-300 shrink-0 rounded-2xl'>
                    {reqPlace.photos.length > 0 && (
                      <img className='w-32 h-32 shrink-0 rounded-2xl' src={'http://localhost:4000/uploads/' + reqPlace.photos[0]} alt=''></img>
                    )}
                  </div>
                  <div className='flex-grow'>
                    <h2 className='text-xl'>{reqPlace.title}</h2>
                    <p className='text-sm mt-2'>{reqPlace.discirption}</p>
                  </div>
                  <div className='card flex-shrink-0 justify-center' style={{ width: "10rem", backgroundColor:"#FFC300 ",color:"white",alignItems:"center" }}>
                      <div className='text-2xl'>
                        Requested
                      </div>
                  </div>
                </div>
              </div>
            ))}
    </div>

    <div>
{rejectedData.length > 0 && rejectedData.map((rejPlace, i) => (
              <div key={i}>
                <div className='flex mt-3 bg-gray-100 gap-4 p-4 justify-between rounded-2xl'>
                  <div className='w-32 h-32 m-1 bg-gray-300 shrink-0 rounded-2xl'>
                    {rejPlace.rejectedPlace.photos.length > 0 && (
                      <img className='w-32 h-32 shrink-0 rounded-2xl' src={'http://localhost:4000/uploads/' + rejPlace.rejectedPlace.photos[0]} alt=''></img>
                    )}
                  </div>
                  <div className='flex-grow'>
                    <h2 className='text-xl'>{rejPlace.rejectedPlace.title}</h2>
                    <p className='text-sm mt-2'>{rejPlace.rejectedPlace.description}</p>
                    
                    <div className='text-lg mt-1' style={{color:"gray"}}>
                      -- Please See Reason For Rejection & Add New One With Right Data --
                    </div>
                  </div>
                 
                  <div className='card flex-shrink-0 justify-center' style={{ width: "10rem", backgroundColor:"#EE4B2B",color:"white",alignItems:"center" }}>
                      <div className='text-2xl'>
                        Rejected
                      </div>
                      <div>
                        Reason - 
                        {rejPlace.rejectedMessage}
                      </div>
                  </div>

                </div>
              </div>
            ))}
    </div>


    </div>
  )
}

export default Places