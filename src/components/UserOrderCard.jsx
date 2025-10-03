import React from "react";
import { useNavigate } from "react-router-dom";

const UserOrderCard = ({ data }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4 border border-gray-400">
      <div className="flex justify-between border-b pb-2">
        <div>
          <p className="font-semibold text-lg">
            Order Id:- #{data._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-600">
            Date:- {formatDate(data.createdAt)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg text-gray-600">
            {data.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Online Payment"}
          </p>
          <p className="font-medium text-blue-600">
            {data.shopOrders?.[0].status}
          </p>
        </div>
      </div>

      {data.shopOrders?.map((shopOrder, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-3 bg-[#f8e2d5] space-y-3"
        >
          <p className="text-xl">
            From <span className="text-blue-600">{shopOrder.shop.name}</span>{" "}
            shop
          </p>

          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopOrder.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-2 border border-gray-500 bg-white flex flex-col"
              >
                <img
                  src={item.item.image}
                  alt=""
                  className="w-full h-30 object-cover rounded"
                />
                <div className="mt-2">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-xs text-gray-500">
                    Total Price: ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>



          <div className="flex justify-between items-center border-t pt-2">
            <p className="font-semibold">Subtotal: {shopOrder.subTotal}</p>
            <span className="text-sm font-medium text-blue-600">
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-2">
        <p className="font-semibold">Total: ₹{data.totalAmount}</p>
        <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm font-semibold"
        onClick={()=>navigate(`/track-order/${data._id}`)}
        >
          Live Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrderCard;
