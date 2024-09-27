import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

export default function OrderListItem(props){
    const order = props.order;
    let total_price = order.price * order.quantity
    return (
        <li key={props.idx} className="py-4 px-6 border-b grid grid-cols-4 items-center justify-center">
      <div className="flex flex-col justify-center col-span-2">
        <span className="font-semibold text-lg">{order.itemName}</span>
        <span className="text-sm text-gray-500">{order.plate === 'full' ? 'Full Plate' : 'Half Plate'}</span>
        <span className="text-sm text-gray-500">Price: ₹{total_price}</span>
      </div>
      <div className="flex items-center justify-center">
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => props.updateQuantity(order.orderID, order.quantity - 1)}
          disabled={order.quantity <= 1}
        >
          <FaMinus />
        </button>
        <input 
          className="w-12 border text-center mx-2" 
          type="text" 
          name="quantity" 
          id="quantity" 
          disabled 
          value={order.quantity} 
        />
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => props.updateQuantity(order.orderID, order.quantity + 1)}
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col items-end">
        <button 
          className="text-red-500 hover:text-red-700 mt-2"
          onClick={() => props.deleteOrder(order.orderID)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
    );
}