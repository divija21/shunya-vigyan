import React from 'react';

const Payment = () => {
  const handlePaymentClick = () => {
    // Redirect to the payment URL
    window.location.href = 'https://mercury-t2.phonepe.com/transact/pg?token=MjNlNTgyNDFhODhiNmM3ZWZkN2FhM2E2ZTRjMjQ4OGY4YjcwMzE1YTkyYjA1YmE1YTVkMGY1NGU4MTRlYzllMzNkZDM5OWViZjlmMjU5NTYxY2U0MGFjMmVhMmYxMmMxNjcwNzViNWQ0YTJlNjdmNWIyODg4YmQxN2Y5MmRlYzk6ZWZkMTA1ZTQxYWFjY2M5NjU2MzliMzBmNmYzNmJkYjI';
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePaymentClick}>Make Payment</button>
    </div>
  );
};

export default Payment;
