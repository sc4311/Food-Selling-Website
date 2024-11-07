import React, { useState } from "react";
import Button from "../UI/Button";

const SignIn = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        if (!username || !password) {
            setErrorMessage('Both username and password are required.');
            return;
        }
        
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while trying to sign in. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign In or Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email </label>
                <input
                    id="username"
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password"> Password </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Sign In</Button>
            </form>
            <Button onClick={onClose}>Close</Button>
        </div>
    );
}

export default SignIn;
