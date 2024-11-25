import Header from "./components/Header";
import Meals from "./components/Meals";
import { useState, useContext } from "react";
import { getCurrencyFormatter } from "./util/formatting";
import { exchangeRates } from "./util/exchangeRates";  
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider, UserProgressContext } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";
import SignIn from "./components/Users/SignIn";
import Modal from './components/UI/Modal';

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
        <AccountModal /> {/* Render the Account modal conditionally */}
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

// Component to handle account modal display logic
function AccountModal() {
  const userProgressCtx = useContext(UserProgressContext);

  return (
    <Modal open={userProgressCtx.process === 'account'} onClose={userProgressCtx.hideAccount}>
      <SignIn onClose={userProgressCtx.hideAccount} />
    </Modal>
  );
}

export default App;
