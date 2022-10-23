import React from "react";
import SortingBar from "./SortingBar";
import Products from "./Products";
import { Row } from "react-bootstrap";
import "./style.scss";

function ListProducts(){
    return (
        <div className='shop__listproduct'>
            <SortingBar />
            <Products />
        </div>
    );
}

export default ListProducts;