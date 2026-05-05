"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import Activities from "@/components/Activities";
import ClientOnly from "@/components/ClientOnly";
import { getActivities, searchActivities } from "@/lib/api";

export default function HomePage() {
  const [activities, setActivities] = useState([]);
  const [results, setResults] = useState(null); // null = no active search
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (err) {
        console.error("Failed to load activities:", err);
        toast.error("Could not load activities. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (filters) => {
    const hasAnyFilter = Object.values(filters).some((v) => v && v.length > 0);
    if (!hasAnyFilter) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      const data = await searchActivities(filters);
      setResults(data);
      if (data.length === 0) {
        toast("No activities matched your search", { icon: "🔍" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => setResults(null);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const displayed = results !== null ? results : activities;
  const isSearching = results !== null;

  return (
    <ClientOnly>
      <Hero onSearchClick={scrollToSearch} />
      <div ref={searchRef}>
        <SearchForm
          activities={activities}
          onSearch={handleSearch}
          onClear={handleClear}
          hasActiveSearch={isSearching}
        />
      </div>
      <Activities
        data={displayed}
        loading={loading}
        title={isSearching ? "Search results" : "Featured activities"}
        subtitle={
          isSearching
            ? `${displayed.length} activit${displayed.length === 1 ? "y" : "ies"} found`
            : "Hand-picked experiences from our top trainers"
        }
      />
    </ClientOnly>
  );
}
