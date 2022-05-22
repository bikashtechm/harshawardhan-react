import React, { useState, useEffect } from "react";
import { BrandsService, CategoriesService } from "./Service";

function ProductsLists(props) {
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  let [originalProducts, setOriginalProducts] = useState([]);
  let [sortBy, setSortBy] = useState("productName");
  let [sortOrder, setSortOrder] = useState("ASC");

  useEffect(() => {
    (async () => {
      // Get all brands
      let brandsRresponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsRresponse.json();

      // Get all Categories
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      // Get all Products
      let productResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,
        { method: "GET" }
      );
      let productResponseBody = await productResponse.json();

      productResponseBody.forEach((prodItem) => {
        prodItem.category = CategoriesService.getCategoryByCategoryId(
          categoriesResponseBody,
          prodItem.categoryId
        );
      });

      productResponseBody.forEach((prodItem) => {
        prodItem.brand = BrandsService.getBrandByBrandId(
          brandsResponseBody,
          prodItem.brandId
        );
      });

      setProducts(productResponseBody);
      setOriginalProducts(productResponseBody);
    })();
  }, [search]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i>
              &nbsp; Products &nbsp;
              <span className="badge badge-secondary">{products.length}</span>
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
      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Rating</th>
              </thead>
              <tbody>
                {products.map((prod) => {
                  return (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.productName}</td>
                      <td>{prod.price}</td>
                      <td>{prod.brand.brandName}</td>
                      <td>{prod.category.categoryName}</td>
                      <td>
                        {[...Array(prod.rating).keys()].map((n) => {
                          return (
                            <i className="fa fa-star text-warning" key={n}></i>
                          );
                        })}
                        {[...Array(5 - prod.rating).keys()].map((n) => {
                          return <i className="fa fa-star-o text-" key={n}></i>;
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsLists;
