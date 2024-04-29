import React from "react";
import { Link } from "react-router-dom";
export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: April 8th ,2024</p>
      <p className="mb-4">
        ShuniyaVigyan operates the कोड.com , codewala.org website and कोड mobile app. This
        page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our website and the choices you
        have associated with that data.
      </p>
      <p className="mb-4">
        We use your data to provide and improve the website and services. By
        using the website, you agree to the collection and use of information in
        accordance with this policy.
      </p>
      <h2 className="text-xl font-semibold mb-2">Information Collection and Use</h2>
      <p className="mb-4">
        We collect several different types of information for various purposes
        to provide and improve our service to you.
      </p>
      <h3 className="text-lg font-semibold mb-2">Types of Data Collected</h3>
      <ul className="list-disc ml-8 mb-4">
        <li>Personal Data</li>
        <li>Usage Data</li>
        <li>Cookies and Usage Data</li>
      </ul>
      <h3 className="text-lg font-semibold mb-2">Use of Data</h3>
      <ul className="list-disc ml-8 mb-4">
        <li>To provide and maintain the service</li>
        <li>To notify you about changes to our service</li>
        <li>To allow you to participate in interactive features of our service</li>
        <li>To provide customer care and support</li>
        <li>To provide analysis or valuable information so that we can improve the service</li>
        <li>To monitor the usage of the service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>
      <h3 className="text-lg font-semibold mb-2">Transfer of Data</h3>
      <p className="mb-4">
        Your information, including Personal Data, may be transferred to - and
        maintained on - computers located outside of your state, province,
        country, or other governmental jurisdiction where the data protection
        laws may differ from those of your jurisdiction.
      </p>
      <h3 className="text-lg font-semibold mb-2">Disclosure of Data</h3>
      <ul className="list-disc ml-8 mb-4">
        <li>Comply with a legal obligation</li>
        <li>Protect and defend the rights or property of [insert website/app name]</li>
        <li>Prevent or investigate possible wrongdoing in connection with the service</li>
        <li>Protect the personal safety of users of the service or the public</li>
        <li>Protect against legal liability</li>
      </ul>
      <h3 className="text-lg font-semibold mb-2">Security of Data</h3>
      <p className="mb-4">
        The security of your data is important to us, but remember that no
        method of transmission over the Internet or method of electronic storage
        is 
 100% secure. While we strive to use commercially acceptable means to
        protect your Personal Data, we cannot guarantee its absolute security.
      </p>
      <h3>Links to Other Sites</h3>
      <p>
        Our service may contain links to other sites that are not operated by
        us. If you click on a third-party link, you will be directed to that
        third party's site. We strongly advise you to review the Privacy Policy
        of every site you visit.
      </p>
      <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-3">
        Go to Home
      </Link>
    </div>
  );
}
