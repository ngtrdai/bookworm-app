import React from "react";
import {Route, Routes } from "react-router-dom";

import { Header, Footer } from "./components/Layouts";
import { Home, Shop } from "./pages";

import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/" element={<Redirect to="/home" />} /> */}
                <Route path='/shop' element={<Shop />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;