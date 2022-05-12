import React, { useEffect } from "react";

let Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard -eCommerce";
  }, []);
  return (
    <div>
      <h4>Dashboard</h4>
    </div>
  );
};

export default Dashboard;
