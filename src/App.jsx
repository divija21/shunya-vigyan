import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavComp from "./components/NavComp";
import Home from "./components/Home";
import Editor from "./Editor/EditorCont";
import Courses from "./components/Course";
import { LanguageProvider } from "./components/LanguageContext";
import Login from "./library/Login";
import UserDetails from "./library/UserDetails";
import LibraryList from "./library/LibraryList";
import Lali from "./lali/Lali";
import Jsplay from "./jsPlay/Jsplay";

import Prepare from "./prepare/Prepare";
import Certify from "./certify/Certify";
import JobBoard from "./JobBoard/JobBoard";
import SeatLayout from "./library/SeatLayout";
import PrivacyPolicy from "./components/LegalDocs/PrivacyPolicy";
import TermsConditions from "./components/LegalDocs/TermsConditions";
import RefundPolicy from "./components/LegalDocs/RefundPolicy";
import Contact from "./components/Contact/Contact";
import BookingSummary from "./library/BookingSummary";
import Success from "./library/Success";
import Failure from "./library/Failure";
import CoderHackathonPage from "./components/CoderHackathonPage";
import ProblemList from "./prepare/ProblemList";

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <NavComp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/librarylist" element={<LibraryList />} />
          <Route path="/lali" element=
          {<Lali />} />
          {/* <Route path="/Chatgpt" element={<Chatgpt/>}/> */}
          <Route path="/jsPlay" element={<Jsplay />} />
          <Route path="/domain/:domainName" element={<ProblemList />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/certify" element={<Certify />} />
          <Route path="/jobboard" element={<JobBoard />} />
          <Route path="/seatlayout" element={<SeatLayout />} />
          {/* <Route path='/payment' element={<Payment/>}/> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/hackthon" element={<CoderHackathonPage />} />

          <Route path="/booksummary" element={<BookingSummary />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
