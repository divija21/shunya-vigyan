import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LibraryList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    navigate('/seatlayout');
  };

  const fetchLibraryData = async () => {
    try {
      const response = await axios.get('http://20.244.86.231:8000/api/v1/libraries/');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  return (
    <div className="container mx-auto mt-0 p-6">
      <h1 className="text-2xl font-bold mb-4 mt-3">Shuniya Vigyan Library Seat Booking</h1>
      <hr className="mb-4" />

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Select a Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          dateFormat="MMMM d, yyyy"
          className="p-2 border rounded"
        />
      </div>

      {content.map((library, id) => (
        <div key={id} className="bg-white border shadow-lg rounded-lg overflow-hidden mx-auto mb-8">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{library.name}</h2>
            <p className="text-gray-600 mb-4">{`${library.address}, ${library.city}, ${library.pin_code}, ${library.state}`}</p>
            <div className="flex flex-wrap">
              {Object.entries(library.slots_timings_and_rate).map(([slot, details]) => (
                <button
                  key={slot}
                  className={`bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2 ${
                    details.timing === 'Closed' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={details.timing === 'Closed'}
                  onClick={handleButtonClick}
                >
                  {slot}: {details.timing} - {details.price}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
