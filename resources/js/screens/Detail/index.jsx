import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BookDetail, BookReview } from "./components";
import "./style.scss";
function Detail() {
    const { id } = useParams();
    return (
        <Container className="detail">
            <BookDetail id={id} />
            <BookReview id={id} />
        </Container>
    );
}

export default Detail;