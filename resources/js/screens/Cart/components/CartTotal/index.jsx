import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss"
function CartTotal(){
    const cart = useSelector(state => state.cartReducer.cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            total += item.book.final_price * item.quantity;
        });
        setTotal(total);
    }, [cart]);
    
    return (
        <Card>
            <Card.Header className='d-flex justify-content-center'>
                <h6>Cart Total</h6>
            </Card.Header>
            <Card.Body className="bookworm__cart_total">
                <h1>${total.toFixed(2)}</h1>
                <button>
                    Place order
                </button>
            </Card.Body>
        </Card>
    );
}

export default CartTotal;