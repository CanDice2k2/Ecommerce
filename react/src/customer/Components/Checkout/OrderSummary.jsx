import React from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector(state => state)

  // console.log("orderId ", order.order)

  useEffect(() => {

    dispatch(getOrderById({orderId, jwt}))
  }, [orderId])

  const handleCreatePayment = () => {
    const data = { orderId: order.order?.id, jwt }
    dispatch(createPayment(data))
  }

  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-md border ">
        <AddressCard address={order.order?.shippingAddress} />
      </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {order.order?.orderItems.map((item) => (
              <>
                <CartItem item={item} showButton={false} />
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">Chi Tiết Đơn Hàng</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Giá ({order.order?.totalItem} item)</span>
                <span>{order.order?.totalPrice}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm Giá</span>
                <span className="text-green-700">-{order.order?.discounte}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí Vận Chuyển</span>
                <span className="text-green-700">Miễn Phí</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng Cộng</span>
                <span className="text-green-700">{order.order?.totalDiscountedPrice}đ</span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Đặt Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
