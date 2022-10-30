
class CartUtils {
    static getCart() {
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        }
        return [];
    }

    static getNoOfItems() {
        return CartUtils.getCart().length || 0;
    }

    static checkBookInCart(bookId) {
        const cart = CartUtils.getCart();
        return cart.some(book => book.id === bookId);
    }
}

export default CartUtils;