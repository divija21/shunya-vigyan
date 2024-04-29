import React, { useState } from 'react';
import SeatLayout from './SeatLayout';

const BookingContainer = () => {
  const totalSeats = 50;
  const [availableSeats, setAvailableSeats] = useState(Array.from({ length: totalSeats }, (_, index) => index + 1));
  const [reservedSeats, setReservedSeats] = useState([1,2,6]);
  const [selectedSeats, setSelectedSeats] = useState([5,8]);

  const handleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const handleSeatReservation = () => {
    setReservedSeats((prevReservedSeats) => [...prevReservedSeats, ...selectedSeats]);
    setAvailableSeats((prevAvailableSeats) =>
      prevAvailableSeats.filter((seat) => !selectedSeats.includes(seat))
    );
    setSelectedSeats([]);
  };

  const handleBookNow = () => {
    // Add logic to handle the booking process
    alert(`Booking confirmed for seats: ${selectedSeats.join(', ')}`);
  };

  return (
    <SeatLayout
      availableSeats={availableSeats}
      reservedSeats={reservedSeats}
      selectedSeats={selectedSeats}
      handleSeatSelection={handleSeatSelection}
      handleSeatReservation={handleSeatReservation}
      handleBookNow={handleBookNow}
      totalSeats={totalSeats}
    />
  );
};

export default BookingContainer;
