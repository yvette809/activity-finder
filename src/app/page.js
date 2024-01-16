import Activities from "./components/Activities";

export async function getActivities() {
  const apiUrl = "http://localhost:3000/api/activities";

  try {
    const response = await fetch(apiUrl);
    console.log("response", response);

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }

    const activities = await response.json();
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    throw error;
  }
}

const page = async () => {
  const data = await getActivities();
  return <Activities data={data} />;
};

export default page;
