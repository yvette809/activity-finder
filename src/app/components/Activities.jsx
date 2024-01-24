import ActivityCard from "./ActivityCard";

const Activities = ({ data }) => {
  console.log("data", data);
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
