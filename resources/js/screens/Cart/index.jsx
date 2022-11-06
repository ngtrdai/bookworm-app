import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TitleCustom } from "../../components";
import { useSelector } from "react-redux";

import "./style.scss";
import { CartTotal, CardForCart } from "./components";
function Cart(){
    const cart = useSelector(state => state.cartReducer.cart);
    useEffect(() => {
        document.title = "Bookworm - Cart";
    }, []);
    return (
        <Container className="bookworm__cart">
            <TitleCustom firstStr="Your cart:" number={cart.length} lastStr="items" />
            <Row className="bookworm__cart__content">
                <Col md={12} lg={8} className="mb-2">
                    <CardForCart />
                </Col>
                <Col md={12} lg={4}>
                    <CartTotal />
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;