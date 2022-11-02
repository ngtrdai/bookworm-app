import { createSlice } from "@reduxjs/toolkit";
import { CartUtils } from "../utils";

const cartInStore = CartUtils.getCart();

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart : cartInStore,
        alert: {
            show: false,
            message: '',
        },
        limit: 8,
    },
    reducers: {
        addToCart: (state, action) => {
            const book = action.payload;
            const carts = CartUtils.getCart();
            const index =  carts.findIndex(item => item.id === book.id);
            if (index !== -1) {
                if(carts[index].quantity + book.quantity <= state.limit) {
                    carts[index].quantity += book.quantity;
                    state.alert.show = true;
                    state.alert.message = "Book added to cart successfully";
                    localStorage.setItem("cart", JSON.stringify(carts));
                } else {
                    state.alert.show = true;
                    state.alert.message = 'You can not add more than ' + state.limit + ' books';
                }

            } else {
                carts.push(book);
                localStorage.setItem('cart', JSON.stringify(carts));
                state.cart = carts;
                state.alert = {
                    show: true,
                    message: 'Book added to cart',
                };
            }
        },
        addQuantity: (state, action) => {
            const id = action.payload;
            const carts = CartUtils.getCart();
            const index = carts.findIndex(item => item.id === id);
            if (index !== -1) {
                if (carts[index].quantity < state.limit) {
                    carts[index].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(carts));
                    state.cart = carts;
                    state.alert.show = true;
                    state.alert.message = 'Book quantity updated';
                } else {
                    state.alert.show = true;
                    state.alert.message = 'You can not add more than ' + state.limit + ' books';
                }
            }
        },
        minusQuantity: (state, action) => {
            const id = action.payload;
            const carts = CartUtils.getCart();
            const index = carts.findIndex(item => item.id === id);
            if (index !== -1) {
                if (carts[index].quantity > 1) {
                    carts[index].quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(carts));
                    state.cart = carts;
                } else {
                    let confirm = window.confirm('Are you sure to remove this book from cart?');
                    if(confirm) {
                        carts.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(carts));
                        state.cart = carts;
                    }
                }
            }
        },
        removeFromCart: (state, action) => {
            let confirm = window.confirm('Are you sure to remove this book from cart?');
            if (confirm) {
                const bookId = action.payload;
                const carts = CartUtils.getCart();
                const newCarts = carts.filter(cart => cart.id !== bookId);
                localStorage.setItem('cart', JSON.stringify(newCarts));
                state.cart = newCarts;
                state.alert = {
                    show: true,
                    message: 'Book removed from cart',
                };
            }
        },
        clearCart: (state) => {
            localStorage.removeItem('cart');
            state.cart = [];
            state.alert = {
                show: true,
                message: 'Cart cleared',
            };
        },
        hideAlert: (state) => {
            state.alert = {
                show: false,
                message: '',
            };
        }
    }
});

export const {addToCart, removeFromCart, clearCart, addQuantity, minusQuantity, hideAlert} = cartSlice.actions;
export default cartSlice.reducer;