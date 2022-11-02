import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Shop, Detail, Cart, About, Error404 } from "./screens";

import 'bootstrap/dist/css/bootstrap.css';

function App(){
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="shop">
                    <Route path=":id" element={<Detail />} />
                    <Route index element={<Shop />} />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;