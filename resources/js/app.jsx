import React, { useEffect } from "react";
import {Router, Route, Routes, Redirect } from "react-router-dom";
import bookApi from "./api/bookApi";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;