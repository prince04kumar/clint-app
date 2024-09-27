import React, { useEffect, useState, useRef } from 'react';
import { MdPrint } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { QRCodeCanvas } from "qrcode.react";
import logo from '../../assets/logo.png';

export default function Invoice() {
    const { id, discount } = useParams();
    const invoice_id = "#INV" + id;
    const date = new Date();
    const componentRef = useRef();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/orders/get/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching order: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data)
                setOrder(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchOrder();
    }, [id]);

    // return (
    //     <>
    //         {order ? (
    //             <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-5" ref={componentRef}>
    //                 <h1 className="font-bold text-2xl my-4 text-center text-blue-600 uppercase">Affectionary</h1>
    //                 <hr className="mb-2" />
    //                 <div className="flex justify-between mb-6">
    //                     <h1 className="text-lg font-bold">Invoice</h1>
    //                     <div className="text-gray-700">
    //                         <div>Date: {order.date.split("T")[0]}</div>
    //                         <div>Invoice : {invoice_id}</div>
    //                     </div>
    //                 </div>
    //                 <div className="mb-8 flex justify-between">
    //                     <div>
    //                         <h2 className="text-lg font-bold mb-4">Bill To:</h2>
    //                         <div className="text-gray-700">{order.name}</div>
    //                         <div className="text-gray-700">{order.phone_number}</div>
    //                     </div>
    //                     <div>
    //                         <QRCodeCanvas
    //                             id="qrCode"
    //                             value={`upi://pay?cu=INR&pa=9337002390@okbizaxis&pn=AFFECTIONARY&tn=Bill:%20R7647,%20Table:%201&am=${order.total_bill - discount}`}
    //                             size={100}
    //                             // bgColor={"#00ff00"}
    //                             level={"H"}
    //                         />
    //                     </div>
    //                 </div>
    //                 <table className="w-full mb-8">
    //                     <thead>
    //                         <tr className='bg-gray-700 text-gray-200'>
    //                             <th className="text-left font-bold pl-2">Description</th>
    //                             <th className="text-right font-bold">Qty</th>
    //                             <th className="text-right font-bold">Size</th>
    //                             <th className="text-right font-bold pr-2">Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {order.items_desc.map((item, index) => (
    //                             <tr key={index} className={index % 2 !== 0 ? 'bg-gray-100' : ""}>
    //                                 <td className="text-left text-gray-700 pl-2">{item.item_name}</td>
    //                                 <td className="text-right text-gray-700">{item.item_quantity}</td>
    //                                 <td className="text-right text-gray-700">{item.item_plate}</td>
    //                                 <td className="text-right text-gray-700 pr-2">₹ {item.item_plate == "half" ? item.prize.restaurant_half_price * item.item_quantity : item.prize.restaurant_full_price * item.item_quantity}</td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                     <tfoot className='font-semibold'>
    //                         <tr className='bg-slate-300 border border-t-black'>
    //                             <td className="text-left text-gray-700 pl-2">Total</td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700 pr-2">₹ {order.total_bill}</td>
    //                         </tr>
    //                         <tr className='bg-slate-300 border border-t-black'>
    //                             <td className="text-left text-gray-700 pl-2">Discount</td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700 pr-2">₹ {order.total_bill - discount}</td>
    //                         </tr>
    //                         <tr className='bg-slate-300 border border-t-black'>
    //                             <td className="text-left text-gray-700 pl-2">Pay Rs</td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700"></td>
    //                             <td className="text-right text-gray-700 pr-2">₹ {discount}</td>
    //                         </tr>
    //                     </tfoot>
    //                 </table>
    //                 <div className="text-gray-700 mb-2">Thank you for using our service!</div>
    //                 <div className="text-gray-700 text-sm">Please keep the INVOICE ID for future enquiry.</div>
    //             </div>
    //         ) : (
    //             "Loading..."
    //         )}

    //         {order && (
    //             <ReactToPrint
    //                 trigger={() => <button className='mx-auto text-4xl fixed top-5 right-5'><MdPrint /></button>}
    //                 content={() => componentRef.current}
    //                 documentTitle={invoice_id}
    //             />
    //         )}
    //     </>
    // );
    return (
        <>
            {order ? (
                <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-5" ref={componentRef}>
                    <img src={logo} alt="shop logo" className='w-1/3 mx-auto' />
                    <h1 className="font-bold text-2xl my-4 text-center text-blue-600 uppercase">Affectionary <br />
                        <div className='text-xs leading-3 my-2'>Inside IG Park, Near Doll Museum, Rourkela, ODISHA 769006 Ph: +91 9337002390</div>
                    </h1>
                    <hr className="mb-2" />
                    <div className="flex justify-between mb-6">
                        <h1 className="text-lg font-bold">
                            <div className="text-lg font-bold mb-2">Bill To:</div>
                            <div className="text-gray-700">{order.name}</div>
                            <div className="text-gray-700">{order.phone_number}</div>
                        </h1>
                        <div className="text-gray-700">
                            <div>Date: {order.date.split("T")[0]}</div>
                            <div>Time: {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}</div>
                            <div>Invoice : {invoice_id}</div>
                            <div>Table number : {order.table_number}</div>
                        </div>
                    </div>
                    {/* <div className="mb-8 flex justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                            <div className="text-gray-700">{order.name}</div>
                            <div className="text-gray-700">{order.phone_number}</div>
                        </div>
                    </div> */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className=' text-gray-700 border border-t-0 border-black border-l-0 border-r-0 border-b-2'>
                                <th className="text-left font-bold pl-2">ITEM</th>
                                <th className="text-right font-bold">Qty</th>
                                <th className="text-right font-bold">Size</th>
                                <th className="text-right font-bold pr-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items_desc.map((item, index) => (
                                <tr key={index} className={index % 2 !== 0 ? 'bg-gray-100' : ""}>
                                    <td className="text-left text-gray-700 pl-2">{item.item_name}</td>
                                    <td className="text-right text-gray-700">{item.item_quantity}</td>
                                    <td className="text-right text-gray-700">{item.item_plate}</td>
                                    <td className="text-right text-gray-700 pr-2">₹ {item.item_plate == "half" ? item.prize.restaurant_half_price * item.item_quantity : item.prize.restaurant_full_price * item.item_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className='font-semibold'>
                            <tr className='bg-slate-50 border border-t-1 border-black border-l-0 border-r-0 border-b-0'>
                                <td className="text-left text-gray-700 pl-2">Total</td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700 pr-2">₹ {order.total_bill}</td>
                            </tr>
                            <tr className='bg-slate-50 border-t-black'>
                                <td className="text-left text-gray-700 pl-2">Discount</td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700 pr-2">₹ {order.total_bill - discount}</td>
                            </tr>
                            <tr className='bg-slate-50 border-t-black'>
                                <td className="text-left text-gray-700 pl-2">Pay Rs</td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700"></td>
                                <td className="text-right text-gray-700 pr-2">₹ {discount}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div >
                        <QRCodeCanvas
                            id="qrCode"
                            value={`upi://pay?cu=INR&pa=9337002390@okbizaxis&pn=AFFECTIONARY&tn=Bill:%20R7647,%20Table:%201&am=${order.total_bill - discount}`}
                            size={100}
                            // bgColor={"#00ff00"}
                            level={"H"}
                            className='mx-auto'
                        />
                    </div>
                    <div className="text-gray-700 mb-2 text-center">Scan to pay (Gpay/UPI/PayTM/PhonePY)</div>
                    <hr />
                    <div className="text-gray-700 text-sm text-center">Thank you for Visitng Affectionary Cafe & Restro <br />Designed & Developed by: Adarsh</div>
                </div>
            ) : (
                "Loading..."
            )}

            {order && (
                <ReactToPrint
                    trigger={() => <button className='mx-auto text-4xl fixed top-5 right-5'><MdPrint /></button>}
                    content={() => componentRef.current}
                    documentTitle={invoice_id}
                />
            )}
        </>
    );
}
