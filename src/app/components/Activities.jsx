import ActivityCard from "./ActivityCard";

const Activities = ({ data }) => {
  console.log("data", data);
  return (
    <>
      <div className="text-center font-medium text-xl mb-7">
        <h1>Activities</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8 ">
      {data &&
        data.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
        </div>
    </>
  );
};

export default Activities;
