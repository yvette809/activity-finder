"use client";

import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <BeatLoader size={100} color="#36d7b7" />
    </div>
  );
};

export default Loader;
