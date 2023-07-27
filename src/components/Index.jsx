import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "../UserContext";
import axios from "axios";

const Index = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/auth/all-places")
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        alert("Please Try After Some Time. Server Error!!");
      });
  }, []);

  console.log(places);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-2  lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, i) => (
          <Link to={"/place/" + place._id} key={i}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold ">{place.address}</h3>
            <h2 className="text-sm leading-4 text-gray-500">{place.title}</h2>
            <div className="mt-2">
              <span className="font-bold"> ${place.price} Night</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Index;
