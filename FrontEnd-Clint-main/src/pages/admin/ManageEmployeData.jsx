import React, { useEffect, useState } from 'react'
import AdminNev from '../../components/AdminNev'
import { MdAdd } from 'react-icons/md'
import { FaXmark } from 'react-icons/fa6'
import MonthCalander from '../../components/MonthCalander';
import showToastMessage from '../../utils/toast_message';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function ManageEmployeData() {
    const DTNOW = new Date();
    const [amountState, setAmountState] = useState(false);
    const [paidAmount, setPaidAmount] = useState("");
    const [pendingAmout, setPendingAmout] = useState("");
    const [advAmount, setAdvAmount] = useState("");
    const [editElementId, setEditElementId] = useState();
    const [allEmployeData, setAllEmployeData] = useState();
    const [editMode, setEditMode] = useState(false);

    const markMyAttendnce = (id) => {
        fetch(`${import.meta.env.VITE_APP_URL}/api/employe-data/attendence/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: 'your_id_value' })
        })
            .then(response => response.json())
            .then(data => {
                getEmployeData();
                showToastMessage("success", 'Attendence Done');
            })
            .catch(error => console.error('Error:', error));
    }

    const updateItemFromStore = async () => {
        console.log(editElementId)
        const item_data = {
            "salery": {
                "adv": parseInt(advAmount),
                "pen": parseInt(pendingAmout),
                "paid": parseInt(paidAmount)
            }
        };

        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe-data/update/${editElementId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item_data)
        });

        console.log('Response status:', response.status); // Log the response status
        const data = await response.json();
        console.log('Response data:', data); // Log the response data

        if (!response.ok) {
            showToastMessage("error", response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }

        // alert('Item updated successfully');
        showToastMessage('success', 'Salery Updated of Employee ID ' + editElementId)
        // Optionally, update the list of items
        getEmployeData();
    };


    const updateItemTriger = (id, attendence) => {
        setEditElementId(id)
        setPaidAmount(attendence.paid)
        setPendingAmout(attendence.pen)
        setAdvAmount(attendence.adv)
        // console.log(editElementId)
        setEditMode(true);
        setAmountState(!amountState);
        // console.log(ele);
    }
    const getEmployeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe-data/getall/now`);

            if (!response.ok) {
                showToastMessage("error", response.statusText);
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setAllEmployeData(data);
        } catch (error) {
            // console.error('There was a problem with the fetch operation:', error);
            // alert('There was a problem retrieving the items: ' + error.message);
            showToastMessage("error", 'There was a problem retrieving the items: ' + error.message);
        }
    };

    useEffect(() => {
        getEmployeData();
    }, []);
    return (
        <>
            <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
                <AdminNev />

                <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">
                    <main className="w-full flex-grow p-6">
                        <h1 className="text-3xl text-black pb-6">Employee Manager</h1>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-plus mr-3"></i> Monthly Reports
                                </p>
                                <div className="p-6 bg-white">
                                    <b>Total Employee </b> : {allEmployeData && allEmployeData.length}
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                                <p className="text-xl pb-3 flex items-center">
                                    <i className="fas fa-check mr-3"></i> Resolved Reports
                                </p>
                                <div className="p-6 bg-white">
                                    <canvas id="chartTwo" width="400" height="200"></canvas>
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
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">ID</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Attendence</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Mark {DTNOW.getDate()}/{DTNOW.getMonth() + 1}</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Transictions</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Total Sum</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Edit Sallery</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {allEmployeData && allEmployeData.map((employe, index) => (
                                            <tr key={employe.employeId} id={employe.employeId}>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{employe.employeId}</td>
                                                <td className="w-1/3 text-left py-3 px-4">{employe.name}</td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    {/* <MonthCalander dateData={employe.attendence} /> */}
                                                    <Link to={`/employee/attendence/${employe.employeId}`}>
                                                        {employe.attendence && employe.attendence.join(", ")}
                                                    </Link>

                                                </td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    <div onClick={() => {
                                                        markMyAttendnce(employe.employeId);
                                                    }} className='cursor-pointer text-green-500 hover:text-green-600 flex items-center'>
                                                        <FaCalendar /> &nbsp; {DTNOW.getDate()}/{DTNOW.getMonth() + 1}
                                                    </div>
                                                </td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    <ul>
                                                        {Object.entries(employe.salery).map(([key, value]) => (
                                                            <li key={key}>{{ "adv": "Advance", "pen": "Penality", "paid": "Salery" }[key]}: {value}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    {employe.salery.paid - employe.salery.adv - employe.salery.pen}
                                                </td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    <span className='hover:text-blue-500 hover:underline cursor-pointer text-blue-400' onClick={() => {
                                                        updateItemTriger(employe.employeId, employe.salery)
                                                    }}>edit</span> &nbsp;

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>


                <div className={`w-full h-[100vh] fixed transition-all duration-500 bg-gray-200 ${amountState ? "" : "top-[100vh]"}`}>
                    <div className=' p-4 text-2xl absolute text-right w-full'>
                        <FaXmark onClick={() => {
                            setAdvAmount("");
                            setPaidAmount("");
                            setPendingAmout("");
                            setAmountState(!amountState);
                        }} className='cursor-pointer float-right' />
                    </div>

                    <div className='p-4 h-full flex justify-center items-center flex-col'>
                        <div className='p-2 text-2xl'>Update Amounts</div>
                        <form className="max-w-md mx-auto rounded border border-black p-5 container overflow-x-scroll">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" id="floating_paid" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={paidAmount || ""} onChange={(e) => setPaidAmount(e.target.value)} />
                                <label htmlFor="floating_paid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sallery</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" id='floating_pending' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={pendingAmout || ""} required onChange={(e) => setPendingAmout(e.target.value)} />
                                <label htmlFor="floating_pending" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Penality</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" id='floating_adv' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={advAmount || ""} required onChange={(e) => setAdvAmount(e.target.value)} />
                                <label htmlFor="floating_adv" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Advance</label>
                            </div>

                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={updateItemFromStore}>UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
