import React, { useEffect, useState } from 'react'
import { FaBars, FaBookmark, FaDatabase, FaDollarSign, FaMoneyBill, FaReceipt, FaUtensils, FaWindowClose } from 'react-icons/fa';
import { FaMoneyBill1, FaPeopleGroup, FaPlateWheat } from 'react-icons/fa6';
import { MdAdd, MdDashboard, MdEmojiPeople, MdLogout } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import admin_logined from '../utils/admin_logined';
import { ToastContainer } from 'react-toastify';

export default function AdminNev() {
    admin_logined()
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();

    // useEffect(()=>{
    //     admin_logined();
    // }, []);
    return (
        <>
            <ToastContainer className='w-1/5 mx-auto' />
            <aside className="relative bg-sidebar h-screen w-64 sm:block shadow-xl hidden">
                <div className="p-6">
                    <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin </Link>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    <Link to="/admin" className={location.pathname == '/admin' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdDashboard /> &nbsp; Dashboard
                    </Link>
                    <Link to="/admin/kot" className={location.pathname == '/admin/kot' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaUtensils /> &nbsp; KOT

                    </Link>
                    <Link to="/admin/receipt" className={location.pathname == '/admin/receipt' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaReceipt /> &nbsp; Receipt

                    </Link>
                    <Link to="/admin/manage-items" className={location.pathname == '/admin/manage-items' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdAdd /> &nbsp; Item manager
                    </Link>
                    
                    
                    <Link to="/admin/manage-employe" className={location.pathname == '/admin/manage-employe' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaPeopleGroup /> &nbsp; Employee Details
                    </Link>
                    <Link to="/admin/employe-data" className={location.pathname == '/admin/employe-data' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaDatabase /> &nbsp; Employee Data
                    </Link>
                    <Link to="/admin/sales" className={location.pathname == '/admin/sales' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaDollarSign /> &nbsp; Sales History
                    </Link>
                    <Link to="/admin/purchase" className={location.pathname == '/admin/purchase' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaMoneyBill1 /> &nbsp; Purchase
                    </Link>
                    <Link to="/admin/remarks" className={location.pathname == '/admin/remarks' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaBookmark /> &nbsp; Remarks
                    </Link>
                    <div className="p-6">
                        <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center" onClick={() => { localStorage.clear(); navigate('/admin/login') }}>
                            <MdLogout /> &nbsp; Logout
                        </button>
                    </div>
                </nav>

            </aside>


            <header className="w-full bg-sidebar py-5 px-6 sm:hidden block sticky top-0">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</Link>
                    <button className="text-white text-3xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        {/* @click="isOpen = !isOpen" */}
                        {!isOpen && <FaBars />}
                        {isOpen && <FaWindowClose />}
                    </button>
                </div>

                <nav className={`flex flex-col pt-4 ${isOpen ? 'flex' : 'hidden'}`}>
                    {/* :className="isOpen ? 'flex': 'hidden'" */}
                    <Link to="/admin" className={location.pathname == '/admin' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdDashboard /> &nbsp; Dashboard
                    </Link>
                    <Link to="/admin/kot" className={location.pathname == '/admin/kot' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaUtensils /> &nbsp; KOT
                    </Link>
                    <Link to="/admin/receipt" className={location.pathname == '/admin/receipt' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaReceipt /> &nbsp; Receipt
                    </Link>
                    <Link to="/admin/manage-items" className={location.pathname == '/admin/manage-items' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdAdd /> &nbsp; Item manager
                    </Link>
                    <Link to="/admin/manage-employe" className={location.pathname == '/admin/manage-employe' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaPeopleGroup /> &nbsp; Employee Details
                    </Link>
                    <Link to="/admin/employe-data" className={location.pathname == '/admin/employe-data' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaDatabase /> &nbsp; Employee Data
                    </Link>
                    <Link to="/admin/sales" className={location.pathname == '/admin/sales' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaDollarSign /> &nbsp; Sales History
                    </Link>
                    <Link to="/admin/remarks" className={location.pathname == '/admin/remarks' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaBookmark /> &nbsp; Remarks
                    </Link>
                    <Link to="/admin/purchase" className={location.pathname == '/admin/purchase' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaMoneyBill1 /> &nbsp; Purchase
                    </Link>
                    <div className="p-6">
                        <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center" onClick={() => { localStorage.clear(); navigate('/admin/login') }}>
                            <MdLogout /> &nbsp; Logout
                        </button>
                    </div>
                </nav>

            </header>
        </>
    )
}
