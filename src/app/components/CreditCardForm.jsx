import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreditCardForm = ({ activityId, price, persons }) => {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted");
    router.push(
      `/confirmation?activityId=${activityId}&price=${price}&persons=${persons}`
    );
  };
  return (
    <form className="max-w-md mx-auto mt-8 p-8 border rounded-lg shadow-lg">
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor="cardNumber"
      >
        Card Number:
      </label>
      <input
        type="text"
        id="cardNumber"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full p-2 border rounded"
        maxLength={16}
        required
      />

      <label
        className="block mt-4 mb-2 text-sm font-bold text-gray-700"
        htmlFor="cardHolder"
      >
        Card Holder:
      </label>
      <input
        type="text"
        id="cardHolder"
        placeholder="John Doe"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label
        className="block mt-4 mb-2 text-sm font-bold text-gray-700"
        htmlFor="expirationDate"
      >
        Expiration Date:
      </label>
      <input
        type="text"
        id="expirationDate"
        placeholder="MM/YY"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label
        className="block mt-4 mb-2 text-sm font-bold text-gray-700"
        htmlFor="cvv"
      >
        CVV:
      </label>
      <input
        type="text"
        id="cvv"
        placeholder="123"
        value={cvv}
        onChange={(e) => setCVV(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="button"
        className="outline_btn mt-3 hover:cursor-pointer"
        onClick={submitForm}
      >
        Submit
      </button>
    </form>
  );
};

export default CreditCardForm;
