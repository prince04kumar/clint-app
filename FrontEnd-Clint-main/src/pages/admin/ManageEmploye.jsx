import React, { useEffect, useState } from 'react'
import AdminNev from '../../components/AdminNev'
import { MdAdd } from 'react-icons/md'
import { FaXmark } from 'react-icons/fa6'
import showToastMessage from '../../utils/toast_message';

export default function ManageEmploye() {
    const [employeState, setEmployeState] = useState(false);
    const [employeName, setEmployeName] = useState("");
    const [employeNumber, setEmployeNumber] = useState("");
    const [employeMail, setEmployeMail] = useState("");
    const [employePassward, setEmployePassward] = useState("");
    const [editElementId, setEditElementId] = useState();
    const [allEmployeData, setAllEmployeData] = useState();
    const [editMode, setEditMode] = useState(false);


    const addItemToStore = async () => {
        const item_data = {
            name: employeName,
            phone_number: employeNumber,
            password: employePassward,
            mail: employeMail
        };

        // try {
        //   const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/add`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item_data)
        //   });

        //   if (!response.ok) {
        //     throw new Error(`Error: ${response.statusText}`);
        //   }

        //   const data = await response.json();
        //   console.log(data);
        //   alert('Item added successfully');
        //   // Optionally, update the list of items
        //   getEmployeData();
        // } catch (error) {
        //   console.error('There was a problem with the fetch operation:', error);
        //   alert('There was a problem adding the item: ' + error.message);
        // }
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item_data)
        });

        if (!response.ok) {
            showToastMessage("error", response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        showToastMessage('success', 'Employee Added Sucessfully')
        // Optionally, update the list of items
        getEmployeData();
    };

    const updateItemFromStore = async () => {
        const item_data = {
            name: employeName,
            phone_number: employeNumber,
            password: employePassward,
            mail: employeMail
        };

        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe/update/${editElementId}`, {
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

        showToastMessage('success', 'Employee Updated Sucessfully')
        // Optionally, update the list of items
        getEmployeData();
    };


    const updateItemTriger = (e) => {
        setEditElementId(e.target.parentElement.parentElement.id)
        let ele = e.target.parentElement.previousSibling;
        setEmployeMail(ele.innerText);
        ele = ele.previousSibling;
        setEmployePassward(ele.innerText);
        ele = ele.previousSibling;
        setEmployeNumber(ele.innerText);
        ele = ele.previousSibling;
        setEmployeName(ele.innerText);

        setEditMode(true);
        setEmployeState(!employeState);
        console.log(ele);
    }
    const getEmployeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe/getall`);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setAllEmployeData(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was a problem retrieving the items: ' + error.message);
        }
    };

    const delItemFromStore = async (e) => {
        const id = e.target.parentElement.parentElement.id;

        const confirmation = confirm("Are you sure to delete Employ ewith ID : " + id);

        if (confirmation) {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/employe/del/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    showToastMessage("error", response.statusText);
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                console.log(id);
                showToastMessage('success', 'Employee deleted Sucessfully')
                getEmployeData();
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                showToastMessage("error", 'There was a problem deleting the item: ' + error.message);
            }
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
                        <div className='flex w-full items-center justify-center bg-green-400 p-3 rounded text-2xl text-green-950 cursor-pointer hover:bg-green-500' onClick={() => {
                            setEmployeState(!employeState);
                            setEditMode(false);
                        }}>
                            <MdAdd /> &nbsp; Add Employee
                        </div>
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
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Phone Number</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Passward</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Email</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm whitespace-nowrap w-auto">Edit / Del</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {allEmployeData && allEmployeData.map((employe, index) => (
                                            <tr key={employe.employeId} id={employe.employeId}>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{employe.employeId}</td>
                                                <td className="w-1/3 text-left py-3 px-4">{employe.name}</td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{employe.phone_number}</td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{employe.password}</td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">{employe.mail}</td>
                                                <td className="text-left py-3 px-4 whitespace-nowrap w-auto">
                                                    <span className='hover:text-blue-500 hover:underline cursor-pointer text-blue-400' onClick={updateItemTriger}>edit</span> &nbsp;
                                                    <span className='hover:text-red-500 hover:underline cursor-pointer text-red-400' onClick={delItemFromStore}>del</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>


                <div className={`w-full h-[100vh] fixed transition-all duration-500 bg-gray-200 ${employeState ? "" : "top-[100vh]"}`}>
                    <div className=' p-4 text-2xl absolute text-right w-full'>
                        <FaXmark onClick={() => {
                            setEmployeMail("");
                            setEmployeName("");
                            setEmployeNumber("");
                            setEmployePassward("");
                            setEmployeState(!employeState);
                        }} className='cursor-pointer float-right' />
                    </div>

                    <div className='p-4 h-full flex justify-center items-center flex-col'>
                        <div className='p-2 text-2xl'>{editMode ? "Update Employee" : "Add Employee"}</div>
                        <form className="max-w-md mx-auto rounded border border-black p-5 container overflow-x-scroll">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={employeName} onChange={(e) => setEmployeName(e.target.value)} />
                                <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" id='floating_number' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeNumber} required onChange={(e) => setEmployeNumber(e.target.value)} />
                                <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" id='floating_email' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeMail} required onChange={(e) => setEmployeMail(e.target.value)} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" id='floating_password' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employePassward} required onChange={(e) => setEmployePassward(e.target.value)} />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passward</label>
                            </div>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                                if (editMode) {
                                    updateItemFromStore();
                                } else {
                                    addItemToStore();
                                }
                            }}>{editMode ? "Update" : "Add"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
