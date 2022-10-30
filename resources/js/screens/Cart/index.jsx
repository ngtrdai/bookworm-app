import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CartUtils } from "../../utils";
import { TitleCustom } from "../../components";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { CartTotal, CardForCart } from "./components";
function Cart(){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);

    return (
        <Container className="bookworm__cart">
            <TitleCustom firstStr="Your cart:" number={cart.length} lastStr="items" />
            <Row className="bookworm__cart__content">
                <Col xs={12} md={8} lg={8}>
                    <CardForCart />
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <CartTotal />
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;