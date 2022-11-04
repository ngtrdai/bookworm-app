import React from "react";
import { Row } from "react-bootstrap";
import { StringUtils } from "../../../../utils";
import "./style.scss"
function TitleShop({ params }) {
    const { category_name, author_name, rating, sort_by } = params;

    const filterBy = "(Filtered by ";
    let filterByString = "";
    if (category_name) {
        filterByString = filterBy + "category: " + StringUtils.capitalizeWords(category_name) + ")";
    }
    if (author_name) {
        filterByString = filterBy + "author: " + author_name + ")";
    }
    if (rating) {
        filterByString = filterBy + "rating: " + rating + ")";
    }
    if (category_name && author_name) {
        filterByString = filterBy + "category: " + StringUtils.capitalizeWords(category_name) + " | author: " + author_name + ")";
    }
    if (category_name && rating) {
        filterByString = filterBy + "category: " + StringUtils.capitalizeWords(category_name) + " | rating: " + rating + ")";
    }
    if (author_name && rating) {
        filterByString = filterBy + "author: " + author_name + " | rating: " + rating + ")";
    }
    if (category_name && author_name && rating) {
        filterByString = filterBy + "category: " + StringUtils.capitalizeWords(category_name) + " | author: " + author_name + "| rating: " + rating + ")";
    }


    return (
        <Row className="bookworm__title">
            <h3>Books {
                (params.category || params.author || params.rating) ? (
                    <span>{filterByString}</span>
                ) : ""
            }
            </h3>
            <hr />
        </Row>
    );
}

export default TitleShop;