import ActivityModel from "@/models/ActivityModel";
import connectToDB from "@/utils/connectDB";

export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);

    // Create an empty filter object
    const filteredActivities = {};

    searchParams.forEach((value, key) => {
      if (key && value && value.trim() !== "") {
        filteredActivities[key] = value;
      }
    });

    // Find activities based on the dynamic filter
    const activities = await ActivityModel.find();

    // Filter activities based on the criteria
    const fetchedActivities = activities.filter((activity) => {
      return Object.entries(filteredActivities).every(([key, value]) => {
        console.log("activityKey", activity[key]);
        console.log("value", value);
        return (
          String(activity[key]).toLowerCase() === String(value).toLowerCase()
        );
        /* return activity[key] === value; */
      });
    });

    console.log("filter", filteredActivities);
    console.log("fetcchedactivities", fetchedActivities);

    return Response.json(fetchedActivities);
  } catch (error) {
    console.error("Error searching activities:", error);
    return new Response("An error occurred while processing the request.", {
      status: 500,
    });
  }
}
