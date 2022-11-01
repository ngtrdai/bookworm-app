import React from "react";
import { Dropdown } from "react-bootstrap";
import "./style.scss";

function SortingBar({ params, setSortBy, setNoItems, paginate }) {
    const sortTypes = {
        "sale": 'on sale',
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

    const handleSort = (value) => {
        setSortBy(value);
    }

    const handleShow = (value) => {
        setNoItems(value);
    }

    return (
        <div className="shop__listproduct__sorting">
            <h6>Showing {paginate.from} - {paginate.to} of {paginate.total_items} books</h6>
            <div className="shop__listproduct__sorting__dropdown">
                <Dropdown className="shop__listproduct__sorting__dropdown__sorting">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Sort by {sortTypes[params.sort_by]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSort('sale')}>Sort by {sortTypes['sale']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('popular')}>Sort by {sortTypes['popular']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('price-asc')}>Sort by {sortTypes['price-asc']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('price-desc')}>Sort by {sortTypes['price-desc']}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="shop__listproduct__sorting__dropdown__showing">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic-2">
                        Show {params.no_items}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShow('5')}>Show {showTypes['5']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow('10')}>Show {showTypes['10']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow('15')}>Show {showTypes['15']}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow('20')}>Show {showTypes['20']}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default SortingBar;