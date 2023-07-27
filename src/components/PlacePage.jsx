import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from './BookingWidget';
import PlaceImg from './PlaceImg';
import PlaceGallary from './PlaceGallary';
import AddressLink from './AddressLink';

const PlacePage = () => {
    const {id} = useParams();
    const [place,setPlace]=useState(null);
    

    useEffect(()=>{
        if(!id)
        {
            return;
        }else{
            axios.get('/auth/places/'+id).then(res=>{
                setPlace(res.data);
            })
        }
    },[id])

    if(!place) return '';

   


  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8  pt-6'>
        
        <AddressLink place={place}/>
        
        <PlaceGallary place={place}/>

        <div className='grid mt-8 mb-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] text-smibold'>
            

            <div className=''>
            <div className='my-4'>
                <h2 className='font-semibold my-1 text-2xl'>Discription</h2>
                {place.discirption}
            </div>
                Check-in : {place.checkIn}<br/>
                Check-out : {place.checkOut}<br/>
                Max number of guests : {place.maxGuests}
              </div>
            <div>
                <BookingWidget place={place}/>
            </div>

        </div>
        <div className='bg-white -mx-8 px-8 py-3 border-t'>
            <div>
            <div>
                <h2 className='font-semibold my-1 text-2xl'>Extra Info</h2>
            </div>
        <div className='text-sm text-gray-500 mt-2 leading-5  mb-4'>{place.extraInfo}</div>
        
            </div>
        </div>
       
    </div>
  )
}

export default PlacePage