import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#fef4ef] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">

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
         <h1 className="text-2xl font-bold text-center mb-5">My Orders</h1>

        <div className="space-y-6">
          {myOrders?.map((order, index) =>(
              userData.role == "user" ? (
              <UserOrderCard key={index} data={order}/>
            ):userData.role == "owner" ? (
              <OwnerOrderCard key={index} data={order} />
            ): null
          ))}
        </div>


      </div>
    </div>
  );
};

export default MyOrders;
