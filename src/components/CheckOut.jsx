import { useContext, useState } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext';
import { getCurrencyFormatter } from '../util/formatting.js';  
import Input from './Input.jsx';
import Button from './UI/Button.jsx';  
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import SignIn from './Users/SignIn.jsx';
import { useUser } from './Users/UserContext.jsx';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { user } = useUser();
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity);
    }, 0);
    const tax = (cartTotal * 0.0825).toFixed(2)
    const cartTotalWithTax = cartTotal * (1 + 0.0825);
    const discountedTotal = cartTotalWithTax - discountAmount;

    const currencyFormatter = getCurrencyFormatter();

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleApplyDiscount() {
        if (discountCode === 'SAVE10') {
            setDiscountAmount(cartTotalWithTax * 0.10);
            setDiscountApplied(true);
        } else {
            alert('Invalid discount code.');
            setDiscountAmount(0);
            setDiscountApplied(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        if (!user) {
            // Handle case where user is not added yet
            alert("Please sign in or create an account before submitting the order.");
            return;
        }

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
                user
            }
        }));
    }

    if (!user) {
        return (
            <Modal open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
                <SignIn onClose={handleClose} />
            </Modal>
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button type="submit">Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
                <h2>Success</h2>
                <p>Order sent successfully!</p>
                <p>Thank you for your order!</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Check Out</h2>

                <Input label="Full Name" type="text" id="name" defaultValue={user.name || ''} />
                <Input label="Email Address" type="email" id="email" defaultValue={user.email || ''} />
                <Input label="Street" type="text" id="street" defaultValue={user.street || ''} />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" defaultValue={user.postalCode || ''} />
                    <Input label="City" type="text" id="city" defaultValue={user.city || ''} />
                </div>

                <h4>Price Details:</h4>
                {/* <Input label="Discount Code" type="text"/> */}
                <p>Subtotal: {currencyFormatter.format(cartTotal)}</p>
                <p>Tax: {currencyFormatter.format(tax)}</p>
                {discountApplied && (
                    <p>Discount Applied: -{currencyFormatter.format(discountAmount)}</p>
                )}
                <p>Final Amount: {currencyFormatter.format(discountedTotal)}</p>
                <Input
                    label="Discount Code"
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button type="button" onClick={handleApplyDiscount}>Apply</Button>

                {error && <Error title="Failed to send order" message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
