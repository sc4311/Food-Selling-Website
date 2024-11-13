import { useContext, useState } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext';
import { getCurrencyFormatter } from '../util/formatting.js';  
import Input from './Input.jsx';
import Button from './UI/Button.jsx';  
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import SignIn from './Users/SignIn.jsx';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const [userDetails, setUserDetails] = useState(null); // State to store signed-in user details
    const [isSignedIn, setIsSignedIn] = useState(false); // State to check if the user is signed in

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity);
    }, 0);
    const cartTotalWithTax = cartTotal * (1 + 0.0825);

    const currencyFormatter = getCurrencyFormatter();

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSignIn(user) {
        // Handle sign-in logic, e.g., sending the data to a backend and verifying it
        setUserDetails(user);
        setIsSignedIn(true); // Set the user as signed in
    }

    function handleCreateAccount(user) {
        // Handle account creation logic (e.g., sending data to a backend service)
        setUserDetails(user);
        setIsSignedIn(true); // Set the user as signed in after account creation
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        if (!userDetails) {
            // Handle case where user is not added yet
            alert("Please sign in or create an account before submitting the order.");
            return;
        }

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
                user: userDetails  // Include the user details
            },
        }));
    }

    if (!isSignedIn) {
        return (
            <Modal open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
                <SignIn onSignIn={handleSignIn} onCreateAccount={handleCreateAccount} onClose={handleClose}/>
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
                <p>Total Amount: {currencyFormatter.format(cartTotalWithTax)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to send order" message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
