import React from "react";

const Alert = ({ children, className }) => {
  return (
    <div className={`p-4 border-l-4 rounded-md ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => (
  <p className="text-gray-700">{children}</p>
);

export { Alert, AlertDescription };
