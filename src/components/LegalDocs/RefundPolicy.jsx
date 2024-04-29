import React from "react";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <p className="text-lg mb-8">
        At Code.com, we strive to provide high-quality products and services that meet our customers' needs. However, due to the nature of our business, we do not offer refunds or exchanges on any of our products or services. By purchasing from Code.com, you acknowledge and agree to these terms.
      </p>
      <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Go to Home
      </Link>
    </div>
  );
}
