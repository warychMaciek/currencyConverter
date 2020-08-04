import React from 'react';

export default function Currency(props) {
    const {
        currencyOptions,
        selectedCurrency,
        handleCurrencyChange,
        amount,
        handleAmountChange
    } = props;

    return (
        <div>
            <input type="number" value={amount} onChange={handleAmountChange} />
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
                {currencyOptions.map(option => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}