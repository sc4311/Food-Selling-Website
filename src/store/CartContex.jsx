import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = state.items.concat(action.item);
        return { items: updatedItems };
    }

    if(action.type === 'REMOVE_ITEM') {
        const updatedItems = state.items.filter(item => item.id !== action.id);
        return { items: updatedItems };
    }

    return state;
}

export function CartContextProvider({ children }) {
    useReducer(cartReducer, { items: []});

    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;