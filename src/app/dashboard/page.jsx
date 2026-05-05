"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";
import { getActivities, deleteActivity } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Loading";
import ActivityForm from "@/components/ActivityForm";

export default function DashboardPage() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    setAuthToken(token);
    setUserInfo(getUserInfoFromAuthToken());
    if (!token) router.push("/login");
  }, [router]);

  const loadActivities = useCallback(async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch {
      toast.error("Could not load activities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authToken) loadActivities();
  }, [authToken, loadActivities]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity? This cannot be undone.")) return;
    try {
      await deleteActivity(id);
      toast.success("Activity deleted.");
      setActivities((acts) => acts.filter((a) => a._id !== id));
    } catch {
      toast.error("Could not delete activity.");
    }
  };

  const handleSuccess = () => {
    setShowCreate(false);
    setEditingId(null);
    loadActivities();
  };

  const isTrainer = userInfo?.role === "trainer";
  const myActivities = activities.filter(
    (a) => a?.creator?._id === userInfo?._id
  );

  return (
    <ClientOnly>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container-page">
          <header className="mb-10">
            <span className="tag-forest mb-3">Dashboard</span>
            <h1 className="font-display text-4xl font-extrabold text-ink-900 tracking-tight mt-3 capitalize">
              Welcome back, {userInfo.firstName || "there"} 👋
            </h1>
            <p className="text-ink-500 mt-2">
              {isTrainer
                ? "Manage your activities and view bookings."
                : "Browse activities and check your reservations."}
            </p>
          </header>

          {/* Quick links for non-trainers */}
          {!isTrainer && userInfo?._id && (
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href={`/reservations/user/${userInfo._id}`}
                className="btn-primary"
              >
                <span>📅</span> My bookings
              </Link>
              <Link href="/" className="btn-secondary">
                Browse activities
              </Link>
            </div>
          )}

          {/* Trainer panel */}
          {isTrainer && (
            <>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-900">
                    Your activities
                  </h2>
                  <p className="text-sm text-ink-500 mt-1">
                    {myActivities.length} active activit
                    {myActivities.length === 1 ? "y" : "ies"}
                  </p>
                </div>
                <button
                  onClick={() => setShowCreate(true)}
                  className="btn-primary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  New activity
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Spinner className="!w-10 !h-10 text-forest-700" />
                </div>
              ) : myActivities.length === 0 ? (
                <EmptyState
                  icon={<span className="text-3xl">🎯</span>}
                  title="No activities yet"
                  description="Create your first activity to start receiving bookings."
                  action={
                    <button
                      onClick={() => setShowCreate(true)}
                      className="btn-primary"
                    >
                      Create your first activity
                    </button>
                  }
                />
              ) : (
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-ink-50 border-b border-ink-100">
                        <tr>
                          <Th>Activity</Th>
                          <Th>Location</Th>
                          <Th>Bookings</Th>
                          <Th>Next session</Th>
                          <Th>Price</Th>
                          <Th align="right">Actions</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {myActivities.map((a) => (
                          <tr
                            key={a._id}
                            className="border-b border-ink-100 last:border-b-0 hover:bg-ink-50/50 transition-colors"
                          >
                            <Td>
                              <Link
                                href={`/activities/${a._id}`}
                                className="font-semibold text-ink-900 hover:text-forest-700"
                              >
                                {a.typeOfActivity}
                              </Link>
                            </Td>
                            <Td>{a.location}</Td>
                            <Td>
                              <span className="tag-forest">
                                {a.reservations?.length || 0} / {a.capacity}
                              </span>
                            </Td>
                            <Td>
                              {a.activityTimes?.[0]
                                ? moment(a.activityTimes[0].startTime).format(
                                    "MMM D, h:mm A"
                                  )
                                : "—"}
                            </Td>
                            <Td className="font-semibold">${a.price}</Td>
                            <Td align="right">
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => setEditingId(a._id)}
                                  className="btn-ghost !px-3 !py-1.5 text-xs"
                                  title="Edit"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(a._id)}
                                  className="btn-ghost !px-3 !py-1.5 text-xs text-red-600 hover:bg-red-50"
                                  title="Delete"
                                >
                                  Delete
                                </button>
                              </div>
                            </Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create modal */}
      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create activity"
      >
        <ActivityForm
          onSuccess={handleSuccess}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={Boolean(editingId)}
        onClose={() => setEditingId(null)}
        title="Edit activity"
      >
        {editingId && (
          <ActivityForm
            activityId={editingId}
            onSuccess={handleSuccess}
            onCancel={() => setEditingId(null)}
          />
        )}
      </Modal>
    </ClientOnly>
  );
}

function Th({ children, align = "left" }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500 text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({ children, align = "left", className = "" }) {
  return (
    <td className={`px-4 py-3 text-sm text-ink-700 text-${align} ${className}`}>
      {children}
    </td>
  );
}
