import Header from "./components/Header";
import Meals from "./components/Meals";
import { useState } from "react";
import { getCurrencyFormatter } from "./util/formatting";
import { exchangeRates } from "./util/exchangeRates";  // Import exchange rates
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";
function App() {
  const [currency, setCurrency] = useState('USD');
  const currencyFormatter = getCurrencyFormatter(currency);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header onCurrencyChange={handleCurrencyChange} />
      <Meals currency={currency} exchangeRates={exchangeRates} currencyFormatter={currencyFormatter} />
      <Cart currencyFormatter={currencyFormatter} />
      <Checkout currencyFormatter={currencyFormatter} />
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
