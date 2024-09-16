import React from "react";
import Button from "../UI/Button";

const SignIn = ({ onClose }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the sign-in or sign-up logic here
    };

    return (
        <div>
            <h2>Sign In or Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email </label>
                <input id="username" type="email" required />
                <label htmlFor="password"> Password </label>
                <input id="password" type="password" required />
                <Button type="submit">Sign In</Button>
            </form>
            <Button onClick={onClose}>Close</Button>
        </div>
    );
};

export default SignIn;
