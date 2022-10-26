import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { shopApi } from "../../services";
import { DetailTitle, BookDetail, BookReview } from "./components";
import { StringUtils } from "../../utils";
import "./style.scss";
function Detail() {
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await shopApi.getDetailProduct(id);
                setBookDetail(response);
            } catch (error) {
                console.log("Failed to fetch book detail: ", error);
            }
        };
        fetchBookDetail();
    }, [id]);
    return (
        <div className="detail">
            {Object.keys(bookDetail).length === 0 ? (
                <div className="detail__loading">Loading...</div>
            ) : (
                <Container>
                    <DetailTitle CategoryName={StringUtils.capitalizeWords(bookDetail.book_category_name)} />
                    <BookDetail book={bookDetail} />
                    <BookReview reviews={[]} />
                </Container>
            )}
        </div>
    );
}

export default Detail;