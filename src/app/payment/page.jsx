"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { getActivity } from "@/lib/api";
import CreditCardForm from "@/components/CreditCardForm";
import { Spinner } from "@/components/ui/Loading";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <Spinner className="!w-10 !h-10 text-forest-700" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");
  const numberOfPersons = Number(searchParams.get("numberOfPersons") || 1);
  const selectedTimeSlot = searchParams.get("selectedTimeSlot");

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activityId) return;
    const fetch = async () => {
      try {
        const data = await getActivity(activityId);
        setActivity(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [activityId]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Spinner className="!w-10 !h-10 text-forest-700" />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="pt-24 container-page py-20 text-center">
        <h1 className="font-display text-2xl">Activity not found</h1>
      </div>
    );
  }

  const { typeOfActivity, price = 0, location, imageSrc } = activity;
  const total = price * numberOfPersons;
  const slotDate = selectedTimeSlot ? new Date(selectedTimeSlot) : null;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-forest-50/40 to-white">
      <div className="container-page max-w-5xl">
        <header className="mb-8">
          <span className="tag-forest mb-3">Checkout</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mt-3">
            Complete your booking
          </h1>
        </header>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Payment form */}
          <div className="card p-6 sm:p-8 order-2 lg:order-1">
            <h2 className="font-display text-xl font-bold text-ink-900 mb-5">
              Payment details
            </h2>
            <CreditCardForm
              activityId={activityId}
              price={price}
              persons={numberOfPersons}
            />
          </div>

          {/* Order summary */}
          <aside className="card p-6 order-1 lg:order-2 lg:sticky lg:top-28 h-fit">
            <h2 className="font-display text-lg font-bold text-ink-900 mb-4">
              Order summary
            </h2>

            <div className="flex gap-3 mb-5 pb-5 border-b border-ink-100">
              {imageSrc && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageSrc}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-ink-900 truncate">
                  {typeOfActivity}
                </h3>
                {location && (
                  <p className="text-sm text-ink-500 truncate">{location}</p>
                )}
                {slotDate && (
                  <p className="text-xs text-ink-500 mt-1">
                    {moment(slotDate).format("ddd, MMM D · h:mm A")}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <Row label={`$${price} × ${numberOfPersons} person${numberOfPersons === 1 ? "" : "s"}`} value={`$${total}`} />
              <Row label="Service fee" value="$0" muted />
              <div className="border-t border-ink-100 pt-3 mt-3">
                <Row label="Total" value={`$${total}`} bold />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-ink-500" : "text-ink-700"}>{label}</span>
      <span
        className={
          bold
            ? "font-display font-bold text-lg text-ink-900"
            : "font-medium text-ink-900"
        }
      >
        {value}
      </span>
    </div>
  );
}
