import { getCurrencyFormatter } from "../util/formatting";


export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
    const currencyFormatter = getCurrencyFormatter(); 
    return (
        <li className="cart-item">
            <p> {name} - {quantity} x {currencyFormatter.format(price)}</p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}
