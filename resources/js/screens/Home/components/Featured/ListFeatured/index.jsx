import {useEffect, useState} from "react";
import { Col } from "react-bootstrap";
import { CardCustom } from "../../../../../components";
function ListFeatured({books}){
    return (
        books.map((book) => {
            return (
                <Col key={book.id} xs={12} sm={6} md={3} lg={3} className="bookworm__featured__colitem">
                    <CardCustom book={book} />
                </Col>
            );
        })
    );
}

export default ListFeatured;