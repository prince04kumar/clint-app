import { useContext, useEffect, useState } from "react";
import { orderContext } from "../pages/Home";
import { FaXmark } from "react-icons/fa6";
import OrderListItem from "./OrderListItem";
import 'react-toastify/dist/ReactToastify.css';
import showToastMessage from "../utils/toast_message";
import placeOrder from "../utils/place_order";

export default function Sidebar() {
  const { Visible, Orders, user , kot } = useContext(orderContext);
  const [showSideNav, setShowSideNav] = Visible;
  const [setUserInfo, userInfo, errors, onInfoSubmit] = user;
  const [orders, setOrders] = Orders;
  const [KOT,setKOT] = kot;
  const [totalPrice, setTotalPrice] = useState(0);


  // Function to delete an order
  const deleteOrder = (dishId) => {
    const updatedOrders = orders.filter(order => order.orderID !== dishId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Function to update order quantity
  const updateQuantity = (dishId, newQuantity) => {
    const updatedOrders = orders.map(order =>
      order.orderID === dishId ? { ...order, quantity: newQuantity } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  useEffect(() => {
    const price = getTotalPrice();
    setTotalPrice(price);
  }, [orders]);

  const getTotalPrice = () => {
    const ord = JSON.parse(localStorage.getItem('orders'));
    let t = ord?.reduce((total, order) => {
      const price = order.price;
      return total + (order.quantity * price);
    }, 0);
    return t;
  };

  const onPlaceOrder = async() => {
    try {
      const data = {
        "name": userInfo?.name,
        "phone_number": userInfo?.number,
        "restaurant": "swiggy",
        "table_number": userInfo?.table,
        "status":"pending",
        "items_desc": orders.map((order) => ({
          "item_id": order.itemID,
          "item_name": order.itemName,
          "item_quantity": order.quantity,
          "item_plate": order.plate
        })),
      };
      const res = await placeOrder(data);
      if (res){
        console.log(res);
        const existingkot = localStorage.getItem('kot') || '[]';
        const parsedKot = JSON.parse(existingkot);
        parsedKot.push(res);
        localStorage.setItem('kot',JSON.stringify(parsedKot));
        setKOT(parsedKot);
        showToastMessage('success','Order has been placed #' + res);
        clearOrders();
      }
    } catch (error) {
      showToastMessage('error', 'Failed to place order');
      console.log(error);
    }
  }
  const clearOrders = ()=>{
    setOrders([]);
    localStorage.removeItem('orders');
  }
  return (

    <section className={`absolute right-0 top-0 z-50 border-r bg-white w-full h-full ${showSideNav ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex bg-blue-600 text-white justify-between items-center px-6 py-4">
        <h1 className="text-3xl">Orders</h1>
        <FaXmark className="text-xl cursor-pointer hover:text-2xl transition-all ease-in-out" onClick={() => setShowSideNav(false)} />
      </div>
      {orders.length > 0 ? (
        <ul className="text-md px-6">
          {orders.map((order, idx) => (
            <OrderListItem key={idx} order={order} deleteOrder={deleteOrder} updateQuantity={updateQuantity} />
          ))}
          <div className="border-t grid grid-cols-2 px-6 text-secondary">
            <h1 className="text-xl font-bold">Total </h1>
            <h1 className="text-xl font-bold text-end">₹{totalPrice} </h1>
          </div>
          <button className="mt-4 w-full text-white bg-blue-500 p-2 hover:bg-blue-700" onClick={onPlaceOrder}>Place Order</button>
        </ul>
      ) : (
        <p className="p-12">No orders found</p>
      )}
    </section>
  );
}