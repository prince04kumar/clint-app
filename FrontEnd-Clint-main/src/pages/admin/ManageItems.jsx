import React, { useEffect, useState } from 'react'
import AdminNev from '../../components/AdminNev'
import { FaEdit, FaPen } from 'react-icons/fa'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { FaXmark } from 'react-icons/fa6'
import showToastMessage from '../../utils/toast_message'

export default function ManageItems() {
  const [addItemState, setAddItemState] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setitemCategory] = useState("");
  const [restaurantHalfPrice, setRestaurantHalfPrice] = useState("");
  const [restaurantFullPrice, setRestaurantFullPrice] = useState("");
  const [swiggyHalfPrice, setSwiggyHalfPrice] = useState("");
  const [zomatoFullPrice, setZomatoFullPrice] = useState("");
  const [swiggyFullPrice, setSwiggyFullPrice] = useState("");
  const [zomatoHalfPrice, setZomatoHalfPrice] = useState("");
  const [editElementId, setEditElementId] = useState();
  const [allItemData, setAllItemData] = useState();
  const [allItemCount, setAllItemCount] = useState();
  const [editMode, setEditMode] = useState(false);


  const addItemToStore = async () => {
    const item_data = {
      name: itemName,
      category: itemCategory,
      restaurant_half_price: restaurantHalfPrice,
      restaurant_full_price: restaurantFullPrice,
      swiggy_half_price: swiggyHalfPrice,
      swiggy_full_price: swiggyFullPrice,
      zomato_half_price: zomatoHalfPrice,
      zomato_full_price: zomatoFullPrice
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
    //   getItemFromStore();
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   alert('There was a problem adding the item: ' + error.message);
    // }
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/add`, {
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
    console.log(data);
    showToastMessage('success', 'Item Added Sucessfully')
    // Optionally, update the list of items
    getItemFromStore();
  };

  const updateItemFromStore = async () => {
    const item_data = {
      name: itemName,
      category: itemCategory, // Fixed typo: was itemCategory
      restaurant_half_price: restaurantHalfPrice,
      restaurant_full_price: restaurantFullPrice,
      swiggy_half_price: swiggyHalfPrice,
      swiggy_full_price: swiggyFullPrice,
      zomato_half_price: zomatoHalfPrice,
      zomato_full_price: zomatoFullPrice
    };

    // try {
    //   const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/update/${editElementId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(item_data)
    //   });

    //   console.log('Response status:', response.status); // Log the response status
    //   const data = await response.json();
    //   console.log('Response data:', data); // Log the response data

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.statusText}`);
    //   }

    //   alert('Item updated successfully');
    //   // Optionally, update the list of items
    //   getItemFromStore();
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   alert('There was a problem updating the item: ' + error.message);
    // }
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/update/${editElementId}`, {
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
    showToastMessage('success', 'Item Updated Sucessfully')
    // Optionally, update the list of items
    getItemFromStore();
  };


  const updateItemTriger = (e) => {
    setEditElementId(e.target.parentElement.parentElement.id)
    let ele = e.target.parentElement.previousSibling;
    setZomatoFullPrice(ele.innerText);
    ele = ele.previousSibling;
    setZomatoHalfPrice(ele.innerText);
    ele = ele.previousSibling;
    setSwiggyFullPrice(ele.innerText);
    ele = ele.previousSibling;
    setSwiggyHalfPrice(ele.innerText);
    ele = ele.previousSibling;
    setRestaurantFullPrice(ele.innerText);
    ele = ele.previousSibling;
    setRestaurantHalfPrice(ele.innerText);
    ele = ele.previousSibling;
    setitemCategory(ele.innerText);
    ele = ele.previousSibling;
    setItemName(ele.innerText);

    setEditMode(true);
    setAddItemState(!addItemState);
    console.log(ele);
  }

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

  const delItemFromStore = async (e) => {
    const id = e.target.parentElement.parentElement.id;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/del/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        showToastMessage("error", response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      showToastMessage('success', 'Item Deleted Sucessfully')
      getItemFromStore();
    } catch (error) {
      // console.error('There was a problem with the fetch operation:', error);
      // alert('There was a problem deleting the item: ' + error.message);
      showToastMessage("error", 'There was a problem deleting the item: ' + error.messaget);
    }
  };

  const getItemInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/dishes/order-count`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log(data);
      setAllItemCount(data);
    } catch (error) {
      // console.error('There was a problem with the fetch operation:', error);
      // alert('There was a problem retrieving the items: ' + error.message);
      showToastMessage("error", 'There was a problem retrieving the items: ' + error.message);
    }
  };

  useEffect(() => {
    getItemFromStore();
    getItemInfo();
  }, []);
  return (
    <>
      <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
        <AdminNev />

        <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Item Manager</h1>
            <div className='flex w-full items-center justify-center bg-green-400 p-3 rounded text-2xl text-green-950 cursor-pointer hover:bg-green-500' onClick={() => {
              setAddItemState(!addItemState);
              setEditMode(false);
            }}>
              <MdAdd /> &nbsp; Add item
            </div>
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                <p className="text-xl pb-3 flex items-center">
                  <i className="fas fa-plus mr-3"></i> Reports
                </p>
                <div className="p-6 bg-white">
                  <b>Total Item In store</b> : {allItemData && allItemData.length}
                </div>
              </div>
              <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                <p className="text-xl pb-3 flex items-center">
                  <i className="fas fa-check mr-3"></i> Sells Report
                </p>
                <div className="p-6 bg-white">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Count</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 max-h-[30vh]">
                      {allItemCount && allItemCount.map((item, index) => (
                        <tr key={item.dishId}>
                          <td className="text-left py-3 px-4">{item.dishId}</td>
                          <td className="text-left py-3 px-4">{item.name}</td>
                          <td className="text-left py-3 px-4">{item.times_ordered}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">S No</th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Item</th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Catagory</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Restorent 1/2 Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Restorent full Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">swiggy 1/2 Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">swiggy full Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">zomato 1/2 Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">zomato full Prize</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Edit / Del</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {allItemData && allItemData.map((item, index) => (
                      <tr key={item.dishId} id={item.dishId}>
                        <td className="text-left py-3 px-4">{index + 1}</td>
                        <td className="w-1/3 text-left py-3 px-4">{item.name}</td>
                        <td className="w-1/3 text-left py-3 px-4">{item.category}</td>
                        <td className="text-left py-3 px-4">{item.restaurant_half_price}</td>
                        <td className="text-left py-3 px-4">{item.restaurant_full_price}</td>
                        <td className="text-left py-3 px-4">{item.swiggy_half_price}</td>
                        <td className="text-left py-3 px-4">{item.swiggy_full_price}</td>
                        <td className="text-left py-3 px-4">{item.zomato_half_price}</td>
                        <td className="text-left py-3 px-4">{item.zomato_full_price}</td>
                        <td className="text-left py-3 px-4 ">
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


        <div className={`w-full h-[100vh] fixed transition-all duration-500 bg-gray-200 ${addItemState ? "" : "top-[100vh]"}`}>
          <div className=' p-4 text-2xl absolute text-right w-full'>
            <FaXmark onClick={() => {
              setZomatoFullPrice("");
              setZomatoHalfPrice("");
              setSwiggyFullPrice("");
              setSwiggyHalfPrice("");
              setRestaurantFullPrice("");
              setRestaurantHalfPrice("");
              setitemCategory("");
              setItemName("");
              setAddItemState(!addItemState)
            }} className='cursor-pointer float-right' />
          </div>

          <div className='p-4 h-full flex justify-center items-center flex-col'>
            <div className='p-2 text-2xl'>{editMode ? "Update item" : "Add item"}</div>
            <form className="max-w-md mx-auto rounded border border-black p-5 container overflow-x-scroll">
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item Name</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={itemCategory} required onChange={(e) => setitemCategory(e.target.value)} />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Catagory</label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={restaurantHalfPrice} onChange={(e) => setRestaurantHalfPrice(e.target.value)} />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Restorent 1/2 Prize</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={restaurantFullPrice} onChange={(e) => setRestaurantFullPrice(e.target.value)} />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Restorent full Prize</label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={swiggyHalfPrice} onChange={(e) => setSwiggyHalfPrice(e.target.value)} />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Swiggy 1/2 Prize</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={swiggyFullPrice} onChange={(e) => setSwiggyFullPrice(e.target.value)} />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Swiggy full Prize</label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={zomatoHalfPrice} onChange={(e) => setZomatoHalfPrice(e.target.value)} />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zomato 1/2 Prize</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={zomatoFullPrice} onChange={(e) => setZomatoFullPrice(e.target.value)} />
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zomato Full Prize</label>
                </div>
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
