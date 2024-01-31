import React, { useState, useEffect } from "react";

const SearchForm = ({ onSearch, activities }) => {
  const [filters, setFilters] = useState({});
  const [uniqueCreators, setUniqueCreators] = useState([]);

  useEffect(() => {
    // Extract unique creator IDs from activities
    const uniqueCreatorIds = new Set(
      activities.map((activity) => activity.creator._id)
    );

    setUniqueCreators(Array.from(uniqueCreatorIds));
  }, [activities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <>
      <div className="my-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">
                Type of activity:
              </label>
              <select
                name="typeOfActivity"
                onChange={(event) =>
                  setFilters({ ...filters, typeOfActivity: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All</option>
                {Array.from(
                  new Set(activities.map((activity) => activity.typeOfActivity))
                ).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium">Location:</label>
              <input
                type="text"
                name="location"
                onChange={(event) =>
                  setFilters({ ...filters, location: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium">Creator:</label>
              <select
                name="creator"
                onChange={(event) =>
                  setFilters({ ...filters, creator: event.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Creators</option>
                {uniqueCreators.map((creatorId) => (
                  <option key={creatorId} value={creatorId}>
                    {/* Display creator name based on the unique ID */}
                    {
                      activities.find(
                        (activity) => activity.creator._id === creatorId
                      )?.creator.firstName
                    }
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-deep-green text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
