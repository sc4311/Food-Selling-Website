import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import CartContext from "../store/CartContext.jsx";
import { getCurrencyFormatter } from "../util/formatting.js";

import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart({ currencyFormatter }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity);
    }, 0);
    const cartTotalWithTax = cartTotal * (1 + 0.0825);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleCheckout() {
        userProgressCtx.showCheckout();
    }


    return( 
    <Modal 
    className="cart" 
    open={userProgressCtx.process === 'cart'}
    onClose={userProgressCtx.process ==='cart' ? handleCloseCart : null}
    >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem 
                key={item.id} 
                name={item.name} 
                quantity={item.quantity} 
                price={item.price}
                onIncrease={()=> cartCtx.addItem(item)}
                onDecrease={() => cartCtx.removeItem(item.id)}
                />
            ))}
        </ul>
        <p className="cart-total">
            {currencyFormatter.format(cartTotalWithTax)}
        </p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 &&(
                <Button onClick={handleCheckout}>Go to Checkout</Button>
            )}
        </p>
    </Modal>
    );
}

