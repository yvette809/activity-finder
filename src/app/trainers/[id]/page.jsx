"use client";

import { useState, useEffect } from "react";
import { getTrainer } from "@/utils/api";

const page = ({ params }) => {
  const [trainer, setTrainer] = useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      const fetchedTrainer = await getTrainer(params.id);
      setTrainer(fetchedTrainer);
    };
    fetchTrainer();
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-20 p-4">
      <img
        src={trainer.image}
        alt={`${trainer.firstName} ${trainer.lastName}'s pic`}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">
        {trainer.firstName} {trainer.lastName}
      </h2>
      <p className="text-gray-600 mb-2">Email: {trainer.email}</p>
      <p className="text-gray-600 mb-2">
        Specialisation: {trainer.specialisation}
      </p>
      <p className="text-gray-600 mb-2">
        Experience: {trainer.experience} years
      </p>
      <p className="text-gray-600 mb-2">Role: {trainer.role}</p>
    </div>
  );
};

export default page;
