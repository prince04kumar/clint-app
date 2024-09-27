import React, { useEffect, useState } from 'react'
import AdminNev from '../../components/AdminNev'
import { FaXmark } from 'react-icons/fa6';
import { MdAdd, MdDelete, MdEdit, MdUpdate } from 'react-icons/md';

export default function Remark() {
    const [remarks, setRemarks] = useState([]);
    const [currentRemark, setCurrentRemark] = useState([]);
    const [updateState, setUpdateState] = useState(false);
    const [eleId, setEleId] = useState(null);

    const fetchRemarks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/remark/getall`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setRemarks(data);
            // setLoading(false);
        } catch (err) {
            // setError(err);
            // setLoading(false);
        }
    }

    const deleteRemark = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/remark/del/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Remove the deleted remark from the state
            setRemarks(remarks.filter(remark => remark.remarkId !== id));
        } catch (err) {
            console.error('Failed to delete remark:', err);
        }
    };

    const updateRemark = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/remark/update/${eleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ remark: currentRemark })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Update the remark in the state
            setRemarks(remarks.map(remark =>
                remark.remarkId === id ? { ...remark, remark: updatedRemark } : remark
            ));
        } catch (err) {
            console.error('Failed to update remark:', err);
        }
    };

    const addRemark = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/remark/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ remark: currentRemark })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const addedRemark = await response.json();
            setRemarks('');
            // setNewRemark('');
        } catch (err) {
            console.error('Failed to add remark:', err);
        }
    };


    useEffect(() => {
        fetchRemarks();
    }, [])
    return (
        <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
            <AdminNev />
            <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">

                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-4">Remarks</h1>

                    <div className="w-full mt-12 overflow-y-scroll">

                        <div className='flex w-full items-center justify-center bg-green-400 p-3 rounded text-2xl text-green-950 cursor-pointer hover:bg-green-500' onClick={() => {
                            setUpdateState(!updateState);
                            setEleId(null);
                            // setEditMode(false);
                        }}>
                            <MdAdd /> &nbsp; Add Remark
                        </div>
                        {remarks && remarks.map((data, index) => {
                            return <div className="bg-white overflow-auto my-4 p-3 rounded-md shadow-sm border border-l-lime-600 border-x-4" id={data.remarkId} key={index}>
                                <h4 className='font-bold text-3xl'>{index + 1}. </h4>
                                {data.remark} <br /><br />
                                <h4 className='font-bold text-sm text-right m-0 p-0 flex items-center'>
                                    <MdDelete className='text-2xl text-red-600 hover:text-red-700 cursor-pointer' onClick={() => {
                                        // setEleId(data.remarkId);
                                        deleteRemark(data.remarkId);
                                    }} /> &nbsp;
                                    <MdEdit className='text-2xl text-blue-600 hover:text-blue-700 cursor-pointer' onClick={() => {
                                        setEleId(data.remarkId)
                                        setCurrentRemark(data.remark);
                                        setUpdateState(!updateState)
                                    }} /> &nbsp; &nbsp;
                                    <span className='text-gray-500 font-light'>{new Date(data.date).toLocaleString()}</span>
                                </h4>
                            </div>
                        })}

                    </div>
                </main>
            </div>

            <div className={`w-full h-[100vh] fixed transition duration-500 bg-gray-200 ${updateState ? "" : "top-[100vh]"}`}>
                <div className=' p-4 text-2xl absolute text-right w-full'>
                    <FaXmark onClick={() => {
                        setUpdateState(!updateState)
                    }} className='cursor-pointer float-right' />
                </div>

                <div className='p-4 h-full flex justify-center items-center flex-col'>
                    <div className='p-2 text-2xl'>{eleId==null ? "Add": "Update"} Remark</div>
                    <form className="max-w-md mx-auto rounded border border-black p-5 container overflow-x-scroll">

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <textarea
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-both"
                                    placeholder=" "
                                    required
                                    value={currentRemark}
                                    onChange={(e) => setCurrentRemark(e.target.value)}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Edit
                                </label>

                            </div>
                        </div>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                            // updateRemark();
                            eleId==null ? addRemark(): updateRemark();
                            setUpdateState(!updateState)
                        }}>{eleId==null ? "Add": "Update"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
