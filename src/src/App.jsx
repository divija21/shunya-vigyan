import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavComp from "./components/NavComp";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Courses from "./components/Course";
import LiveCourse from "./components/LiveCourse";
import { LanguageProvider } from "./components/LanguageContext";
import Login from "./library/Login";
import UserDetails from "./library/UserDetails";
import LibraryList from "./library/LibraryList";
import SeatLayout from "./library/SeatLayout";
import PrivacyPolicy from "./components/LegalDocs/PrivacyPolicy";
import TermsConditions from "./components/LegalDocs/TermsConditions";
import RefundPolicy from "./components/LegalDocs/RefundPolicy";
import BookingDetails from "./library/BookingDetails";
import Contact from "./components/Contact/Contact"
import CoderHackathonPage from './components/CoderHackathonPage';
const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <NavComp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/livecourse" element={<LiveCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/librarylist" element={<LibraryList />} />
          <Route path="/librarylist2" element={<CoderHackathonPage />} />
          <Route path="/seatlayout" element={<SeatLayout />} />
          <Route path="/BookingDetails" element={<BookingDetails />} />
          {/* <Route path='/payment' element={<Payment/>}/> */}
          <Route path="/contact" element={<Contact/>}/>
          <Route  path="/privacy-policy" element={<PrivacyPolicy/>} />
              <Route path="/refund-policy" element={<RefundPolicy/>} />
              <Route
                path="/terms-conditions"
                element={<TermsConditions/>}
              />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
