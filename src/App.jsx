import { useState, useContext } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { getCurrencyFormatter } from "./util/formatting";
import { exchangeRates } from "./util/exchangeRates";  
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider, UserProgressContext } from "./store/UserProgressContext";
import { UserProvider } from "./components/Users/UserContext.jsx";
import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";
import SignIn from "./components/Users/SignIn";
import Modal from './components/UI/Modal';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');  // Manage search query state
  const currencyFormatter = getCurrencyFormatter(currency);

  // Handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);  // Update search query state
  };

  return (
    <UserProvider>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header onCurrencyChange={handleCurrencyChange} onSearch={handleSearch} />
          <Meals 
            currency={currency} 
            exchangeRates={exchangeRates} 
            currencyFormatter={currencyFormatter} 
            searchQuery={searchQuery}  // Pass search query to Meals component
          />
          <Cart currencyFormatter={currencyFormatter} />
          <Checkout currencyFormatter={currencyFormatter} />
          <AccountModal /> {/* Render the Account modal conditionally */}
        </CartContextProvider>
      </UserProgressContextProvider>
    </UserProvider>
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
