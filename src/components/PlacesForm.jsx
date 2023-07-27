import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from './Perks';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import AccountNav from './AccountNav';


const PlacesForm = () => {
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuest]=useState(1);
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [redirect,setRedirect]=useState(false)
    const [price,setPrice]=useState(100);

    useEffect(()=>{
      if(!id)
      {
        return;
      }

      axios.get('/auth/places/'+id).then(response=>{
        const{data}=response;
        
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.discirption);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuest(data.maxGuests);
        setPrice(data.price)
      });
    },[id])

    function inputHeader(text)
  {
      return (
        <h2 className='text-2xl mt-4'>{text}</h2>
      )
  }

  function inputDiscription(text)
  {
    return (
      <p className='text-gray-500 text-sm mt-1 mx-1'>{text}</p>
    )
  }

  function preInput(header,description)
  {
    return (
      <div>
        {inputHeader(header)}
        {inputDiscription(description)}
      </div>
    )
  }

  async function savePlace(ev)
  {
    ev.preventDefault();

    const placeData={
      title,address, 
      discirption:description, perks, 
      extraInfo, checkIn, 
      photos:addedPhotos,
      checkOut, maxGuests,price
    }

    if(id)
    {
      await axios.put('auth/places',{
        id,...placeData})
        setRedirect(true)
    }else{
      await axios.post('auth/places',placeData)
        setRedirect(true)
    }

    
    }

   if(redirect)
   {
      return <Navigate to={'/account/places'}/>;
   }
 

  return (
    <div>
      <AccountNav/>
          <form onSubmit={savePlace} className='border mt-5 p-3 rounded-2xl border-gray'>
            {preInput('Title','Title for you page, should be short and catchy as in advertisement.')}
            <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='title, for example : My Lovely Location' />

            {preInput('Address','Address to tis place.')}      
            <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='address' />
            
            <PhotosUploader addedPhotos={addedPhotos}  onChange={setAddedPhotos}/>

            {preInput('Description','Description of the place.')} 
            <textarea value={description} onChange={ev=>setDescription(ev.target.value)} ></textarea>

            {preInput('Perks','Select all the perks for your places..')} 
            <Perks selected={perks} onChange={setPerks}/>

            {preInput('Extra Info','House Rules, etc.')} 
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} ></textarea>
            
            {preInput('Check in & out times, max guests','Add check in and out times, remember to have some time window for cleaning the room between guests.')} 
            <div className='grid gap-2 mt-1 mx-2 sm:grid-cols-2 md:grid-cols-4  '>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder='14:00'/>
              </div>

              <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder='11:00'/>
              </div>

              <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input type="number" value={maxGuests} onChange={ev=>setMaxGuest(ev.target.value)} />
              </div>

              <div>
                <h3 className='mt-2 -mb-1'>Price per night </h3>
                <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)} />
              </div>

            </div>
            
            <button style={{backgroundColor:"#F5385D"}} className='text-white  rounded-full btn btn-light mt-3 w-60'>Save</button>
     
          
            </form>
            </div>
  )
}

export default PlacesForm