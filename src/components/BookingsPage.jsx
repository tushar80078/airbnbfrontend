import React, { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/auth/bookings")
      .then((data) => {
        setBookings(data.data);
      })
      .catch((err) => {
        console.log("err");
        alert(JSON.stringify(err));
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-4 ">
        {bookings?.length > 0 &&
          bookings.map((booking, i) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={i}
              className="flex mt-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking?.place} />
              </div>

              <div className="py-3   mt-3 pr-3 grow">
                <h2 className="text-xl">{booking?.place?.title}</h2>

                <div className="text-lg mt-3 ml-2">
                  <BookingDates booking={booking} />

                  <div className="flex gap-1 items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="">Total Price : ${booking.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
