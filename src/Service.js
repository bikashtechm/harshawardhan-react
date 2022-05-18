export const OrderService = {
  getPreviousOrders: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === true);
  },

  getCart: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === false);
  },
};

export const ProductsService = {
  getProductByProductId: (products, productId) => {
    return products.find((prod) => prod.id === productId);
  },

  getProducts: () => {
    return fetch("http://localhost:5000/products", {
      method: "GET",
    });
  },
};

export const BrandService = {
  getBrands: () => {
    return fetch(`http://localhost:5000/brands`, {
      method: "GET",
    });
  },

  getBrandByBrandId: (brands, brandId) => {
    return brands.find((brand) => (brand.id = brandId));
  },
};

export const CategoryService = {
  getCategory: () => {
    return fetch(`http://localhost:5000/categories`, { method: "GET" });
  },

  getCategoryByCategoryId: (category, categoryId) => {
    return category.find((cat) => (category.id = categoryId));
  },
};
