const base_url = "http://localhost:3000";

// get all activities
export async function getActivities() {
  const apiUrl = `${base_url}/api/activities`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
      toast.error("failed to fetch activities");
    }

    const activities = await response.json();
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    throw error;
  }
}

// getactivity
export async function getActivity(id) {
  const apiUrl = `${base_url}/api/activities/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch activity");
    }

    const activity = await response.json();
    return activity;
  } catch (error) {
    console.error("Error fetching activity:", error.message);
    throw error;
  }
}

// getUserReservation
export async function getUserReservation(userId) {
  const apiUrl = `${base_url}/api/reservations/${userId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch reservation");
    }

    const reservation = await response.json();
    return reservation;
  } catch (error) {
    console.error("Error fetching activity:", error.message);
    throw error;
  }
}

//get all reservations

// get all reservations
export async function getReservationById(id) {
  const apiUrl = `${base_url}/api/reservations/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch reservation");
      toast.error("failed to fetch reservation");
    }

    const reservation = await response.json();
    return reservation;
  } catch (error) {
    console.error("Error fetching reservation:", error.message);
    throw error;
  }
}
