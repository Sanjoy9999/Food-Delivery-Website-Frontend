import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems,totalAmount } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen  flex justify-center p-6">
      <div className="w-full max-w-[800px] ">
        <div className="flex items-center gap-[20px] mb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 cursor-pointer"
          >
            <IoMdArrowBack
              size={24}
              className="text-[#ff4d2d] group-hover:text-[#e64323] transition-colors duration-300"
            />
          </button>
          <h1 className="text-2xl font-bold text-start">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-2xl text-gray-800">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems?.map((item, index) => (
                <CartItemCard key={index} data={item} />
              ))}
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl shadow border flex justify-between border-gray-400">
              <h2 className="text-xl font-bold mb-4">Total Amount</h2>
              <span className="text-2xl font-bold text-red-500">₹{totalAmount}</span>
            </div>
            <div className="mt-6 flex justify-end"
            onClick={()=>navigate("/checkout")}
            >
              <button className="bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#d1533a] transition cursor-pointer">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
