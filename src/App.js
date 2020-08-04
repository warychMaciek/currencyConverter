import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

const RATES_API = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [firstAmountChanged, setFirstAmountChanged] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  useEffect(() => {
    fetch(RATES_API)
      .then(response => response.json())
      .then(data => {
        const currencyOptionsArray = [data.base, ...Object.keys(data.rates)];
        setCurrencyOptions(currencyOptionsArray);
        setFirstCurrency(data.base);
        const secondCurrencyBase = currencyOptionsArray.indexOf('PLN');
        setSecondCurrency(currencyOptionsArray[secondCurrencyBase]);
        setExchangeRate(data.rates['PLN']);
      })
  }, []);

  useEffect(() => {
    if (secondCurrency != null && firstCurrency != null) {
      fetch(`${RATES_API}?base=${firstCurrency}&symbols=${secondCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[secondCurrency]))
    }
  }, [firstCurrency, secondCurrency])

  function handleFirstCurrencyAmountChange(e) {
    setAmount(e.target.value);
    setFirstAmountChanged(true);
  }

  function handleSecondCurrencyAmountChange(e) {
    setAmount(e.target.value);
    setFirstAmountChanged(false);
  }

  let firstAmount, secondAmount;
  if (firstAmountChanged) {
    firstAmount = amount;
    secondAmount = amount * exchangeRate;
  } else {
    firstAmount = amount / exchangeRate;
    secondAmount = amount;
  }

  return (
    <>
      <h1>Currency converter with the latest rates</h1>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={firstCurrency}
        handleCurrencyChange={e => setFirstCurrency(e.target.value)}
        amount={firstAmount}
        handleAmountChange={handleFirstCurrencyAmountChange}
      />
      <div className="equals">=</div>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={secondCurrency}
        handleCurrencyChange={e => setSecondCurrency(e.target.value)}
        amount={secondAmount}
        handleAmountChange={handleSecondCurrencyAmountChange}
      />
    </>
  );
}

export default App;
