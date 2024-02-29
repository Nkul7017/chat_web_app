import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import loader from "./Components/loader"
const Login=React.lazy(()=>import('./Pages/Login'))
const Home=React.lazy(()=>import('./Pages/Home'))


function App() {


  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={
      <React.Suspense fallback={<loader/>}>
        <Login/>
      </React.Suspense> 
    } />
    <Route path='/home/:name' element={
      <React.Suspense fallback={<loader/>}>
        <Home/>
      </React.Suspense> 
    } />
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
