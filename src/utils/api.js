const base_url = "http://localhost:3000";

// get all activities
export async function getActivities() {
  const apiUrl = `${base_url}/api/activities`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 60 } });

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

export const getFilteredActivities = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    console.log(`${base_url}/api/activities/search?${queryParams}`);

    /*    const response = await fetch(`${base_url}/api/activities?${queryParams}`); */
    const response = await fetch(
      `${base_url}/api/activities/search?${queryParams}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered activities:", error);
    throw error;
  }
};

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
export async function getUserReservations(userId) {
  const apiUrl = `${base_url}/api/reservations/${userId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch reservation");
    }

    const reservation = await response.json();
    console.log("reserve", reserve);
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
    }

    const reservation = await response.json();
    console.log("Response data:", reservation);
    return reservation;
  } catch (error) {
    console.error("Error fetching reservation:", error.message);
    throw error;
  }
}

// register user
export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${base_url}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
