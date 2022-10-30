import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import IMAGE from '../../../../../assets';
import "./style.scss";
function CardDetail({ book }) {
    return (
        <Card>
            <Row className="bookworm__detail_card">
                <Col xs={12} md={4} lg={4} className="bookworm__detail__colitem">
                    <div className="bookworm__detail__image">
                        <img src={book.book_cover_photo ? IMAGE[book.book_cover_photo] :IMAGE['bookDefault']}/>
                    </div>
                    <div className="bookworm__detail__author">
                        <span>By (author) <strong>{book.book_author_name}</strong></span>
                    </div>
                </Col>
                <Col xs={12} md={8} lg={8} className="p-4">
                    <div className="bookworm__detail__title">
                        <h3>{book.book_title}</h3>
                    </div>
                    <div className="bookworm__detail__description">
                        <p>Book description.</p>
                        <p>{book.book_summary}</p>
                    </div>
                </Col>
            </Row>
        </Card>
        
    )
}

export default CardDetail;