import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Shop } from "./screens";

import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;