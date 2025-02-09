import { motion } from "framer-motion";
import React from "react";
const Progress = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-lg overflow-hidden mt-4">
      <motion.div
        className="h-2 bg-blue-500"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2 }}
      ></motion.div>
    </div>
  );
};

export { Progress};
