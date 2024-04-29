import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const SeatLayout = () => {
  const totalSeats = 50; // Example: Total number of seats
  const seatsInRow = 10; // Example: Number of seats in a row
  const [availableSeats, setAvailableSeats] = useState(Array.from({ length: totalSeats }, (_, index) => index + 1));
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBookingEnabled, setIsBookingEnabled] = useState(false);
  const [booked,setBooked]=useState([]);

  const navigate=useNavigate();

  

  const handleSeatSelection = (seatId) => {
    if (reservedSeats.includes(seatId)) {
      return; // Do not allow selecting reserved seats
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        // If seat is already selected, unselect it
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatId);
      } else {
        // If seat is not selected, select it
        return [...prevSelectedSeats, seatId];
      }
    });

    setIsBookingEnabled(false); // Disable booking after seat selection
  };

  const handleSeatReservation = () => {
    setReservedSeats((prevReservedSeats) => [...prevReservedSeats, ...selectedSeats]);
    setAvailableSeats((prevAvailableSeats) =>
      prevAvailableSeats.filter((seat) => !selectedSeats.includes(seat))
    );
    setBooked([...selectedSeats]);
    
    setSelectedSeats([]); // Clear selected seats after reservation
    setIsBookingEnabled(true); // Enable booking after seat reservation
  };

  const handleBookNow = () => {
    console.log(booked);
    localStorage.setItem('Booked', JSON.stringify(booked));
    const bookedData =JSON.parse( localStorage.getItem('Booked'));
    console.log(bookedData);
    navigate('/bookingdetails')
  };

  const renderSeat = (seatId) => {
    const isAvailable = availableSeats.includes(seatId);
    const isReserved = reservedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    const seatClasses = classNames(
      'p-2 m-1 cursor-pointer border border-gray-300 w-8 h-8 flex items-center justify-center transition duration-300 relative',
      {
        'bg-green-500 text-white': isAvailable && !isReserved && !isSelected,
        'bg-white text-gray-700': isSelected,
        'cursor-not-allowed bg-red-500': !isAvailable || isReserved,
      }
    );

    return (
      <div
        key={seatId}
        className={seatClasses}
        onClick={() => handleSeatSelection(seatId)}
        disabled={!isAvailable || isReserved}
      >
        <div className="cube absolute w-full h-full bg-gray-300"></div>
        <div className="absolute w-full h-full flex items-center justify-center z-10">
          {isSelected ? 'X' : seatId}
        </div>
      </div>
    );
  };

  const renderSeatGrid = () => {
    const seatRows = [];

    for (let i = 0; i < totalSeats; i += seatsInRow) {
      seatRows.push(
        <div className="flex" key={`row-${i / seatsInRow}`}>
          {Array.from({ length: seatsInRow }, (_, index) => renderSeat(i + index + 1))}
        </div>
      );
    }

    return seatRows;
  };

  return (
    <div className="flex flex-col items-center space-y-4 justify-center h-[100vh]">
      <div className="text-gray-700">
        {selectedSeats.length > 0 && `Selected Seats: ${selectedSeats.join(', ')}`}
      </div>
      <div className="">{renderSeatGrid()}</div>
      <div className="text-gray-700">
        {selectedSeats.length > 0 && (
          <span>
            Click again on the selected seat to unselect.{' '}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleSeatReservation}
              disabled={selectedSeats.length === 0}
            >
              Reserve Selected Seats
            </button>
          </span>
        )}
      </div>
      {isBookingEnabled && (
        <div className="text-gray-700 mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleBookNow}
            disabled={booked.length === 0}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
