import React from 'react'
// import AdminNev from '../../../components/AdminNev'
import EmployeeNev from '../../../components/EmployeeNev'
import './EmpDashbord.css'
import { FaCalendarPlus } from 'react-icons/fa'
export default function EmpDashbord() {
  // const DTNOW = new Date();
  // const markMyAttendnce = () => {
  //   fetch(`${import.meta.env.VITE_APP_URL}/api/employe-data/attendence/${JSON.parse(localStorage.getItem('credentials')).id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ id: 'your_id_value' })
  //   })
  //     .then(response => response.json())
  //     .then(data =>null)
  //     .catch(error => console.error('Error:', error));
  // }
  return (
    <>
      <div className="bg-gray-100 font-family-karla flex sm:flex-row flex-col">
        <EmployeeNev />

        <div className="w-full overflow-x-hidden border-t flex flex-col h-[100vh]">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
                <p className="text-xl pb-3 flex items-center">
                  <i className="fas fa-plus mr-3"></i> Attedance Report
                </p>
                <div className="p-6 bg-white">
                  <canvas id="chartOne" width="400" height="200"></canvas>
                </div>
              </div>
              <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                <p className="text-xl pb-3 flex items-center">
                  <i className="fas fa-check mr-3"></i> Employe Report
                </p>
                <div className="p-6 bg-white">
                  <canvas id="chartTwo" width="400" height="200"></canvas>
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
                  <i className="fas fa-check mr-3"></i> Employe Report
                </p>
                <div className="p-6 bg-white">
                  <canvas id="chartTwo" width="400" height="200"></canvas>
                </div>
              </div>
            </div>


          </main>
        </div>
      </div >
    </>
  )
}
