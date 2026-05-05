"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { createActivity, updateActivity, getActivity } from "@/lib/api";
import { Spinner } from "@/components/ui/Loading";

const EMPTY = {
  typeOfActivity: "",
  location: "",
  description: "",
  activityTimes: [{ startTime: null, endTime: null }],
  capacity: 1,
  price: 0,
  activityStatus: "available",
  imageSrc: "",
  skillLevel: "intermediate",
  ageGroup: "",
};

/**
 * Reusable activity form for both create and edit modes.
 * @param {object} props
 * @param {string} [props.activityId] If provided, the form is in edit mode and loads existing data.
 * @param {() => void} props.onSuccess
 * @param {() => void} props.onCancel
 */
export default function ActivityForm({ activityId, onSuccess, onCancel }) {
  const isEditMode = Boolean(activityId);
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;
    const load = async () => {
      try {
        const activity = await getActivity(activityId);
        setData({
          typeOfActivity: activity.typeOfActivity || "",
          location: activity.location || "",
          description: activity.description || "",
          activityTimes:
            activity.activityTimes?.map((t) => ({
              startTime: t.startTime ? new Date(t.startTime) : null,
              endTime: t.endTime ? new Date(t.endTime) : null,
            })) || [{ startTime: null, endTime: null }],
          capacity: activity.capacity || 1,
          price: activity.price || 0,
          activityStatus: activity.activityStatus || "available",
          imageSrc: activity.imageSrc || "",
          skillLevel: activity.skillLevel || "intermediate",
          ageGroup: activity.ageGroup || "",
        });
      } catch {
        toast.error("Could not load activity.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activityId, isEditMode]);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const handleTimeChange = (idx, key, value) => {
    setData((d) => {
      const next = [...d.activityTimes];
      next[idx] = { ...next[idx], [key]: value };
      return { ...d, activityTimes: next };
    });
  };

  const addTimeSlot = () => {
    setData((d) => ({
      ...d,
      activityTimes: [...d.activityTimes, { startTime: null, endTime: null }],
    }));
  };

  const removeTimeSlot = (idx) => {
    setData((d) => ({
      ...d,
      activityTimes: d.activityTimes.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.typeOfActivity.trim() || !data.location.trim()) {
      setError("Type and location are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      if (isEditMode) {
        await updateActivity(activityId, data);
        toast.success("Activity updated!");
      } else {
        await createActivity(data);
        toast.success("Activity created!");
      }
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Could not save activity.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="!w-8 !h-8 text-forest-700" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Type of activity *</label>
          <input
            type="text"
            value={data.typeOfActivity}
            onChange={(e) => update("typeOfActivity", e.target.value)}
            placeholder="Yoga, Hiking, Cooking..."
            className="input"
          />
        </div>
        <div>
          <label className="label">Location *</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Stockholm, Umeå..."
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          maxLength={500}
          className="input resize-y"
          placeholder="Describe the activity, what to bring, who it's for..."
        />
        <p className="text-xs text-ink-400 mt-1">
          {data.description.length}/500
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="label">Capacity</label>
          <input
            type="number"
            min={1}
            value={data.capacity}
            onChange={(e) => update("capacity", Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Price ($)</label>
          <input
            type="number"
            min={0}
            value={data.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Skill level</label>
          <select
            value={data.skillLevel}
            onChange={(e) => update("skillLevel", e.target.value)}
            className="input"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select
            value={data.activityStatus}
            onChange={(e) => update("activityStatus", e.target.value)}
            className="input"
          >
            <option value="available">Available</option>
            <option value="full-booked">Full</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Age group</label>
          <input
            type="text"
            value={data.ageGroup}
            onChange={(e) => update("ageGroup", e.target.value)}
            placeholder="18+, family-friendly..."
            className="input"
          />
        </div>
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            value={data.imageSrc}
            onChange={(e) => update("imageSrc", e.target.value)}
            placeholder="https://..."
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Time slots</label>
        <div className="space-y-2">
          {data.activityTimes.map((slot, idx) => (
            <div key={idx} className="flex flex-wrap gap-2 items-center">
              <DatePicker
                selected={slot.startTime}
                onChange={(d) => handleTimeChange(idx, "startTime", d)}
                showTimeSelect
                minDate={new Date()}
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Start"
                className="input"
              />
              <DatePicker
                selected={slot.endTime}
                onChange={(d) => handleTimeChange(idx, "endTime", d)}
                showTimeSelect
                minDate={slot.startTime || new Date()}
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="End"
                className="input"
              />
              {data.activityTimes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTimeSlot(idx)}
                  className="w-9 h-9 rounded-lg text-red-600 hover:bg-red-50 flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTimeSlot}
          className="btn-ghost mt-2 text-forest-700"
        >
          + Add time slot
        </button>
      </div>

      <div className="flex gap-3 pt-4 border-t border-ink-100">
        <button type="submit" disabled={submitting} className="btn-primary flex-1">
          {submitting ? <><Spinner /> Saving...</> : isEditMode ? "Save changes" : "Create activity"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
