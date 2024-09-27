import React, { useEffect, useState } from 'react'
import './Dashbord.css'
import AdminNev from '../../../components/AdminNev';
import { PieChart } from '@mui/x-charts/PieChart';
export default function Dashbord() {
    const [totalMoney, setTotalMoney] = useState();
    const [totalNetMoney, setTotalNetMoney] = useState();
    const [totalEmployee, setTotalEmployee] = useState();
    const [presentEmployee, setPresentEmployee] = useState();

    const fetchTotalMoney = async () => {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/total-money/${formattedDate}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTotalMoney(data.total_money_earned);

        } catch (error) {
            alert(error.message);
        }
    };

    const fetchTotalNetMoney = async () => {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/total-money`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTotalNetMoney(data.total_money_earned);

        } catch (error) {
            alert(error.message);
        }
    };

    const presentEmployeCount = async () => {
        try {
            const date_obj = new Date();
            const date = date_obj.getDate();
            // const day = date.toISOString().split('T')[0];
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe-data/getall/now`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            const ln = data.filter((d) => d.attendence==undefined? false : d.attendence.includes(date)).length;
            setPresentEmployee(ln);
            setTotalEmployee(data.length);

        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        fetchTotalMoney();
        fetchTotalNetMoney();
        presentEmployeCount();
    }, [])

    return (
        <>
            <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
                <AdminNev />

                <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Dashboard</h1>

                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-plus mr-3"></i> Sales Report
                                </p>
                                <div className="p-6 bg-white">
                                    Total Sales for date {new Date().toDateString()} : {totalMoney || 0} Rs<br />
                                    Total Sales till now : {totalNetMoney || 0} Rs<br />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-check mr-3"></i> Employee Report
                                </p>
                                <div className="p-6 bg-white">
                                    Total : {totalEmployee} <br />
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: presentEmployee, label: 'Present', color: '#00ff33' },
                                                    { id: 1, value: totalEmployee - presentEmployee, label: 'Absent', color: '#ff9633' }
                                                ],
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-plus mr-3"></i> Item Report
                                </p>
                                <div className="p-6 bg-white">
                                    <canvas id="chartOne" width="400" height="200"></canvas>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-check mr-3"></i> Employee Report
                                </p>
                                <div className="p-6 bg-white">
                                    <canvas id="chartTwo" width="400" height="200"></canvas>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
