import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { StringUtils } from "../../../../utils";
import "./style.scss"
function TitleShop({ params }) {
    return (
        <Row className="bookworm__title">
            <h3>Books {
                (params.category || params.author || params.rating) ? (
                    <span>{"(Filtered by " + (params.category_name ? "category: " + StringUtils.capitalizeWords(params.category_name) : "") + " " + (params.author_name ? "author: " + params.author_name : "") + " " + (params.rating ? "rating: " + params.rating +" star" : "") + ")"}</span>
                ) : ""
            }
            </h3>
            <hr />
        </Row>
    );
}

export default TitleShop;