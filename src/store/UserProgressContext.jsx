import React, { useState, createContext } from "react";

// Create a named export for UserProgressContext
export const UserProgressContext = createContext({
    process: '',
    showCart: () => {},
    hideCheckout: () => {},
    showCheckout: () => {},
    showAccount: () => {}, // New function to show account modal
    hideAccount: () => {}, // New function to hide account modal
});

export function UserProgressContextProvider({ children }) {
    const [process, setProcess] = useState('');

    const showCart = () => {
        setProcess('cart');
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
