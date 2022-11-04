import React from "react";
import { Row } from "react-bootstrap";
import { StringUtils } from "../../../../utils";
import "./style.scss"
function TitleShop({ params }) {
    const { category_name, author_name, rating } = params;
    const filterBy = StringUtils.getStringFilter(category_name, author_name, rating);
    return (
        <Row className="bookworm__title">
            <h3>Books {
                (params.category || params.author || params.rating) ? (
                    <span>{filterBy}</span>
                ) : ""
            }
            </h3>
            <hr />
        </Row>
    );
}

export default TitleShop;