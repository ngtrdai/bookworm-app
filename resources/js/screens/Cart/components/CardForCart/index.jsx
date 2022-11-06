import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addQuantity, minusQuantity } from "../../../../reducers/cart";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../../../assets";
import { AlertCustom } from "../../../../components";
import "./style.scss"
function CardForCart(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cartReducer.cart);

    const handleAddQuantity = (book) => {
        dispatch(addQuantity(book.id));
    }
    const handleRemoveQuantity = (book) => {
        dispatch(minusQuantity(book.id));
    }

    const handleClick = (book) => {
        navigate(`/shop/${book.id}`);
    }
    return (
        <Card>
            <Card.Header>
                <Row className="bookworm__cart__header">
                    <Col md={12} lg={5}>
                        <h6>Product</h6>
                    </Col>
                    <Col md={12} lg={2}>
                        <h6>Price</h6>
                    </Col>
                    <Col md={12} lg={3}>
                        <h6>Quantity</h6>
                    </Col>
                    <Col md={12} lg={2}>
                        <h6>Total</h6>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {
                    cart.length === 0 ? (
                        <div className="bookworm__cart__empty p-2">
                            <h5>Your cart is empty</h5>
                        </div>
                    ) : (
                        cart.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs={12} md={12} lg={5}>
                                        <div className="bookworm__cart__booktitle d-flex">
                                            <img onClick={() => handleClick(item.book)} className="bookworm__cart__image" src={item.book.book_cover_photo ? IMAGE[item.book.book_cover_photo]: IMAGE['bookDefault']} alt="book" />
                                            <div className='ms-3 d-flex justify-content-center flex-column'>
                                                <h6>{item.book.book_title}</h6>
                                                <p>{item.book.book_author_name}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} lg={2} className="d-flex justify-content-center flex-column">
                                        {
                                            item.book.book_price === item.book.final_price ? (
                                                <h6>${item.book.final_price}</h6>
                                            ) : (
                                                <React.Fragment>
                                                    <h6 className="bookworm__cart__price__final">${item.book.final_price}</h6>
                                                    <h6 className="bookworm__cart__price__discount">${item.book.book_price}</h6>
                                                </React.Fragment>
                                            )
                                        }
                                    </Col>
                                    <Col xs={12} md={12} lg={3} className="d-flex justify-content-center flex-column"> 
                                        <div className="bookworm__cart__quantity">
                                            <button className="bookworm__cart__quantity__button" onClick={() => handleRemoveQuantity(item.book)}>-</button>
                                            <h6 className="bookworm__cart__quantity__number">{item.quantity}</h6>
                                            <button className="bookworm__cart__quantity__button" onClick={() => handleAddQuantity(item.book)}>+</button>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} lg={2} className="d-flex justify-content-center flex-column">
                                        <h3 className="bookworm__cart__price__final">${(item.book.final_price * item.quantity).toFixed(2)}</h3>
                                    </Col>
                                    <hr className="mt-3"/>
                                </Row>
                            );
                        }
                    ))
                }
            </Card.Body>
        </Card>
    );
}

export default CardForCart;