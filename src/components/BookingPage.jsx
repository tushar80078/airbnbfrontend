import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "./AddressLink";
import PlaceGallary from "./PlaceGallary";
import BookingDates from "./BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/auth/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 m-1">
      <AddressLink className={"my-2 block"} place={booking.place} />

      <div className="bg-gray-300 flex justify-between items-center p-6 my-6 rounded-2xl">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information : </h2>
          <BookingDates booking={booking} />
        </div>

        <div className="bg-primary p-6 text-white text-center rounded-2xl ">
          <div className="text-lg">Total Price</div>
          <div className="text-3xl">$ {booking.price}</div>
        </div>
      </div>
      <PlaceGallary place={booking.place} />
    </div>
  );
};

export default BookingPage;
