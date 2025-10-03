import React from "react";
import { CiTrash } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-400">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt=""
          className="w-30 h-30 object-cover rounded-lg border border-red-300"
        />
        <div>
          <h1 className="font-medium text-gray-800">{data.name}</h1>
          <p className="text-sm text-gray-500">
            ₹{data.price} X {data.quantity}
          </p>
          <p className="font-bold text-gray-900">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus size={12} />
        </button>
        <span>{data.quantity}</span>
        <button
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus size={12} />
        </button>
        <button className="p-2 bg-red-200 text-red-500 rounded-full hover:bg-red-300 cursor-pointer"
        onClick={() => dispatch(removeCartItem(data.id))}
        >
          <CiTrash size={12} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
