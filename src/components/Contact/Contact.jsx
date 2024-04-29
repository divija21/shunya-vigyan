import React from "react";
import { FaEnvelopeOpenText, FaPhone, FaSearchLocation } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Contact() {

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">
          Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
        </p>
        <div className="flex justify-center">
          <div className="mr-8">
            <FaSearchLocation className="text-3xl mb-2" />
            <p className="text-lg">Boring Road, Patna, Bihar</p>
          </div>
          <div className="mr-8">
            <FaPhone className="text-3xl mb-2" />
            <p className="text-lg">+91 74780 95666</p>
          </div>
          <div>
            <FaEnvelopeOpenText className="text-3xl mb-2" />
            <p className="text-lg">ankit@shuniyavigyan.com</p>
          </div>
         
        </div>
        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6">
        Go to Home
      </Link>
      </section>
    </div>
  );
}
