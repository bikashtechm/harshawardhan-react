import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { BrandService, CategoryService, ProductsService } from "./Service";

function Store(props) {
  let [brands, setBrands] = useState([]);
  let [category, setCategory] = useState([]);
  let [products, setProducts] = useState([]);
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

      //get categories
      let categoryResponse = await CategoryService.getCategory();
      let categoryResponseBody = await categoryResponse.json();
      categoryResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategory(categoryResponseBody);

      // Get All Products
      let productResponse = await ProductsService.getProducts();
      let productResponseBody = await productResponse.json();
      if (productResponse.ok) {
        productResponseBody.forEach((product) => {
          product.isOrdered = false;

          let brandDataById = BrandService.getBrandByBrandId(
            brands,
            product.brandId
          );
          product.brandData = brandDataById;
        });
      }
      setProducts(productResponseBody);
    })();
  }, []);

  // Update Brand isChecked on click
  let updateBrandChecked = (id) => {
    let brandData = brands.map((brd) => {
      if (brd.id === id) brd.isChecked = !brd.isChecked;
      return brd;
    });

    setBrands(brandData);
  };

  // Update Category isChecked on click
  let updateCategoryChecked = (id) => {
    let categoryData = category.map((cat) => {
      if (cat.id === id) cat.isChecked = !cat.isChecked;
      return cat;
    });
    setCategory(categoryData);
  };

  return (
    <div>
      <div className="row py-2 header">
        <div className="col-lg-3">
          <h5>
            <i className="fa fa-shopping-bag"></i> Store
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-1">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => {
                return (
                  <li className="list-group-item" key={brand.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value="true"
                        id={`brand${brand.id}`}
                        checked={brand.isChecked}
                        onChange={() => {
                          updateBrandChecked(brand.id);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`brand${brand.id}`}
                      >
                        {brand.brandName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="my-1">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {category.map((cat) => {
                return (
                  <li className="list-group-item" key={cat.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value="true"
                        id={`brand${cat.id}`}
                        checked={cat.isChecked}
                        onChange={() => {
                          updateCategoryChecked(cat.id);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`brand${cat.id}`}
                      >
                        {cat.categoryName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div>{JSON.stringify(brands)}</div>
          <div>{JSON.stringify(category)}</div>
          <div>{JSON.stringify(products)}</div>
        </div>
      </div>
    </div>
  );
}

export default Store;
