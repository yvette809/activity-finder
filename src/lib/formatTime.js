
// Helper function to format duration
export const formatDuration = (startTime, endTime) => {
  const startTimestamp = new Date(startTime).getTime();
  const endTimestamp = new Date(endTime).getTime();

  // Check if the timestamps are valid
  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    return "Invalid Time";
  }

  const durationInMilliseconds = endTimestamp - startTimestamp;

  // Convert duration to hours
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  if (durationInHours < 1) {
    return `${Math.round(durationInHours * 60)} mins`;
  } else {
    return durationInHours === 1
      ? `${durationInHours} hr`
      : `${durationInHours} hrs`;
  }
};


// Function to format date and time
export const formatTime = (dateTimeString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateTimeString).toLocaleDateString(undefined, options);
  
  const timeOptions = { hour: "numeric", minute: "numeric" };
  const time = new Date(dateTimeString).toLocaleTimeString(undefined, timeOptions);

  return { date, time };
};
