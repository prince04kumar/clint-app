import { useContext } from "react";
import { orderContext } from "../pages/Home";

export default function Bill() {
  const { Bill } = useContext(orderContext);
  const [bill, setBill] = Bill;

  return (
    <div className="absolute bg-white w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-black w-full h-full absolute opacity-75" />
      <div className="absolute z-10 p-6 bg-white w-3/4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Bill Summary</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order #{bill.orderId}</h2>
          <p className="text-sm">Date: {new Date(bill.date).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Customer Details:</h3>
          <p>Name: {bill.name}</p>
          <p>Phone Number: {bill.phone_number}</p>
          <p>Table Number: {bill.table_number}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Order Details:</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Item Name</th>
                <th className="border-b py-2">Plate</th>
                <th className="border-b py-2">Quantity</th>
                <th className="border-b py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {bill.items_desc.map((item, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{item.item_name}</td>
                  <td className="border-b py-2">{item.item_plate}</td>
                  <td className="border-b py-2">{item.item_quantity}</td>
                  <td className="border-b py-2">{item.prize.restaurant_full_price ?? item.prize.restaurant_half_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xl font-bold">
          Total Bill: ₹{bill.total_bill}
        </div>
        <div className="mt-4">
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={() => setBill(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
