import React from "react";
const Button = ({ onClick, loading }) => {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Scanning..." : "Start Daily Scan"}
      </button>
    );
  };
  
  export {Button};
  