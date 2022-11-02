import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { CardDetail, CardAddToCart, DetailTitle } from "../../components";
import { shopApi } from "../../../../services";
import { StringUtils } from "../../../../utils";
import { useNavigate } from "react-router-dom";

function BookDetail({ id }) {
    const [bookDetail, setBookDetail] = useState({});
    let navigate = useNavigate();
    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await shopApi.getDetailProduct(id);
                setBookDetail(response.data);
            } catch (error) {
                if(error.response.status === 422){
                    navigate('/home');
                }
            }
        };
        fetchBookDetail();
    }, []);
    console.log(bookDetail);
    return (
        <React.Fragment>
            {Object.keys(bookDetail).length === 0 ? (
                <div className="bookworm__detail__loading">
                    <div className="bookworm__detail__loading__spinner"></div>
                </div>
            ) : (
                <React.Fragment>
                    <DetailTitle CategoryName={StringUtils.capitalizeWords(bookDetail.book_category_name)} />
                    <Row className='mb-2'>
                        <Col xs={12} md={8} lg={8} className="bookworm__detail__colitem mb-2">
                            <CardDetail book={bookDetail}/>
                        </Col>
                        <Col xs={12} md={4} lg={4} className="bookworm__detail__colitem">
                            <CardAddToCart book={bookDetail} />
                        </Col>
                    </Row>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default BookDetail;