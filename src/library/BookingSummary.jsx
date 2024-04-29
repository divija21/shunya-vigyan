import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
const BookingSummary = () => {
  const [data, setData] = useState("");
  const [booked, setBooked] = useState([]);
  const [nos, setNos] = useState();
  const [times, setTimes] = useState('');
  const total = booked.length;
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [name, setName] = useState("");

  const payload = {
    amount: nos*data.rate*100,
    currency: "INR",
    firebase_uuid: "jhdsjhdsjh",
  };  

  
 
 

  

 

  const handlePayment = (e) => {
    e.preventDefault();
    // setLoading2(true);
    axios.post('https://कोड.com/api/v1/initiate_payment/', payload)
        .then(res => {
            const payPageUrl = res.data.pay_page_url;
            setTransactionId(res.data.unique_transaction_id)
            console.log(payPageUrl);
            console.log(res.data);
            window.location.href = payPageUrl; // Redirect to the payment page
        })
        .catch(error => {
            setLoading2(false);
            console.error(error);
        });   
}


const checkPaymentStatus = (transactionId) => {
  axios.get(`https://कोड.com/api/v1/payment_status/${transactionId}`)
      .then(res => {
          // Handle response to check payment status
          console.log('status');
          console.log(res.data);
      })
      .catch(error => {
          console.error(error);
      });
}

// Call this function after payment is completed to check the status
if (transactionId) {
  checkPaymentStatus(transactionId);
}

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("selectedData"));
    console.log(user.timeSlot.rate)
    let booked = JSON.parse(localStorage.getItem("Booked"));
    setBooked(booked);
    setNos(booked.length);
    setTimes(user.timeSlot);
    setName(user.library);
    setData(user);
  }, [times]);

  // Function to format the date string to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-96 h-[80vh]">
        <h2 className="text-[rgb(198,44,114)] text-2xl font-light mb-4">
          Booking Summary
        </h2>
        <hr className="border-2 border-gray-400 my-4" />

        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Library Name:</p>
          <p className="text-gray-900">{name}</p>
        </div>
        <hr className="border-1 border-gray-400 my-4" />
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Date:</p>
          <p className="text-gray-900">{formatDate(data.selectedDate)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Time Slot:</p>
          <p className="text-gray-900">{data.timeSlot}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Seats Booked:</p>
          <p className="text-gray-900">
            {booked.length > 0
              ? `${booked.map((seat) => ` ${seat}`).join(", ")}`
              : "No seats booked"}
          </p>
        </div>
        <div className="flex justify-evenly mb-2 bg-yellow-100 h-[10vh] items-center mt-3">
          <p className="text-gray-700">Amount Payable:</p>
          <p className="text-gray-900">{nos*data.rate}</p>
        </div>
        <hr className="border-1 border-gray-400 mt-4" />

        <p className="text-xs flex p-1">
          <FaExclamationCircle className="pr-1" size={22} />
          By proceeding, I express my consent to complete this transaction.
        </p>

        <div className="flex justify-center">
          <button
            className="bg-[rgb(248,68,100)] w-96 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={booked.length === 0}
            onClick={handlePayment}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
