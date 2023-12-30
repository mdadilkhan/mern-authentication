import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
const App=()=> {


  return (
    <>
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/singup' element={<SignUp/>}/>
        <Route path='/singin' element={<Signin/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
