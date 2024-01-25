
"use client";
import React, { useEffect, useState } from "react";
import Activities from "./components/Activities/Activities";
import { getActivities, getFilteredActivities } from "@/utils/api";
import ClientOnly from "./components/ClientOnly";
import Hero from "./components/Hero";
import SearchForm from "./components/SearchForm";
import toast from "react-hot-toast";

// Define your page component
const Page = () => {
  // Define state for activities and search results
  const [activities, setActivities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  // Fetch activities on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setActivities(data);
    };

    fetchData();
  }, []);

  // Define the search handler
  const handleSearch = async (filters) => {
    try {
      // Call the API function to get filtered activities based on the filters
      const filteredData = await getFilteredActivities(filters);
      setSearchResults(filteredData);
      if (filteredData.length === 0) {
        toast.error("No activities found for the selected filters");
        setSearchMessage("No activity Found");
      }
    } catch (error) {
      toast.error("Error fetching activities. Please try again.");
      setActivities([]);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchMessage("");
  };

  // Return the component structure
  return (
    <ClientOnly>
      <Hero />
      <SearchForm onSearch={handleSearch} activities={activities} />
      {searchMessage && (
        <div className="mt-4 p-4 bg-red-100 rounded-md">
          <button
            onClick={clearSearch}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear Search
          </button>
        </div>
      )}

      {!searchMessage && (
        <Activities
          data={searchResults.length > 0 ? searchResults : activities}
        />
      )}
    </ClientOnly>
  );
};

export default Page;
