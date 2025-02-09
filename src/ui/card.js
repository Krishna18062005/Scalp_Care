import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
);

const CardContent = ({ children }) => <div className="p-2">{children}</div>;

export { Card, CardHeader, CardTitle, CardContent };
