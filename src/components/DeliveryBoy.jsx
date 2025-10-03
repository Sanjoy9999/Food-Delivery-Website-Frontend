import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from "./DeliveryBoyTracking";

function DeliveryBoy() {
  const { userData } = useSelector((state) => state.user);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState([]);

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      setAvailableAssignments(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };


  const handleSendOtp = ()=>{
    setShowOtpBox(true);
  }

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
  }, [userData]);

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff0e8] overflow-y-auto">
        <Nav />
        <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between items-center w-[90%] border border-orange-100 text-center gap-2">
            <h1 className="text-xl font-bold text-[#ff4d2d]">
              Welcome {userData.fullName}
            </h1>
            <p className="text-[#ff4d2d]">
              <span className="font-semibold">Latitude:-</span>
              {userData.location.coordinates[1]},
              <span className="font-semibold">Longitude:-</span>
              {userData.location.coordinates[0]}
            </p>
          </div>

          {!currentOrder && (
            <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-200">
              <h1 className="text-lg font-bold mb-4 flex items-center gap-2 text-center justify-center">
                Available Orders
              </h1>
              <div className="space-y-4">
                {availableAssignments.length === 0 ? (
                  <p className="text-center text-xl text-gray-800">
                    No available orders at this moment.
                  </p>
                ) : (
                  availableAssignments.map((a, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex flex-col justify-between items-start gap-1"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          Shop Name:- {a?.shopName}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">
                            Delivery Address:-
                          </span>{" "}
                          {a?.deliveryAddress.text}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {a.items.length}{" "}
                          {a.items.length === 1 ? `item` : `items`} | Price:- ₹
                          {a.subTotal}
                        </p>
                      </div>
                      <button
                        className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 cursor-pointer"
                        onClick={() => acceptOrder(a.assignmentId)}
                      >
                        Accept
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {currentOrder && (
            <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-200">
              <h2 className="text-lg font-bold mb-3 text-center">
                📦Current Order
              </h2>
              <div className="border rounded-lg p-4 flex flex-col justify-between items-start gap-2">
                <p>Shop Name:- {currentOrder?.shop.name}</p>
                <p>Shop Address:-{currentOrder?.shop.address}</p>
                <p>Delivery Address:-{currentOrder.deliveryAddress.text}</p>
                <p>
                  {currentOrder.shopOrder.shopOrderItems.length}{" "}
                  {currentOrder.shopOrder.shopOrderItems.length === 1
                    ? `item`
                    : `items`}{" "}
                  | Price:- ₹{currentOrder.shopOrder.subTotal}
                </p>
                <p>Payment Method: {currentOrder.paymentMethod}</p>
              </div>
              <DeliveryBoyTracking data={currentOrder} />
              {showOtpBox ? (
                <div className="w-full flex flex-col gap-3 mt-3 border border-orange-200 rounded-xl p-3">
                  <p className="text-sm font-semibold mb-2"> Enter OTP send to <span className="text-orange-500">{currentOrder.user.fullName}</span></p>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button className=" w-full bg-green-500 text-white px-4 py-2 rounded-xl shadow-md font-semibold hover:bg-green-600 cursor-pointer mt-3 active:scale-95 transition-all duration-200">
                   Submit OTP
                  </button>
                </div>
              ) : (
                <button className=" w-full bg-green-500 text-white px-4 py-2 rounded-xl shadow-md font-semibold hover:bg-green-600 cursor-pointer mt-3 active:scale-95 transition-all duration-200"
                onClick={handleSendOtp}
                >
                  Mark As Delivered
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DeliveryBoy;
