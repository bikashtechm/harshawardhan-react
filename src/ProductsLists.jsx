import React, { useState } from "react";

function ProductsLists(props) {
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i>
              &nbsp; Products
            </h4>
          </div>
          <div className="col-lg-9">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              autoFocus="autoFocus"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-10 mx-auto mb-2"> Grid here</div>
    </div>
  );
}

export default ProductsLists;
