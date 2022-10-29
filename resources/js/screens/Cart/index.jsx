import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CartUtils } from "../../utils";
import IMAGE from "../../../assets";
import "./style.scss";
function Cart(){
    var itemsInCart = CartUtils.getCart();
    const [cart, setCart] = useState(itemsInCart);
    console.log(cart);
    return (
        <Container className="bookworm__cart">
            <Row className="mb-3">
                <h3>Your cart: {3} items</h3>
                <hr />
            </Row>
            <Row className="bookworm__cart__content">
                <Col xs={12} md={8} lg={8}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col xs={12} md={4} lg={4}>
                                    <h6>Product</h6>
                                </Col>
                                <Col xs={12} md={8} lg={8}>
                                    <Row>
                                        <Col xs={12} md={4} lg={4}>
                                            <h6>Price</h6>
                                        </Col>
                                        <Col xs={12} md={4} lg={4}>
                                            <h6>Quantity</h6>
                                        </Col>
                                        <Col xs={12} md={4} lg={4}>
                                            <h6>Total</h6>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {
                                cart.length === 0 ? (
                                    <div className="bookworm__cart__empty">
                                        <h5>Your cart is empty</h5>
                                    </div>
                                ) : (
                                    cart.map((item, index) => {
                                        return (
                                            <Row key={index} className="mb-3">
                                                <Col xs={12} md={4} lg={4}>
                                                    <Row lg={2}>
                                                        <Col>
                                                            <img className="bookworm__cart__image" src={item.book.book_cover_photo ? IMAGE[item.book.book_cover_photo]: IMAGE['bookDefault']} alt="book" />
                                                        </Col>
                                                        <Col className='d-flex justify-content-center flex-column'>
                                                            <h6 className='text-truncate'>{item.book.book_title}</h6>
                                                            <p>{item.book.book_author_name}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12} md={8} lg={8}>
                                                    <Row>
                                                        <Col xs={12} md={4} lg={4}>
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
                                                        <Col xs={12} md={4} lg={4}>
                                                            <div className="bookworm__cart__quantity">
                                                                <button className="bookworm__cart__quantity__button">-</button>
                                                                <h6 className="bookworm__cart__quantity__number">{item.quantity}</h6>
                                                                <button className="bookworm__cart__quantity__button">+</button>
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} md={4} lg={4}>
                                                            <h6>{(item.book.final_price * item.quantity).toFixed(2)}</h6>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <hr className="mt-3"/>
                                            </Row>
                                        );
                                    }
                                ))
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card>
                        <Card.Header className='d-flex justify-content-center'>
                            <h6>Cart Total</h6>
                        </Card.Header>
                        <Card.Body>
                            <h1>{123123}</h1>
                            <button>
                                Place order
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;