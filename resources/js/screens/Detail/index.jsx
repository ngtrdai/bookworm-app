import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BookDetail, BookReview } from "./components";
import "./style.scss";
function Detail() {
    const { id } = useParams();
    
    return (
        <div className="detail">
            <Container>
                <BookDetail id={id} />
                <BookReview id={id} />
            </Container>
        </div>
    );
}

export default Detail;