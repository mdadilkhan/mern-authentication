import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Hotel from "./pages/Hotel";
import PrivateRoute from "./components/PrivateRoute";
import RoomDetails from "./pages/RoomDetails";
import HotelDetails from "./pages/HotelDetails";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/room" element={<Room />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/roomdetials/:id" element={<RoomDetails />} />
            <Route path="/hoteldetials/:id" element={<HotelDetails />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
