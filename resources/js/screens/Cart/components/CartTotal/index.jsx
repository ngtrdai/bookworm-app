import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { SignInModal } from "../../../../components";
import { shopApi } from "../../../../services";
import { clearCart } from "../../../../reducers/cart";
import "./style.scss"
function CartTotal(){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);
    const [isShow, setIsShow] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            total += item.book.final_price * item.quantity;
        });
        setTotal(total);
    }, [cart]);
    
    const handlePlaceOrder = () => {
        if(!localStorage.getItem('isLogin')){
            setIsShow(true);
        } else {
            if(cart.length === 0){
                alert('Cart is empty');
            }else{
                let confirm = window.confirm("Are you sure to place order?");
                if(confirm){
                    const items_order = cart.map((item) => {
                        return {
                            book_id: item.id,
                            quantity: item.quantity
                        }
                    });
                    const order = async () => {
                        try {
                            const response = await shopApi.orderProducts({items_order: items_order});
                            if(response.status === 201){
                                alert("Place order successfully!");
                                dispatch(clearCart());
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    order();
                }
            }
        }
        
    }

    return (
        <React.Fragment>
            <SignInModal show={isShow} onHide={() => setIsShow(false)} />
            <Card>
                <Card.Header className='d-flex justify-content-center'>
                    <h6>Cart Total</h6>
                </Card.Header>
                <Card.Body className="bookworm__cart_total">
                    <h1>${total.toFixed(2)}</h1>
                    <button onClick={handlePlaceOrder}>
                        Place order
                    </button>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default CartTotal;