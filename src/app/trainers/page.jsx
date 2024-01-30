"use client";

import { useEffect, useState } from "react";
import { getTrainers } from "@/utils/api";
import TrainerCard from "../components/TrainerCard";

const page = () => {
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      const fetchedTrainers = await getTrainers();
      setTrainers(fetchedTrainers);
    };

    fetchTrainers();
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center mt-10">Trainers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8 ">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer._id} trainer={trainer} />
      ))}
      </div>
    </div>
  );
};

export default page;
