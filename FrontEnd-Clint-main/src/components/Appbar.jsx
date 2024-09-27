import { useContext, useState } from "react";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { orderContext } from "../pages/Home";
import { FaPowerOff } from "react-icons/fa";
import DialogBox from "./DialogBox";
import { Link } from "react-router-dom";

export default function Appbar() {
    const { Visible, Orders } = useContext(orderContext);
    const [showSideNav, setShowSideNav] = Visible;
    const [orders, setOrders] = Orders;
    const [showDialog, setShowDialog] = useState(false);
    const onLogout = () => {
        localStorage.clear();
        window.history.back();
    }
    return (
        <div className="bg-blue-600 text-white px-6 md:px-12 lg:px-24 py-4 border-b flex items-center gap-x-2 justify-between">
            <h1 className="text-4xl font-semibold">AFFECTIONARY</h1>
            <div className="flex items-center gap-x-4">
                <Link to='/employee'>
                    <MdDashboard className="text-4xl hover:text-black border-2 border-blue-800 p-1 hover:shadow-md cursor-pointer" />
                </Link>

                <MdRestaurantMenu className="text-4xl hover:text-black border-2 border-blue-800 p-1 hover:shadow-md cursor-pointer" onClick={() => setShowSideNav(true)} />
                <FaPowerOff className="text-4xl p-2 hover:text-red-400 border-2 border-blue-800 cursor-pointer hover:shadow-md" onClick={() => setShowDialog(true)} />
            </div>
            {orders.length > 0 && (
                <div className="absolute right-16 md:right-32 lg:right-44 top-3 bg-red-500 text-xs px-1 text-center rounded-full">{orders.length}</div>
            )}
            {showDialog && (
                <DialogBox title='Log out' content='Are you sure you want to exit ? You will lost all of your saved orders.' action='log out' type='delete' onAction={onLogout} onCancel={() => setShowDialog(false)} />
            )}
        </div>

    );
}
