import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal, currency, exchangeRate, currencyFormatter }) {
    const cartCtx = useContext(CartContext);
    const convertedPrice = meal.main_price * exchangeRate; 
    
    function handleAddMealToCart(){
        cartCtx.addItem(meal);
    };
    return (
        <li className="meal-item">
            <article>
                <img src={meal.main_image} alt={meal.main_name} />
                <div>
                    <h3>{meal.main_name}</h3>
                    <p className="meal-item-price">
                        {currencyFormatter.format(convertedPrice)}
                    </p>
                    <p className="meal-item-description">{meal.main_description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
