import React from "react";

const ScrollArea = ({ children, height = "300px" }) => {
  return (
    <div
      className="overflow-y-auto border rounded-lg p-2"
      style={{ maxHeight: height }}
    >
      {children}
    </div>
  );
};

export {ScrollArea};
