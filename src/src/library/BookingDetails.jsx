import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingDetails = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState('');

  const payload = {
    amount: 300,
    currency: 'INR',
    firebase_uuid: 'jhdsjhdsjh'
  };

  const intiatePayment = async () => {
    try {
      const response = await axios.post('http://xn--11by0j.com:8000/api/v1/initiate_payment/', payload);
      console.log('Payment initiated successfully:', response.data.pay_page_url);
      setPaymentUrl(response.data.pay_page_url);
      
      return redirectToPaymentPage(response.data.pay_page_url);
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error here
    }
  };

  const redirectToPaymentPage = (url) => {
    window.location.href = url;
  };

  const loadDataFromLocalStorage = () => {
    const bookedData = localStorage.getItem('Booked');
    if (bookedData) {
      setSelectedSeats(JSON.parse(bookedData));
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <ul className="list-disc pl-4 mb-4">
        {selectedSeats.map((seatId) => (
          <li key={seatId}>Seat {seatId}</li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-[40vw]"
        onClick={intiatePayment}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingDetails;  
