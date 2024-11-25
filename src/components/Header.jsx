import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CurrencyDropdown from './UI/CurrencyDropdown'; 
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ onCurrencyChange }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  function handleShowAccount() {
    userProgressCtx.showAccount(); // Open the account modal
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant logo" />
        <h1>Scrumpy Foods</h1>
      </div>
      <nav>
        <CurrencyDropdown onCurrencyChange={onCurrencyChange} />
        <Button textOnly onClick={handleShowAccount}>Account</Button> {/* Updated to trigger account modal */}
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
