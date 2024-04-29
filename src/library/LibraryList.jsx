import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SeatLayout from "./SeatLayout";

const LibraryList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [content, setContent] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [rate, setRate] = useState(0);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLibrarySelect = (library) => {
    setSelectedLibrary(library);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleButtonClick = (timeSlot, libraryName, rate) => {
    setIsClicked(true);
    setSelectedTimeSlot(timeSlot);
    setSelectedLibrary(libraryName);
    setRate(rate);
    // Store the selected library and time slot data as an object
    const selectedData = {
      library: libraryName,
      rate: rate,
      timeSlot: timeSlot,
      selectedDate: selectedDate,
    };
    localStorage.setItem("selectedData", JSON.stringify(selectedData));
    console.log(selectedData);
  };

  const fetchLibraryData = async () => {
    try {
      const response = await axios.get(
        "https://xn--11by0j.com/api/v1/libraries/"
      );
      setContent(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching library data:", error);
      // You might want to set an error state here to display a message to the user.
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  return (
    <div className=" mt-0 bg-white w-[100vw]">
      <h1 className="text-2xl font-bold mb-4 mt-3 pl-3">
        Shuniya Vigyan Library Seat Booking
      </h1>
      <hr className="mb-4 w-[100vw]" />
      <div className="mb-4 flex">
        <h2 className="text-xl font-bold mb-2 pl-3 pr-4">Select Start Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          dateFormat="MMMM d, yyyy"
          className="p-2 border rounded"
        />
      </div>

      {content.map((library) => (
        <div
          key={library.id}
          className="bg-white border-1 overflow-hidden mb-4"
        >
          <div className="px-6 py-4 flex justify-between">
            <div>
              <h2 className="text-sm font-semibold mb-2 text-gray-800">
                {library.name}
              </h2>
              <p className="text-gray-600 mb-4 text-sm">{`${library.address}, ${library.city}, ${library.pin_code}, ${library.state}`}</p>
            </div>
            <div className="flex flex-wrap">
              {Object.entries(library.slots_timings_and_rate).map(
                ([slot, details]) => (
                  <button
                    key={slot}
                    className={`text-[green] text-sm border-solid border-1 border-black py-2 px-4 rounded mr-2 mb-2 h-9 ${
                      details.timing === "Closed"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={details.timing === "Closed"}
                    onClick={() =>
                      handleButtonClick(slot, library.name, details.rate)
                    }
                  >
                    {slot}: {details.start_time} - {details.end_time}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}

      {isClicked && <SeatLayout />}
    </div>
  );
};

export default LibraryList;
