import React from 'react';
import { Row, Col } from "react-bootstrap";
import { CardDetail, CardAddToCart } from "../../components";
function BookDetail({ book }) {
    return (
        <Row className='mb-3'>
            <Col xs={12} md={8} lg={8} className="bookworm__detail__colitem">
                <CardDetail book={book}/>
            </Col>
            <Col xs={12} md={4} lg={4} className="bookworm__detail__colitem">
                <CardAddToCart book={book} />
            </Col>
        </Row>
    );
}

export default BookDetail;