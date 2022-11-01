import React from "react";
import SortingBar from "./SortingBar";
import Products from "./Products";
import "./style.scss";

function ListProducts({ params, setPage, setSortBy, setNoItems, paginate, setPaginate }) {

    return (
        <div className='shop__listproduct'>
            <SortingBar params={params}
                        setSortBy={setSortBy} 
                        setNoItems={setNoItems}
                        paginate={paginate}/>
            <Products params={params} setPage={setPage} paginate={paginate} setPaginate={setPaginate}/>
        </div>
    );
}

export default ListProducts;