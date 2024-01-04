import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
const App=()=> {


  return (
    <>
     <BrowserRouter>
      <Header/>
      <Routes>
       <Route element={<PrivateRoute />}>
         <Route path="/" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
       </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<Signin/>}/>
       
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
