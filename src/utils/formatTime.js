
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