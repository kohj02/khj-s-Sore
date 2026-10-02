
import {  useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './page/home'
import Login from './page/Login'
import Register from './page/Register'
import { DispatcherContext, DispatcherContext2 } from './context/DispatcherContext'
import { DataContext } from './context/DispatcherContext'
import Addgoods from './page/Addgoods'
import Idsearch from './page/Idsearch'
import PasswordSearch from './page/PasswordSearch'
import User from './page/User'
import UserUpdate from './page/UserUpdate'
import Shopping from './page/Shopping'
import ProductPage from './page/ProductPage'
import UpdateProduct from './page/UpdateProduct'

function App() {

  const [memberdata,setMemberData] = useState({
        id:localStorage.getItem("userId")||'',
        isboolean:localStorage.getItem("isboolean")||false
    })
    const getMemberData = (id,isboolean) =>{
      localStorage.setItem("userId",id);
      localStorage.setItem("isboolean",isboolean);
        setMemberData(prev=>({
            ...prev,
            id,
            isboolean,
        }));
    }


    const getId = ()=>{
      return memberdata.id;
    }

    const getIsboolean = ()=>{
      return memberdata.isboolean;
    }

    const setSData = (data) =>{
     localStorage.setItem("searchDta",JSON.stringify(data));
    }
    
    
  return (
    
    <div>
      <DispatcherContext2.Provider value={setSData}>
      <DispatcherContext.Provider value={getMemberData}>
      <DataContext.Provider value={{...memberdata}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/khjstore/member/login' element={<Login/>}/>
        <Route path='/khjstore/member/register' element={<Register/>}/>
        <Route path='/khjstore/member/addgoods' element={<Addgoods getId={getId} getIsboolean={getIsboolean}/>} />
        <Route path='/khjstore/member/idsearch' element={<Idsearch/>}/>
        <Route path='/khjstore/member/pwdsearch' element={<PasswordSearch/>}/>
        <Route path='/khjstore/member/user' element={<User/>}/>
        <Route path='/khjstore/member/userupdate' element={<UserUpdate/>}/>
        <Route path='/khjstore/product/shopping' element={<Shopping/>}/>
        <Route path='/khjstore/product/:page_id' element={<ProductPage/>}/>
        <Route path='/khjstore/product/productUpdate/:page_id' element={<UpdateProduct/>}/>
      </Routes>
      </BrowserRouter>
      </DataContext.Provider>
      </DispatcherContext.Provider>
      </DispatcherContext2.Provider>
    </div>
  )
}

export default App

