import React, { useState } from 'react';

export default function CurrencyDropdown({ onCurrencyChange }) {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setSelectedCurrency(newCurrency);
        onCurrencyChange(newCurrency);
    };

    return (
        <select className="text-button currency-dropdown" value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
    );
}
