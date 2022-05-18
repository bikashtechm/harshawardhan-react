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

  getchProducts: () => {
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
};

export const CategoryService = {
  getCategory: () => {
    return fetch(`http://localhost:5000/categories`, { method: "GET" });
  },
};
