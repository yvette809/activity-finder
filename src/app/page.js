"use client";

import React, { useEffect, useState } from "react";
import Activities from "./components/Activities";
import { getActivities, getFilteredActivities } from "@/utils/api";
import ClientOnly from "./components/ClientOnly";
import Hero from "./components/Hero";
import SearchForm from "./components/SearchForm";

// Define your page component
const Page = () => {
  // Define state for activities and search results
  const [activities, setActivities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
      console.log("Filtered Data:", filteredData); // Add this line
      setSearchResults(filteredData);
    } catch (error) {
      console.error("Error fetching filtered activities:", error);
    }
  };

  // Return the component structure
  return (
    <ClientOnly>
      <Hero />
      <SearchForm onSearch={handleSearch} activities={activities} />
      {/* Display search results if available, otherwise display all activities */}
      <Activities
        data={searchResults.length > 0 ? searchResults : activities}
      />
    </ClientOnly>
  );
};

export default Page;
