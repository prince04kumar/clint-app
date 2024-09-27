import { createContext, useEffect, useState } from "react";
import getAlldishes from "../utils/get_dishes";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import { ToastContainer } from "react-toastify";
import showToastMessage from "../utils/toast_message";
import employeeLogin from "../utils/employee_login";
import { Link, useNavigate } from "react-router-dom";
import Bill from "../components/Bill";
import Select from 'react-select';

export const orderContext = createContext();

export default function Home() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [bill, setBill] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', number: '', table: '' });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [orderItem, setOrderItem] = useState({
    orderID: '',
    itemID: '',
    itemName: '',
    price: '',
    quantity: 1,
    plate: ''
  });
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [KOT, setKOT] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getUser();

    const fetchDishes = async () => {
      try {
        const data = await getAlldishes();
        setDishes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    const existingkot = localStorage.getItem('kot') || '[]';
    const parsedKot = JSON.parse(existingkot);
    setKOT(parsedKot);

    checkForUser();
  }, []);

  const getUser = async () => {
    const data = localStorage.getItem('user');
    if (data != null) {
      if (data.name != '') {
        setUserInfo(JSON.parse(data));
      } else {
        setShowInfoModal(true);
      }
    } else {
      setShowInfoModal(true);
    }

  }

  const validateUserInfo = () => {
    const errors = {};
    if (!userInfo.name) errors.name = 'Name is required';
    if (!userInfo.number) errors.number = 'Phone number is required';
    if (!userInfo.table) errors.table = 'Table number is required';
    if (userInfo.number && !/^\+?\d{10,15}$/.test(userInfo.number)) errors.number = 'Invalid phone number format';
    return errors;
  };

  const onInfoSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateUserInfo();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setShowInfoModal(false);
      localStorage.setItem('user', JSON.stringify(userInfo));
    }
  };

  const onOrderSubmit = (e) => {
    e.preventDefault();
    const selectedDish = dishes.find(dish => dish.dishId === orderItem.itemID);

    if (!selectedDish) {
      console.error('Selected dish not found');
      return;
    }
    const newOrder = {
      ...orderItem,
      orderID: Date.now() + Math.random().toString(36).substring(2, 9),
      itemName: selectedDish.name,
      price: orderItem.plate === 'half' ? selectedDish.restaurant_half_price : selectedDish.restaurant_full_price
    };
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setOrderItem({
      orderID: '',
      itemID: '',
      itemName: '',
      price: '',
      quantity: 1,
      plate: ''
    });
  };


  const checkForUser = async () => {
    try {
      let cred = localStorage.getItem('credentials');
      if (cred) {
        const resp = await employeeLogin(JSON.parse(cred));
        if (resp === false) {
          navigate('/login');
          localStorage.removeItem('credentials');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      showToastMessage('error', 'Something went wrong');
    }

  }

  const getBill = async (orderId) => {
    const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/get/${orderId}`);
    const data = await resp.json();
    console.log(data.items_desc[0].prize);
    setBill(data);
  }
  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <ToastContainer className='w-4/5 mx-auto mt-16' />
      <orderContext.Provider value={{ Bill: [bill, setBill], Visible: [showSideNav, setShowSideNav], Orders: [orders, setOrders], user: [setUserInfo, userInfo, errors, onInfoSubmit], kot: [KOT, setKOT] }}>
        <Appbar />
        {showInfoModal ? (
          <UserInfo />
        ) : (
          <>
            {bill &&
              <Bill />
            }
            {KOT && KOT.length > 0 && (
              <div className="bg-gray-100 w-3/4 mx-auto p-6 mt-4">
                <p>Your Order(s) is/are arriving soon</p>
                <ul className="w-full">
                  {KOT.map((orderId, index) => (
                    <li key={index} className="flex justify-between py-1">
                      <p className="text-secondary font-bold">Order ID: #{orderId} / Table : {JSON.parse(localStorage.getItem('user'))['table']}</p>
                      <div>
                        <button className="text-blue-600" onClick={() => getBill(orderId)}>view</button> |
                        <Link to='/' className="text-blue-600"> reciept </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form className="bg-gray-100 w-3/4 mx-auto p-12 mt-4" onSubmit={onOrderSubmit}>
              <div className="mb-2">
                <label htmlFor="table">Table number</label>
                <input className="w-full block border p-2 bg-gray-50 mt-1 outline-none focus:border-secondary rounded-sm transition-all" type="text" name="table" id="table" value={userInfo.table} disabled />
              </div>
              <div className="mb-2">
                <label htmlFor="item-id">Item</label>
                <Select
                  className="block w-full outline-none p-2 mt-1 focus:border-secondary"
                  name="item-id"
                  id="item-id"
                  onChange={(e) => {
                    const selectedDish = dishes.find(dish => dish.dishId === e.value); 
                    setOrderItem((prev)=>({
                      ...prev,
                      itemID: e.value,
                      itemName: selectedDish.name,
                      price: orderItem.plate === 'half' ? selectedDish.restaurant_half_price : selectedDish.restaurant_full_price,
                    }));
                  }}
                  options={dishes.map((item) => ({
                    value: item.dishId,
                    label: `${item.name} - ₹${item.restaurant_half_price} / ${item.restaurant_full_price}`
                  }))}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="quantity">Quantity</label>
                <input
                  className="w-full block border p-2 mt-1 outline-none focus:border-secondary rounded-sm transition-all"
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={(e) => setOrderItem((prev) => ({ ...prev, quantity: e.target.value }))}
                  value={orderItem.quantity}
                  min="1"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="plate">Plate</label>
                <select className="block w-full outline-none p-2 mt-1 focus:border-secondary" name="plate" id="plate" value={orderItem.plate} onChange={(e) => setOrderItem((prev) => ({ ...prev, plate: e.target.value }))}>
                  <option value="" disabled>Select an item</option>
                  <option value="half">Half Plate</option>
                  <option value="full">Full Plate</option>
                </select>
              </div>
              <div className="mb-2">
                <button className="p-2 bg-blue-500 hover:bg-blue-700 w-full text-white" type="submit">Add</button>
              </div>
            </form>
          </>
        )}
        <Sidebar />
      </orderContext.Provider>
    </main>
  );
}
