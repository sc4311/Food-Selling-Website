import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext';
import { getCurrencyFormatter } from '../util/formatting.js';  
import Input from './Input.jsx';
import Button from './UI/Button.jsx';  
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity);
    }, 0);
    const cartTotalWithTax = cartTotal * (1 + 0.0825);

    const currencyFormatter = getCurrencyFormatter();

    function handleClose() {
        userProgressCtx.hideCheckout();
    }
    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(even.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch("http:localhost:3000/orders", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartCtx.items,
                customer: customerData
            })
        });
    }

    return (
        <Modal 
        open={userProgressCtx.process === 'checkout'} 
        onClose={handleClose}
        >
            <form>
                <h2>Check Out</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotalWithTax)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button type="submit">Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
