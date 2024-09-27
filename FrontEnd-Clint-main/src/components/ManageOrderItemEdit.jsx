import React, { useEffect, useRef, useState } from 'react'
import { FaCut, FaSave } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import showToastMessage from '../utils/toast_message';
import { MdAdd, MdDelete } from 'react-icons/md';

export default function ManageOrderItemEdit({ items_desc, id, fun }) {
    const [editOrderMenuState, setEditOrderMenuState] = useState(false);
    const [allItemData, setAllItemData] = useState();
    const [itemDesc, setItemDesc] = useState(items_desc);
    const ref = useRef();

    const getItemFromStore = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/getall`);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setAllItemData(data);
        } catch (error) {
            // console.error('There was a problem with the fetch operation:', error);
            // alert('There was a problem retrieving the items: ' + error.message);
            showToastMessage("error", 'There was a problem retrieving the items: ' + error.message);
        }
    };
    const updateData = async () => {
        let updatedData = []
        for (let ele of ref.current.childNodes) {
            // console.log(ele.childNodes[0].childNodes[0].value)
            updatedData.push({
                "item_id": ele.id,
                "item_name": ele.childNodes[0].childNodes[0].value.split("##AK##")[0],
                "item_quantity": ele.childNodes[1].childNodes[0].value,
                "item_plate": ele.childNodes[2].childNodes[0].value
            });
            // console.log(ele.childNodes[0].childNodes[0].value);
        }
        console.log(updatedData);

        // return;
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/update/menu/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "items_desc": updatedData })
        });
        console.log('Response status:', response.status); // Log the response status
        const data = await response.json();
        console.log('Response data:', data); // Log the response data

        if (!response.ok) {
            showToastMessage("error", response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }
        fun('pending');
        setEditOrderMenuState(false);
        showToastMessage('success', `Order of ID ${id} updated sucessfully`)
    }
    useEffect(() => {
        getItemFromStore();
    }, []);
    return (
        <>
            <table
                className="border border-gray-300 m-0 table-auto bg-white rounded-lg shadow-md font-light cursor-pointer"
                onClick={() => setEditOrderMenuState(!editOrderMenuState)}
            >
                <thead className="bg-gray-100">
                    <tr>

                        <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider p-1 px-2">Name</th>
                        <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider p-1 px-2">Quantity</th>
                        <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider p-1 px-2">Size</th>
                        {/* <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider p-1 px-2">Del</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items_desc.map((ele, idx) => (
                        <tr className={`${idx % 2 !== 0 ? "bg-gray-50" : ""}`} key={idx}>

                            <td className="text-sm font-medium text-gray-900 px-2">{ele.item_name}</td>
                            <td className="text-sm text-gray-500 px-2">{ele.item_quantity}</td>
                            <td className="text-sm text-gray-500 px-2">{ele.item_plate}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div
                className={`p-4 h-full flex justify-center items-center flex-col fixed left-0 bg-gray-100 w-full z-50 transition-all duration-300 ease-in-out ${editOrderMenuState ? "top-0" : "top-full"}`}
            >
                <FaXmark
                    className='top-3 right-3 absolute text-2xl cursor-pointer'
                    onClick={() => setEditOrderMenuState(!editOrderMenuState)}
                />
                <div className='w-full text-center text-5xl font-bold mb-8'>AFFECTIONARY</div>
                <div className='w-full lg:w-3/4 p-4 text-xl container border border-gray-300 rounded-lg bg-white shadow-lg'>
                    <div className='overflow-x-auto'>
                        <table className="border-collapse w-full bg-white rounded-lg shadow-md">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Name</th>
                                    <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Quantity</th>
                                    <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Size</th>
                                    <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Del</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200" ref={ref}>
                                {itemDesc.map((ele, idx) => (
                                    <tr className={`${idx % 2 !== 0 ? "bg-gray-50" : "bg-white"}`} key={idx} id={ele.item_id}>
                                        <td className="py-3 px-4">
                                            {allItemData && <select defaultValue={ele.item_name + "##AK##" + ele.item_id} className='w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none' onChange={(e) => {
                                                e.target.parentElement.parentElement.id = e.target.value.split("##AK##")[1]
                                                // console.log(e.target.value.split("##AK##")[1])
                                            }}>
                                                {allItemData.map((item, index) => {
                                                    return <option value={item.name + "##AK##" + item.dishId} key={index} id={item.dishId}>{item.name}</option>
                                                })}
                                            </select>}
                                        </td>
                                        <td className="py-3 px-4"><input type="number" defaultValue={ele.item_quantity} className='w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none' /></td>
                                        <td className="py-3 px-4"><select defaultValue={ele.item_plate} className='w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none'>
                                            <option value="full">Full</option>
                                            <option value="half">Half</option>
                                        </select></td>
                                        <td className="px-2 text-center text-red-800 text-2xl cursor-pointer"><MdDelete onClick={(e) => {
                                            let el = e.target.parentElement.parentElement.parentElement;
                                            el.parentNode.removeChild(el);
                                            // console.log(el)
                                        }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex mt-6 ml-5'>
                        <button className='flex items-center gap-2 text-lg font-semibold bg-green-500 text-white rounded-md px-6 py-2 transition-transform transform hover:scale-105 hover:bg-green-600 active:scale-95' onClick={() => {
                            // Get the first item from allItemData to set as default
                            const defaultItem = allItemData[0];
                            // Create a new item object with default values
                            const newItem = {
                                item_id: defaultItem.dishId,
                                item_name: defaultItem.name,
                                item_quantity: 1,  // Default quantity
                                item_plate: 'full' // Default plate size
                            };
                            // Update the state to include the new item
                            setItemDesc([...items_desc, newItem]);
                        }}>
                            <MdAdd /> Add
                        </button>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='flex items-center gap-2 text-lg font-semibold bg-blue-500 text-white rounded-md px-6 py-2 transition-transform transform hover:scale-105 hover:bg-blue-600 active:scale-95' onClick={updateData}>
                            <FaSave /> Save
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
