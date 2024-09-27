import Root from './pages/Root'
import Home from './pages/Home'
import AdminLogin from './pages/admin/Login'
import EmployeeLogin from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import ManageItems from './pages/admin/ManageItems'
import Dashbord from './pages/admin/AdminHome/Dashbord'
import ManageOrders from './pages/admin/ManageOrders'
import ManageEmploye from './pages/admin/ManageEmploye'
import Invoice from './pages/admin/Invoice'
import EmpDashbord from './pages/employee/EmpHome/EmpDashbord'
import EmpMangeOrder from './pages/employee/EmpMangeOrder'
import ManageEmployeData from './pages/admin/ManageEmployeData'
import AttendenceView from './pages/AttendenceView'
import OrderDetail from './pages/admin/OrderDetail'
import RecieptHandler from './pages/admin/RecieptHandler'
import Remark from './pages/admin/Remark'
import Sales from './pages/admin/Sales'
import Purchase from './pages/admin/Purchase'
// import EmpDashbord from './pages/employee/EmpDashbord'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<EmployeeLogin />} />
          <Route path='/employee'>
            <Route path='' element={<EmpDashbord />} />
            <Route path='manage-orders' element={<EmpMangeOrder />} />
            <Route path='attendence/:id' element={<AttendenceView />} />
          </Route>
          <Route path='/admin' >
            <Route path='' element={<Dashbord />} />
            <Route path='login' element={<AdminLogin />} />
            <Route path='manage-items' element={<ManageItems />} />
            <Route path='kot' element={<ManageOrders />} />
            <Route path='manage-employe' element={<ManageEmploye />} />
            <Route path='employe-data' element={<ManageEmployeData />} />
            <Route path='receipt' element={<RecieptHandler />} />
            <Route path='invoice/:id/:discount' element={<Invoice />} />
            <Route path='order/:id' element={<OrderDetail />} />
            <Route path='remarks' element={<Remark />} />
            <Route path='sales' element={<Sales />} />
            <Route path='purchase' element={<Purchase />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
