import React, { useState } from 'react';
import Button from '../UI/Button';
import { useUser } from './UserContext';

const SignIn = ({onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [actionType, setActionType] = useState('');
    const { user, loginUser, logoutUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (actionType === 'signin') {
            console.log("Attempting to sign in with: ", email, password);
            try {
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setMessage(data.message);

                if (response.ok) {
                    console.log('Sign-in successful');
                    loginUser({ email });
                    onClose();
                }
            } catch (error) {
                setMessage('Error signing in.');
                console.error('Sign-in error:', error);
            }
        } else if (actionType === 'signup') {
            console.log("Attempting to sign up with: ", email, password);
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setMessage(data.message);

                if (response.ok) {
                    console.log('Sign-up successful');
                    loginUser({ email });
                    onClose();
                }
            } catch (error) {
                setMessage('Error signing up.');
                console.error('Sign-up error:', error);
            }
        }
    };

    if (user) {
        return (
            <div>
                <h2>Welcome, {user.email}!</h2>
                <Button onClick={logoutUser}>Log Out</Button>
                <Button onClick={onClose}>Close</Button>
            </div>
        );
    }

    return (
        <div>
            <h2>Sign In or Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email </label>
                <input
                    id="username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password"> Password </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    id="SignInButton"
                    onClick={() => setActionType('signin')}>
                        Sign In
                </Button>
                <Button
                    type="submit"
                    id="SignUpButton"
                    onClick={() => setActionType('signup')}>
                        Sign Up
                </Button>
            </form>
            <Button onClick={onClose}>Close</Button>
        </div>
    );
}

export default SignIn;
