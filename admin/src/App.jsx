import { Route, Routes } from "react-router-dom"
import Navbar from "./component/Navbar/Navbar.jsx"
import Sidebar from "./component/sidebar/Sidebar.jsx"

import Orders from "./pages/Orders/Orders.jsx"
import Add from "./pages/Add/Add.jsx"
import List from "./pages/List/List.jsx"

import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const Url ="http://localhost:3000";

  return<div>
          <ToastContainer/>
          <Navbar></Navbar>
          <hr></hr>
          <div className="app-content">
            <Sidebar></Sidebar>
            <Routes>
              <Route path="/add" element={<Add Url={Url}></Add>} ></Route>
              <Route path="/list" element={<List Url={Url}></List>} ></Route>
              <Route path="/orders" element={<Orders Url={Url}></Orders>} ></Route>
            </Routes>
          </div>
      </div>
} 

export default App
