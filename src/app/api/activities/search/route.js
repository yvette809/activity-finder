import ActivityModel from "@/models/ActivityModel";
import connectToDB from "@/utils/connectDB";

export async function GET(request) {
  try {
    await connectToDB();

    /*  const { searchParams } = new URL(request.url); */

    const { searchParams } = new URL(`http://dummy${request.url}`);
   

    const filteredActivities = {};

    searchParams.forEach((value, key) => {
      if (key && value && value.trim() !== "") {
        filteredActivities[key] = value;
      }
    });

    const activities = await ActivityModel.find();

    // Filter activities based on the criteria
    const fetchedActivities = activities.filter((activity) => {
      return Object.entries(filteredActivities).every(([key, value]) => {
        return (
          String(activity[key]).toLowerCase() === String(value).toLowerCase()
        );
      });
    });

    return Response.json(fetchedActivities);
  } catch (error) {
    console.error("Error searching activities:", error);
    return new Response("An error occurred while processing the request.", {
      status: 500,
    });
  }
}
