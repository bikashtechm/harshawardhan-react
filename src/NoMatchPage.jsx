import React, { useEffect } from "react";

let NoMatchPage = () => {
  useEffect(() => {
    document.title = "404 -eCommerce";
  }, []);
  return <h1 className="text-danger">Page Not Found</h1>;
};

export default NoMatchPage;
