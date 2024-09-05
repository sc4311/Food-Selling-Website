import Header from "./components/Header";
import Meals from "./components/Meals";
import { useState } from "react";
import { getCurrencyFormatter } from "./util/formatting";
import { exchangeRates } from "./util/exchangeRates";  // Import exchange rates

function App() {
  const [currency, setCurrency] = useState('USD');
  const currencyFormatter = getCurrencyFormatter(currency);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <>
      <Header onCurrencyChange={handleCurrencyChange} />
      <Meals currency={currency} exchangeRates={exchangeRates} currencyFormatter={currencyFormatter} />
    </>
  );
}

export default App;
