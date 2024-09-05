// src/util/formatting.js
export const getCurrencyFormatter = (currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    });
};
