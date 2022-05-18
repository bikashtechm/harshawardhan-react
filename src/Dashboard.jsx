import React, { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrderService, ProductsService } from "./Service";

function Dashboard() {
  let [orders, setOrders] = useState([]);
  let [showOrderDeletedAlert, setshowOrderDeletedAlert] = useState(false);
  let [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);
  //get context
  let userContext = useContext(UserContext);

  let loadDataFromDatabase = useCallback(async () => {
    let OrderResponse = await fetch(
      `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
      { method: "GET" }
    );
    if (OrderResponse.ok) {
      let orderResponseBody = await OrderResponse.json();

      //Get All data from Products
      let productResponse = await ProductsService.getchProducts();
      if (productResponse.ok) {
        let productResponseBody = await productResponse.json();
        orderResponseBody.forEach((order) => {
          order.product = ProductsService.getProductByProductId(
            productResponseBody,
            order.productId
          );
        });

        setOrders(orderResponseBody);
      }
    }
  }, [userContext.user.currentUserId]);

  useEffect(() => {
    document.title = "Dashboard - eCommerce";
    loadDataFromDatabase();
  }, [userContext.user.currentUserId, loadDataFromDatabase]);

  //Buy Now method starts
  let onBuyNowClick = useCallback(
    async (orderId, userId, productId, quantity) => {
      if (window.confirm("Do you wish to place order for this product ?")) {
        var updateOrder = {
          id: orderId,
          productId: productId,
          userId: userId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        var orderResponse = await fetch(
          `http://localhost:5000/orders/${orderId}`,
          {
            method: "PUT",
            body: JSON.stringify(updateOrder),
            headers: { "Content-type": "application/json" },
          }
        );
        var orderResponseBody = await orderResponse.json();
        if (orderResponse.ok) {
          console.log(orderResponseBody);
          setShowOrderPlacedAlert(true);
          loadDataFromDatabase();
        }
      }
    },
    [loadDataFromDatabase]
  );
  //Buy Now method ends

  //Delete starts
  let onDeleteClick = useCallback(
    async (orderId) => {
      if (window.confirm("Are you sure to delete")) {
        let orderResponse = await fetch(
          `http://localhost:5000/orders/${orderId}`,
          { method: "DELETE" }
        );

        if (orderResponse.ok) {
          let orderResponseBody = await orderResponse.json();
          console.log(orderResponseBody);
          setshowOrderDeletedAlert(true);
          loadDataFromDatabase();
        }
      }
    },
    [loadDataFromDatabase]
  );
  //Delete Ends
  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard m-2"></i>Dashboard{" "}
          <button className="btn btn-sm btn-info">
            <i className="fa fa-refresh" onClick={loadDataFromDatabase}>
              {" "}
              Refresh
            </i>
          </button>
        </h4>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-lg-6">
            <h5 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history m-2"></i>Previous Orders{" "}
              <span className="badge badge-info">
                {OrderService.getPreviousOrders(orders).length}
              </span>
            </h5>
            {OrderService.getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              ""
            )}

            {OrderService.getPreviousOrders(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                  rating={ord.product.rating}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </div>
          <div className="col-lg-6">
            <h5 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart m-2"></i>Cart{" "}
              <span className="badge badge-primary">
                {OrderService.getCart(orders).length}
              </span>
            </h5>
            {showOrderPlacedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-success alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your order has been places successfully
                  <button className="close" type="button" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            {showOrderDeletedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-danger alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your order has been deleted successfully
                  <button className="close" type="button" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {OrderService.getCart(orders).length === 0 ? (
              <div className="text-danger">Empty Cart</div>
            ) : (
              ""
            )}

            {OrderService.getCart(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                  rating={ord.product.rating}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
