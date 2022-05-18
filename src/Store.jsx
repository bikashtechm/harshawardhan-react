import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { BrandService } from "./Service";

function Store(props) {
  let [brands, setBrands] = useState([]);
  let userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      //get brands from db
      let brandResponse = await BrandService.getBrands();
      let brandResponseBody = await brandResponse.json();
      brandResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandResponseBody);
      console.log(brandResponseBody);

      //get categories
    })();
  }, []);

  return <div>Store</div>;
}

export default Store;
