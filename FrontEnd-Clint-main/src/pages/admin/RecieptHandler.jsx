import React, { useEffect, useRef, useState } from 'react'
import AdminNev from '../../components/AdminNev'
import { FaXmark } from 'react-icons/fa6'
import OrderStatusTooltip from '../../components/OrderStatusTooltip'
import { PieChart } from '@mui/x-charts/PieChart';
import ManageOrderItemEdit from '../../components/ManageOrderItemEdit'
import { Link } from 'react-router-dom'
import showToastMessage from '../../utils/toast_message';
import { useNavigate } from "react-router-dom";

export default function RecieptHandler() {
  const [allOrderData, setAllOrderData] = useState();
  const [orderType, setOrderType] = useState('all');
  //   const [discoutVal, setDiscountVal] = useState(0);
  const navigate = useNavigate();


  const getOrderFromStore = async (type) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/getall/completed`);

      if (!response.ok) {
        showToastMessage("error", response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log(data);
      setAllOrderData(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      showToastMessage("error", error.message);
      // alert('There was a problem retrieving the items: ' + error.message);
    }
  };

  const delOrder = async (e) => {
    const id = e.target.parentElement.parentElement.id;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/del/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        showToastMessage("error", response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(id);

      getOrderFromStore(orderType);
      showToastMessage('success', 'Order Deleted Sucessfully')
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      showToastMessage("error", error.message);
    }
  };


  useEffect(() => {
    getOrderFromStore(orderType);
  }, []);
  return (
    <>
      <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
        <AdminNev />

        <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Order Manager</h1>

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                <p className="text-xl pb-3 flex items-center">
                  <i className="fas fa-plus mr-3"></i> Order Reports
                </p>
                <div className="p-6 bg-white">
                  <span className='text-blue-700'><b>Completed Orders</b> : {allOrderData && allOrderData.filter((order) => order.status === 'completed').length}</span> <br />

                </div>
              </div>

            </div>

            <div className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Added Item
              </p>
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Order id</th>
                      <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">Items</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Name/Phone</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Discount</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Grand Total</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Date & Time</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Table Number</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Invoice / Del</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {allOrderData && allOrderData.map((order, index) => (
                      <tr key={order.orderId} id={order.orderId} className={index % 2 != 0 ? "bg-gray-200" : ""}>
                        <td className="text-left py-3 px-4">{order.orderId}</td>
                        <td className="w-2/3 text-left py-3 px-4">
                          <ManageOrderItemEdit items_desc={order.items_desc} id={order.orderId} fun={getOrderFromStore} />
                        </td>
                        <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{order.name}<br /> {order.phone_number}</td>
                        <td className="text-left py-3 px-4">{order.total_bill}</td>
                        <td className="text-left py-3 px-4"><input type="text" placeholder='0' className='bg-transparent' onChange={(e) => {
                          // console.log(e.target.parentElement.nextElementSibling)
                          if (e.target.value.charAt(e.target.value.length-1) == '%') {
                            e.target.parentElement.nextElementSibling.innerHTML = order.total_bill *(100 - e.target.value.slice(0, e.target.value.length-1))/100;
                          } else {
                            e.target.parentElement.nextElementSibling.innerHTML = order.total_bill - e.target.value;
                          }

                          // console.log(e.target.parentElement.nextElementSibling)
                        }} /></td>
                        <td className="text-left py-3 px-4">{order.total_bill}</td>
                        <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{order.date.split("T")[0]} <br /> {order.date.split("T")[1].substr(0, 5)}</td>
                        <td className="text-left py-3 px-4">{order.table_number}</td>


                        <td className="text-left py-3 px-4 ">
                          {/* <Link to={`/admin/invoice/${order.orderId}/${discoutVal}`} > */}
                          <span className='hover:text-blue-500 hover:underline cursor-pointer text-blue-400' onClick={(e) => {
                            let dis = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.childNodes[0].value || "0";
                            console.log(dis)
                            dis = dis.charAt(dis.length-1) == '%' ? order.total_bill*(100 - dis.slice(0, dis.length-1))/100 : order.total_bill - dis
                            navigate(`/admin/invoice/${order.orderId}/${dis}`);
                          }}>invoice</span>
                          {/* </Link> &nbsp; */}
                          &nbsp;&nbsp;
                          <span className='hover:text-red-500 hover:underline cursor-pointer text-red-400' onClick={delOrder}>del</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
