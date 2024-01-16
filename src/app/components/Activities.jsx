import ActivityCard from "./ActivityCard";

const Activities = async ({ data }) => {
  return (
    <div>
      {data &&
        data.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
    </div>
  );
};

export default Activities;
