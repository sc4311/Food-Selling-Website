import React, { useState } from 'react';
import Button from '../UI/Button';
import { useUser } from './UserContext';

const SignIn = ({onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [actionType, setActionType] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { user, loginUser, logoutUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (actionType === 'signin') {
            try {
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setMessage(data.message);

                if (response.ok) {
                    loginUser({
                        email,
                        name: data.user.name || '',
                        street: data.user.street || '',
                        postalCode: data.user.postalCode || '',
                        city: data.user.city || '',
                    });
                    loginUser(userData);
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

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedUser = {
          email: user.email,
          name: event.target.name.value,
          street: event.target.street.value,
          postalCode: event.target.postalCode.value,
          city: event.target.city.value,
        };
        try {
          const response = await fetch('http://localhost:3000/api/auth/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
          });
          const data = await response.json();
          if (response.ok) {
            loginUser(updatedUser);
            setMessage("infromation updated successfully.");
            console.log("Updated.");
            setIsEditing(false);
          } else {
            setMessage(data.message || 'Failed to update information.');
            console.error("Failed update.");
          }
        } catch (error) {
          setMessage('Error updating information.');
        }
      };

    if (user) {
        return (
            <div>
              <h2>Account Information:</h2>
              {!isEditing ? (
                <div>
                  <p>Name: {user.name}</p>
                  <p>Street: {user.street}</p>
                  <p>Postal Code: {user.postalCode}</p>
                  <p>City: {user.city}</p>
                  <Button onClick={() => setIsEditing(true)}>Edit Info</Button>
                  <Button onClick={logoutUser}>Log Out</Button>
                  <Button onClick={onClose}>Close</Button>
                </div>
              ) : (
                <form onSubmit={handleUpdate}>
                  <label>
                    Name: <input defaultValue={user.name} name="name" required />
                  </label>
                  <label>
                    Street: <input defaultValue={user.street} name="street" required />
                  </label>
                  <label>
                    Postal Code: <input defaultValue={user.postalCode} name="postalCode" required />
                  </label>
                  <label>
                    City: <input defaultValue={user.city} name="city" required />
                  </label>
                  <Button type="submit">Save</Button>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </form>
              )}
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
