import React, { useState, createContext } from "react";

// Create a named export for UserProgressContext
export const UserProgressContext = createContext({
    process: '',
    showCart: () => {},
    hideCart: () => {}, // Add hideCart function here
    hideCheckout: () => {},
    showCheckout: () => {},
    showAccount: () => {},
    hideAccount: () => {},
});

export function UserProgressContextProvider({ children }) {
    const [process, setProcess] = useState('');

    const showCart = () => {
        setProcess('cart');
    };

    const hideCart = () => {
        setProcess(''); // Reset the process state when the cart is closed
    };

    const showCheckout = () => {
        setProcess('checkout');
    };

    const hideCheckout = () => {
        setProcess('');
    };

    const showAccount = () => {
        setProcess('account');
    };

    const hideAccount = () => {
        setProcess('');
    };

    const contextValue = {
        process,
        showCart,
        hideCart, // Add the hideCart function to contextValue
        hideCheckout,
        showCheckout,
        showAccount,
        hideAccount,
    };

    return (
        <UserProgressContext.Provider value={contextValue}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
