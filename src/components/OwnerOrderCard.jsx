import React from "react";
import { MdPhoneInTalk } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateOrderStatus } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const OwnerOrderCard = ({ data }) => {
  const [availableBoys, setAvailableBoys] = React.useState([]);
  const dispatch = useDispatch();
  
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🔄 FRONTEND: Changing order status...");
      console.log("Order ID:", orderId);
      console.log("Shop ID:", shopId);
      console.log("New Status:", status);
      console.log("API URL:", `${serverUrl}/api/order/update-status/${orderId}/${shopId}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("✅ FRONTEND: Response received from backend");
      console.log("Full Response:", result.data);
      console.log("Available Boys:", result.data.availableBoys);
      console.log("Available Boys Length:", result.data.availableBoys?.length || 0);
      console.log("Message:", result.data.message);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys || []);
      
      console.log("✅ State updated with available boys:", result.data.availableBoys || []);
    } catch (error) {
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.error("❌ FRONTEND ERROR: Failed to update status");
      console.error("Error:", error);
      console.error("Response:", error.response?.data);
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4 border border-gray-400">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {data.user.fullName}
        </h2>
        <p className="text-sm text-gray-500">{data.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MdPhoneInTalk />
          <span>{data.user.mobile}</span>
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 text-gray-600 text-sm">
        <p className="font-semibold">📍 Delivery Address:</p>
        <p>{data?.deliveryAddress?.text || "No address provided"}</p>
        <p className="text-xs text-gray-500">
          (Lat: {data?.deliveryAddress?.latitude || "N/A"}, Lon: {data?.deliveryAddress?.longitude || "N/A"})
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data.shopOrders[0].shopOrderItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center border rounded-md p-2 bg-gray-50 md:w-[180px] lg:w-[200px] w-[160px]"
          >
            <img
              src={item.item.image}
              alt={item.item.name}
              className="w-37 h-37 object-cover rounded"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.item.name}
              </p>
              <p className="text-xs text-gray-600">
                ₹{item.item.price} x {item.quantity} = ₹
                {item.item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-700 flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              data.shopOrders[0].status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : data.shopOrders[0].status === "preparing"
                ? "bg-blue-100 text-blue-600"
                : data.shopOrders[0].status === "out of delivery"
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {data.shopOrders[0].status}
          </span>
        </span>

        <select
          onChange={(e) => {
            console.log("📝 Dropdown changed to:", e.target.value);
            handleUpdateStatus(
              data._id,
              data.shopOrders[0].shop._id,
              e.target.value
            );
          }}
          value={data.shopOrders[0].status}
          className="border border-[#ff4d2d] text-[#ff4d2d] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold"
        >
          <option value="" disabled>
            Status change
          </option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
        </select>
      </div>

      {data.shopOrders[0].status === "out of delivery" && (
        <div className="mt-3 p-2 border rounded-lg text-sm bg-orange-100">
          <p className="font-semibold mb-2">Available Delivery Boys:</p>
          <p className="text-xs text-gray-500 mb-2">
            (Total found: {availableBoys?.length || 0})
          </p>
          {availableBoys && availableBoys.length > 0 ? (
            availableBoys.map((b, index) => (
              <div className="text-gray-700 text-base py-1" key={index}>
                📱 {b.name} - {b.mobile}
              </div>
            ))
          ) : (
            <div className="text-gray-500">
              ⏳ Waiting for Delivery Boy to accept...
              <p className="text-xs mt-1">(If no boys appear, check delivery boy locations and distance)</p>
            </div>
          )}
        </div>
      )}

      <div className="text-right font-bold text-gray-800">
        Total: ₹{data.shopOrders[0].subTotal}/-
      </div>
    </div>
  );
};

export default OwnerOrderCard;
