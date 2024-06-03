import React from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const {cart}=useSelector(store=>store);
  console.log("cart ",cart)

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [jwt]);
  
  return (
    <div className="">
      {cart.cartItems.length>0 && <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="lg:col-span-2 lg:px-5 bg-white">
        <div className=" space-y-3">
          {cart.cartItems.map((item) => (
            <>
              <CartItem item={item} showButton={true}/>
            </>
          ))}
        </div>
      </div>
      <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
        <div className="border p-5 bg-white shadow-lg rounded-md">
          <p className="font-bold opacity-60 pb-5">Chi Tiết Đơn Hàng</p>
          <hr />

          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3 text-black ">
              <span>Giá ({cart.cart?.totalItem} item)</span>
              <span>{cart.cart.totalPrice}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm Giá</span>
              <span className="text-green-700">-{cart.cart?.discounte}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí Vận Chuyển</span>
              <span className="text-green-700">Miễn Phí</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng Cộng</span>
              <span className="text-green-700">{cart.cart?.totalDiscountedPrice}đ</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/checkout?step=2")}
            variant="contained"
            type="submit"
            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
          >
            Tiếp Theo
          </Button>
        </div>
      </div>
      </div>}
      
    </div>
  );
};

export default Cart;
