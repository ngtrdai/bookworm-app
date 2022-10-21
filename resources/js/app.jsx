import React, { useEffect } from "react";
import {Router, Route, Routes, Redirect } from "react-router-dom";
import bookApi from "./api/bookApi";
import Welcome from "./welcome";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;