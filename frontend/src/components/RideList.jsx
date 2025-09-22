import React, { useEffect, useState } from "react";
import { getRides, bookRide } from "../services/api.js";

function RideList() {
  const [rides, setRides] = useState([]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const fetchRides = async () => {
    const data = await getRides();
    setRides(data);
  };

  const handleBook = async () => {
    await bookRide("testUserId", pickup, destination);
    setPickup("");
    setDestination("");
    fetchRides();
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div>
      <h2>Rides</h2>
      <input placeholder="Pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} />
      <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button onClick={handleBook}>Book Ride</button>

      <ul>
        {rides.map((ride) => (
          <li key={ride.id}>
            {ride.userId}: {ride.pickup} → {ride.destination} ({ride.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RideList;
