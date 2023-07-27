import React, { useState } from 'react'

const PlaceGallary = ({place}) => {

    const [showAllPhotos,setShowAllPhotos]=useState(false);


    if(showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white  min-h-screen'>
               
                <div className='bg-black p-8 grid gap-4'>
                <div >
                    <h2 className='text-2xl font-bold'>{place.title}</h2>
                    <button onClick={()=>setShowAllPhotos(false)} className='fixed flex right-12 top-8 gap-1 py-1 px-2 rounded-2xl shadow-gray-500 bg-white text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
                    <span className='font-bold'>Close</span>
                    </button>
                </div>
                {
                
                        place?.photos?.length>0 && place.photos.map((photo,i) =>(
                            <div key={i}>
                                <img className='w-full' src={'http://localhost:4000/uploads/'+photo} />
                            </div>
                        ))
                        
                }
                </div>
              </div>
        )
    }
  return (
    <div className='relative'>
        <div className='grid gap-2 rounded-2xl overflow-hidden grid-cols-[2fr_1fr]'>
            <div>
                {place.photos?.[0] && (
                    <div className='  '>
                        <img className='aspect-square w-full object-cover' src={'http://localhost:4000/uploads/'+place.photos[0]}></img>
                    </div>
                      )}
                </div>

            <div className='grid '> 
                {place.photos?.[1] && (
                    <img className='aspect-square object-cover w-full' src={'http://localhost:4000/uploads/'+place.photos[1]}></img>
                )}
                
                <div className='border overflow-hidden' >
                {place.photos?.[2] && (
                    <img className='aspect-square object-cover w-full relative top-2' src={'http://localhost:4000/uploads/'+place.photos[2]}></img>
                )}
                </div>
               
                </div>

                
        </div>
       

        <button onClick={()=>setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 px-2 py-2 bg-white rounded-2xl shadow shadow-gray-500'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            Show More Photos</button>
        </div>
  )
}

export default PlaceGallary