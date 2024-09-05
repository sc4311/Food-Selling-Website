import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CurrencyDropdown from './UI/CurrencyDropdown'; // Import the currency dropdown

export default function Header({ onCurrencyChange }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant logo" />
        <h1>Scrumpy foods</h1>
      </div>
      <nav>
        <CurrencyDropdown onCurrencyChange={onCurrencyChange} />
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
