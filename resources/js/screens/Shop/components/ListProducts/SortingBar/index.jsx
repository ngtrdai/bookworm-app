import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./style.scss";


function SortingBar(){
    const [sortType, setSortType] = useState('onsale');
    const [showType, setShowType] = useState('15');

    const sortTypes = {
        "onsale": 'on sale',
        "popular": 'popularity',
        "price-asc": 'price: low to high',
        "price-desc": 'price: high to low',
    };

    const showTypes = {
        "5": '5',
        "10": '10',
        "15": '15',
        "20": '20',
    };

    return (
        <div className="shop__listproduct__sorting">
            <h6>Showing 6 - 10 of 126 books</h6>
            <div className="shop__listproduct__sorting__dropdown">
                <Dropdown className="shop__listproduct__sorting__dropdown__sorting">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort by {sortTypes[sortType]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortType('onsale')}>Sort by {sortTypes['onsale']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortType('popular')}>Sort by {sortTypes['popular']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortType('price-asc')}>Sort by {sortTypes['price-asc']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortType('price-desc')}>Sort by {sortTypes['price-desc']}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="shop__listproduct__sorting__dropdown__showing">
                    <Dropdown.Toggle variant="success" id="dropdown-basic-2">
                        Show {showType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setShowType('5')}>Show {showTypes['5']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowType('10')}>Show {showTypes['10']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowType('15')}>Show {showTypes['15']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowType('20')}>Show {showTypes['20']}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default SortingBar;