
import ActivityModel from '@/models/ActivityModel';
import connectToDB from '@/utils/connectDB';

export async function GET(request){
 
  try {
    await connectToDB();

    // Extract search parameters directly from req.query
    const { location, type, date } = req.query;

    // Build the filter object dynamically based on the provided query parameters
    const filter = {};

    if (location) {
      filter.location = location;
    }

    if (type) {
      filter.type = type;
    }

    if (date) {
      // Assuming date is in a specific format, adjust accordingly
      filter.date = new Date(date);
    }

    // Find activities based on the dynamic filter
    const activities = await ActivityModel.find(filter);

    return Response.json(activities)
  } catch (error) {
    console.error('Error searching activities:', error);
    console.log(error);
    return new Response("An error occurred while processing the request.", {
      status: 500,
    })
  }
}
