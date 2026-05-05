"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";
import { getActivity, createReservation } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { Spinner } from "@/components/ui/Loading";

export default function BookingPage({ params }) {
  const router = useRouter();
  const activityId = params.id;
  const isAuthenticated = getAuthToken();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [persons, setPersons] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    const fetch = async () => {
      try {
        const data = await getActivity(activityId);
        setActivity(data);
        if (data.activityTimes?.[0]) {
          setSelectedSlot(data.activityTimes[0].startTime);
        }
      } catch (err) {
        toast.error("Could not load activity.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [activityId, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Spinner className="!w-10 !h-10 text-forest-700" />
      </div>
    );
  }

  if (!activity) return null;

  const { price = 0, capacity = 0, activityTimes = [], reservations = [], typeOfActivity, activityStatus } = activity;
  const spotsLeft = Math.max(0, capacity - (reservations?.length || 0));
  const isFull = activityStatus === "full-booked" || spotsLeft === 0;
  const total = price * persons;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (persons < 1 || persons > spotsLeft) {
      toast.error(`Please choose between 1 and ${spotsLeft} persons.`);
      return;
    }
    if (!selectedSlot) {
      toast.error("Please pick a time slot.");
      return;
    }

    setSubmitting(true);
    try {
      // Note: bookingStatus intentionally NOT sent — server controls status
      await createReservation(activityId, {
        numberOfPersons: persons,
        selectedTimeSlot: selectedSlot,
      });
      toast.success("Reservation confirmed!");
      router.push(
        `/payment?activityId=${activityId}&numberOfPersons=${persons}&selectedTimeSlot=${selectedSlot}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Reservation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-forest-50/40 to-white">
      <div className="container-page max-w-2xl">
        <button
          onClick={() => router.back()}
          className="text-sm text-ink-500 hover:text-forest-700 transition-colors inline-flex items-center gap-1.5 mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="card p-8">
          <div className="mb-6">
            <span className="tag-forest mb-3">Booking</span>
            <h1 className="font-display text-3xl font-bold text-ink-900 tracking-tight">
              {typeOfActivity}
            </h1>
          </div>

          {isFull && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              This activity is fully booked. No more reservations are allowed.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Number of persons</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPersons((p) => Math.max(1, p - 1))}
                  disabled={persons <= 1 || isFull}
                  className="w-10 h-10 rounded-xl border border-ink-200 flex items-center justify-center hover:bg-ink-50 disabled:opacity-50"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={spotsLeft}
                  value={persons}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 1 && v <= spotsLeft) setPersons(v);
                  }}
                  className="input !w-24 text-center font-semibold"
                  disabled={isFull}
                />
                <button
                  type="button"
                  onClick={() => setPersons((p) => Math.min(spotsLeft, p + 1))}
                  disabled={persons >= spotsLeft || isFull}
                  className="w-10 h-10 rounded-xl border border-ink-200 flex items-center justify-center hover:bg-ink-50 disabled:opacity-50"
                >
                  +
                </button>
                <span className="text-sm text-ink-500 ml-2">
                  {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} available
                </span>
              </div>
            </div>

            {activityTimes.length > 0 && (
              <div>
                <label className="label">Select a time slot</label>
                <div className="space-y-2">
                  {activityTimes.map((slot, idx) => (
                    <label
                      key={slot._id || idx}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSlot === slot.startTime
                          ? "border-forest-700 bg-forest-50"
                          : "border-ink-100 hover:border-ink-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={slot.startTime}
                        checked={selectedSlot === slot.startTime}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-ink-900">
                            {moment(slot.startTime).format("dddd, MMM D")}
                          </div>
                          <div className="text-sm text-ink-500 mt-0.5">
                            {moment(slot.startTime).format("h:mm A")} –{" "}
                            {moment(slot.endTime).format("h:mm A")}
                          </div>
                        </div>
                        {selectedSlot === slot.startTime && (
                          <div className="w-6 h-6 rounded-full bg-forest-700 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="p-4 rounded-xl bg-ink-50 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-500">
                  Total
                </div>
                <div className="text-xs text-ink-500 mt-0.5">
                  ${price} × {persons} person{persons === 1 ? "" : "s"}
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-ink-900">
                ${total}
              </div>
            </div>

            <button
              type="submit"
              disabled={isFull || submitting || !selectedSlot}
              className="btn-primary w-full !py-4"
            >
              {submitting ? <><Spinner /> Confirming...</> : "Confirm booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
