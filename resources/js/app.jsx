import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Shop, Detail, Cart, Error404 } from "./screens";

import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/shop">
                    <Route path="" element={<Shop />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;