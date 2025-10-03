import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { IoMdArrowBack } from "react-icons/io";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const handelGetOrderById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-By-Id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelGetOrderById();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {/* Back Button */}
      <div className="absolute top-3 left-6">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 cursor-pointer"
        >
          <IoMdArrowBack
            size={24}
            className="text-[#ff4d2d] group-hover:text-[#e64323] transition-colors duration-300"
          />
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-800">
        Track Your Order
      </h1>
      {currentOrder?.shopOrders?.map((shopOrder, index) => (
        <div
          className="bg-white p-4 rounded-xl shadow-md border border-orange-200"
          key={index}
        >
          <div>
            <p className="text-lg font-bold mb-2 text-[#ff4d2d]">
              Shop Name:-{currentOrder?.shopOrders[0]?.shop.name}
            </p>
            <p className="font-semibold">
              <span>Items:- </span>
              {currentOrder?.shopOrders[0]?.shopOrderItems
                ?.map((i) => i.name)
                .join(",")}
            </p>
            <p className="font-semibold">
              <span>Subtotal: </span>₹{shopOrder?.subTotal}
            </p>
            <p className="font-semibold">
              <span>Delivery Address:📍 </span>
              {currentOrder.deliveryAddress.text}
            </p>
          </div>
          {shopOrder.status != "delivered" ? (
            <>
              {shopOrder.assignedDeliveryBoy ? (
                <div className="mt-4">
                  <p className="font-semibold">
                    Delivery Boy Name:🛵{" "}
                    {shopOrder.assignedDeliveryBoy.fullName}
                  </p>
                  <p className="font-semibold">
                    Delivery Boy Mobile No:📲{" "}
                    {shopOrder.assignedDeliveryBoy.mobile}
                  </p>
                </div>
              ) : (
                <p className="text-red-600 font-semibold text-lg">
                  Delivery Boy Not Assigned Yet
                </p>
              )}
            </>
          ) : (
            <p className="text-green-600 font-semibold text-lg">Delivered</p>
          )}

          {shopOrder.assignedDeliveryBoy && (
           <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md mt-4">
             <DeliveryBoyTracking
              data={{
                deliveryBoyLocation: {
                  lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                  lon: shopOrder.assignedDeliveryBoy.location.coordinates[0],
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                },
              }}
            />
           </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default TrackOrderPage;
