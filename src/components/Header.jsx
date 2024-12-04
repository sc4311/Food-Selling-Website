import { useContext, useState } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CurrencyDropdown from './UI/CurrencyDropdown'; 
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ onCurrencyChange, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);  // Pass the query to the parent component
  }

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  function handleShowAccount() {
    userProgressCtx.showAccount();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant logo" />
        <h1>Scrumpy Foods</h1>
      </div>
      <nav>
        <CurrencyDropdown onCurrencyChange={onCurrencyChange} />
        <div className="search-wrapper">
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="Search meals..." 
            className="search-bar"
          />
        </div>
        <Button textOnly onClick={handleShowAccount}>Account</Button>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}


