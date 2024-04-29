import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeatLayout = () => {
  const totalSeats = 150; // Total number of seats
  const seatsInRow = 20; // Number of seats in a row
  const defaultReservedSeats = [2, 4, 6, 8, 10, 23, 34, 45]; // Default reserved seats
  const [selectedLibraryData, setSelectedLibraryData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const libData = JSON.parse(localStorage.getItem("selectedData"));
    setSelectedLibraryData(libData);
  }, []);

  const [availableSeats, setAvailableSeats] = useState(
    Array.from({ length: totalSeats }, (_, index) => index + 1)
  );
  const [reservedSeats, setReservedSeats] = useState(defaultReservedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBookingEnabled, setIsBookingEnabled] = useState(false);
  const [booked, setBooked] = useState([]);
  const [bookingDuration, setBookingDuration] = useState(1); // Default booking duration is 1 month

  const handleSeatSelection = (seatId) => {
    if (reservedSeats.includes(seatId)) {
      return; // Do not allow selecting reserved seats
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seatId
        );
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });

    setIsBookingEnabled(false);
  };

  const handleSeatReservation = () => {
    setReservedSeats((prevReservedSeats) => [
      ...prevReservedSeats,
      ...selectedSeats,
    ]);
    setAvailableSeats((prevAvailableSeats) =>
      prevAvailableSeats.filter((seat) => !selectedSeats.includes(seat))
    );
    setBooked([...booked, ...selectedSeats]);
    setSelectedSeats([]);
    setIsBookingEnabled(true);
  };

  const handleBookNow = () => {
    localStorage.setItem("Booked", JSON.stringify(booked));
    navigate("/booksummary");
  };

  const handleDurationChange = (event) => {
    setBookingDuration(parseInt(event.target.value));
  };

  const renderSeat = (seatId) => {
    const isAvailable = availableSeats.includes(seatId);
    const isReserved = reservedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    const seatClasses = classNames(
      "p-2 m-1 cursor-pointer  w-8 h-8 flex items-center justify-center transition duration-300 relative",
      {
        "border-1 border-green-500 hover:bg-green-600 text-[green]":
          isAvailable && !isReserved && !isSelected, // Apply green background for available seats
        "bg-[rgb(238,238,238)] text-white": isReserved && !isSelected, // Apply gray background for reserved seats
        "bg-white text-gray-700": isSelected, // Apply white background for selected seats
        "cursor-not-allowed": !isAvailable || isReserved, // Disable cursor for unavailable or reserved seats
      }
    );

    return (
      <div
        key={seatId}
        className={seatClasses}
        onClick={() => handleSeatSelection(seatId)}
        disabled={!isAvailable || isReserved}
      >
        <div className="cube absolute w-full h-full "></div>
        <div
          className="absolute w-full h-full flex items-center justify-center z-10"
          style={{
            backgroundColor: isSelected ? "green" : "",
            color: isSelected ? "white" : "",
          }}
        >
          {isSelected ? "X" : seatId}
        </div>
      </div>
    );
  };

  const renderSeatGrid = () => {
    const seatRows = [];
    const totalRows = Math.ceil(totalSeats / seatsInRow); // Calculate the total number of rows needed

    for (let i = 0; i < totalRows; i++) {
      const startSeatId = i * seatsInRow + 1;
      const endSeatId = Math.min((i + 1) * seatsInRow, totalSeats);
      const seatRow = (
        <div className="flex" key={`row-${i}`}>
          {Array.from({ length: endSeatId - startSeatId + 1 }, (_, index) =>
            renderSeat(startSeatId + index)
          )}
        </div>
      );
      seatRows.push(seatRow);
    }

    return seatRows;
  };

  return (
    <div className="flex flex-col items-center space-y-4 justify-center h-[100vh]">
      <div className="text-gray-700">
        {selectedSeats.length > 0 &&
          `Selected Seats: ${selectedSeats.join(", ")}`}
      </div>
      <div>{renderSeatGrid()}</div>
      <div className="text-gray-700">
        <span>
          <span className="px-2 mx-1 border-1 border-green-500 text-[green]">
            Available
          </span>
          <span className="px-2 mx-1 bg-[rgb(238,238,238)] text-white">
            Reserved
          </span>
        </span>
      </div>
      <div className="text-gray-700">
        {selectedSeats.length > 0 && (
          <>
            <div>Click again on the selected seat to unselect.</div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-3 ml-3"
              onClick={handleSeatReservation}
              disabled={selectedSeats.length === 0}
            >
              Reserve Selected Seats
            </button>
          </>
        )}
      </div>
      {isBookingEnabled && (
        <div className="text-gray-700 mt-4">
          <label htmlFor="durationSelect">Select Booking Duration: </label>
          <select
            id="durationSelect"
            value={bookingDuration}
            onChange={handleDurationChange}
          >
            <option value={1}>1 month</option>
            <option value={2}>2 months</option>
            <option value={3}>3 months</option>
            {/* Add more options as needed */}
          </select>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-3"
            onClick={handleBookNow}
            disabled={booked.length === 0}
          >
            Book Now
          </button>
        </div>
      )}
      {/* {selectedLibraryData && (
        <div className="text-gray-700 mt-4">
          <h2>Library Name: {selectedLibraryData.name}</h2>
          <p>Library Address: {selectedLibraryData.address}</p>
          <p>Time Slot: {selectedLibraryData.timeSlot}</p>
        </div>
      )} */}
    </div>
  );
};

export default SeatLayout;
