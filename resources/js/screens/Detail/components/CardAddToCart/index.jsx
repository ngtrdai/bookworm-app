import { useState } from "react";
import { Card } from "react-bootstrap";
import "./style.scss";
function CardAddToCart({book}) {
    const [quantity, setQuantity] = useState(1);
    const minMaxQuantity = {
        min: 1,
        max: 8
    };
    const getCart = () => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        }
        return [];
    };

    const handleAddToCart = () => {
        const cart = getCart();
        const index = cart.findIndex((item) => item.id === book.id);
        if (index === -1) {
            cart.push({
                id: book.id,
                quantity: quantity,
                book: book
            });
        } else {
            cart[index].quantity += quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    return (
        <Card>
            <Card.Header className="bookworm__detail__card__header">
                {book.book_price === book.final_price ? (
                    <div className="bookworm__detail__card__price">
                        <span className="bookworm__detail__card__price__finalprice">${(book.final_price * quantity).toFixed(2)}</span>
                    </div>
                ) : (
                    <div className="bookworm__detail__card__price">
                        <span className="bookworm__detail__card__price__bookprice">${(book.book_price * quantity).toFixed(2)}</span>
                        <span className="bookworm__detail__card__price__finalprice">${(book.final_price * quantity).toFixed(2)}</span>
                    </div>
                )}
            </Card.Header>
            <Card.Body className="bookworm__detail__card__body">
                <span>Quantity</span>
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
    )
}

export default CardAddToCart;