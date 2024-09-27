import React, { useEffect, useState } from 'react'
import { FaBars, FaCalendar, FaCalendarCheck, FaMoneyBill, FaUtensils, FaWindowClose } from 'react-icons/fa';
import { FaPeopleGroup, FaPlateWheat } from 'react-icons/fa6';
import { MdAdd, MdDashboard, MdEmojiPeople, MdLogout } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function EmployeeNev() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();
    return (
        <>
            <ToastContainer className='w-4/5 mx-auto mt-16' />
            <aside className="relative bg-sidebar h-screen w-64 sm:block shadow-xl hidden">
                <div className="p-6">
                    <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Employee </Link>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    <Link to="/employee" className={location.pathname == '/employee' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdDashboard /> &nbsp; Dashboard
                    </Link>
                    <Link to="/employee/manage-orders" className={location.pathname == '/employee/manage-orders' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaUtensils /> &nbsp; Orders
                    </Link>
                    <Link to={"/employee/attendence/" + JSON.parse(localStorage.getItem('credentials')).id} className={location.pathname == '/employee/attendence' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaCalendarCheck /> &nbsp; Attendance
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
                    <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Employee</Link>
                    <button className="text-white text-3xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        {/* @click="isOpen = !isOpen" */}
                        {!isOpen && <FaBars />}
                        {isOpen && <FaWindowClose />}
                    </button>
                </div>

                <nav className={`flex flex-col pt-4 ${isOpen ? 'flex' : 'hidden'}`}>
                    {/* :className="isOpen ? 'flex': 'hidden'" */}
                    <Link to="/employee" className={location.pathname == '/employee' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <MdDashboard /> &nbsp; Dashboard
                    </Link>
                    <Link to="/employee/manage-orders" className={location.pathname == '/employee/manage-orders' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaUtensils /> &nbsp; Orders
                    </Link>
                    <Link to={"/employee/attendence/" + JSON.parse(localStorage.getItem('credentials')).id} className={location.pathname == '/employee/attendence' ? `flex items-center active-nav-link text-white py-4 pl-6 nav-item` : `flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item`}>
                        <FaCalendarCheck /> &nbsp; Attendance
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
