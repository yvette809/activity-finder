"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/Loading";

export default function CreditCardForm({ activityId, price, persons }) {
  const router = useRouter();
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const formatCardNumber = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (card.number.replace(/\s/g, "").length < 16) {
      toast.error("Please enter a valid card number.");
      return;
    }
    setSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      router.push(
        `/confirmation?activityId=${activityId}&price=${price}&persons=${persons}`
      );
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 rounded-xl bg-sun-50 border border-sun-200 text-xs text-sun-800 flex items-start gap-2">
        <span className="mt-0.5">💡</span>
        <span>
          This is a demo. Use any test card details — no real charges will be
          made.
        </span>
      </div>

      <div>
        <label className="label">Card number</label>
        <input
          type="text"
          inputMode="numeric"
          value={card.number}
          onChange={(e) =>
            setCard({ ...card, number: formatCardNumber(e.target.value) })
          }
          placeholder="1234 5678 9012 3456"
          className="input font-mono tracking-wider"
          required
        />
      </div>

      <div>
        <label className="label">Cardholder name</label>
        <input
          type="text"
          value={card.holder}
          onChange={(e) => setCard({ ...card, holder: e.target.value })}
          placeholder="JANE DOE"
          className="input uppercase"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Expiry</label>
          <input
            type="text"
            inputMode="numeric"
            value={card.expiry}
            onChange={(e) =>
              setCard({ ...card, expiry: formatExpiry(e.target.value) })
            }
            placeholder="MM/YY"
            maxLength={5}
            className="input font-mono"
            required
          />
        </div>
        <div>
          <label className="label">CVV</label>
          <input
            type="text"
            inputMode="numeric"
            value={card.cvv}
            onChange={(e) =>
              setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
            }
            placeholder="123"
            className="input font-mono"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full !py-4 !mt-6"
      >
        {submitting ? (
          <>
            <Spinner /> Processing...
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
            Pay ${price * persons}
          </>
        )}
      </button>

      <p className="text-xs text-center text-ink-400 flex items-center justify-center gap-1.5 pt-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="11" x="3" y="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Secured with industry-standard encryption
      </p>
    </form>
  );
}
