import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }) => {
  return <div className="flex border-b">{children}</div>;
};

const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={`px-4 py-2 ${
        activeTab === value ? "border-b-2 border-blue-500 font-bold" : ""
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);

  return activeTab === value ? <div className="p-4">{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
