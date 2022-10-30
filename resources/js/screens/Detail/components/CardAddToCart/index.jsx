import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CartUtils } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../reducers/cart";
import { AlertCustom } from "../../../../components";
import "./style.scss";
function CardAddToCart({book}) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const minMaxQuantity = {
        min: 1,
        max: 8
    };
    const alert = useSelector((state) => state.cartReducer.alert);
    const handleAddToCart = () => {
        const data = {
            id: book.id,
            quantity: quantity,
            book: book
        };
        dispatch(addToCart(data));
    };
    return (
        <React.Fragment>
            {
                alert.show && <AlertCustom variant="success" message={alert.message} />
            }
            <Card>
                <Card.Header className="bookworm__detail__card__header px-4">
                    {book.book_price === book.final_price ? (
                        <div className="bookworm__detail__card__price">
                            <span className="bookworm__detail__card__price__finalprice">${book.final_price}</span>
                        </div>
                    ) : (
                        <div className="bookworm__detail__card__price">
                            <span className="bookworm__detail__card__price__bookprice">${book.book_price}</span>
                            <span className="bookworm__detail__card__price__finalprice">${book.final_price}</span>
                        </div>
                    )}
                </Card.Header>
                <Card.Body className="bookworm__detail__card__body px-4 my-4">
                    <span className="mb-0">Quantity</span>
                    <div className="bookworm__detail__card__body__quantity">
                        {quantity <= minMaxQuantity.min ? (
                            <button className="bookworm__detail__card__body__quantity__button" disabled>-</button>
                        ) : (
                            <button className="bookworm__detail__card__body__quantity__button" onClick={() => setQuantity(quantity - 1)}>-</button>
                        )}
                        <span className="bookworm__detail__card__body__quantity__number">{quantity}</span>
                        {quantity >= minMaxQuantity.max ? (
                            <button className="bookworm__detail__card__body__quantity__button" disabled>+</button>
                        ) : (
                            <button className="bookworm__detail__card__body__quantity__button" onClick={() => setQuantity(quantity + 1)}>+</button>
                        )}
                    </div>
                    <div className="bookworm__detail__card__body__addtocart">
                        <button onClick={() => handleAddToCart()}>Add to cart</button>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default CardAddToCart;