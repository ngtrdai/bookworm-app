import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { StringUtils } from "../../../../utils";
import "./style.scss"
function TitleShop(){
    const params = useSelector(state => state.filterBookReducer.params_detail);
    return (
        <Row className="bookworm__title">
            <h3>Books {
                (params.category || params.author || params.rating) ? (
                    <span>{"(Filtered by " + (params.category ? "category: " + StringUtils.capitalizeWords(params.category) : "") + " " + (params.author ? "author: " + params.author : "") + " " + (params.rating ? "rating: " + params.rating : "") + ")"}</span>
                ) : ""
            }
            </h3>
            <hr />
        </Row>
    );
}

export default TitleShop;