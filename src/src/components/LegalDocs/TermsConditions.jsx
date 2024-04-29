import React from "react";
import { Link } from "react-router-dom";
export default function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the [insert website/app URL] website and [insert any other services provided] (the "Service") operated by [insert website/app name] ("us", "we", or "our").
      </p>
      <p className="mb-4">
        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
      </p>
      <h2 className="text-xl font-bold mb-2">Accounts</h2>
      <p className="mb-4">
        When you create an account with us, you must provide us with accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
      </p>
      <p className="mb-4">
        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
      </p>
      <p className="mb-6">
        You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
      </p>
      <h2 className="text-xl font-bold mb-2">Content</h2>
      <p className="mb-4">
        Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
      </p>
      <p className="mb-4">
        By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
      </p>
      <p className="mb-6">
        We reserve the right to terminate the account of anyone found to be infringing on a copyright.
      </p>
      <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of [insert website/app name] and its licensors.
      </p>
      <p className="mb-6">
        The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
      </p>
      <h2 className="text-xl font-bold mb-2">Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </p>
      <p className="mb-6">
        Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
      </p>
      <h2 className="text-xl font-bold mb-2">Changes</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
      </p>
      <p>
        By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
      </p>
      <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-3">
        Go to Home
      </Link>
    </div>
  );
}
