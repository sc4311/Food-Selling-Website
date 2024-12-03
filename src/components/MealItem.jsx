import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal, currency, exchangeRate, currencyFormatter }) {
    const cartCtx = useContext(CartContext);
    const convertedPrice = meal.price * exchangeRate;  // Currency conversion

    function handleAddMealToCart() {
        cartCtx.addItem(meal);  // Add the meal to the cart when the button is clicked
    };

    return (
        <li className="meal-item">
            <article>
                <img src={meal.image} alt={meal.name} />  {/* Render meal image */}
                <div>
                    <h3>{meal.name}</h3>  {/* Meal name */}
                    <p className="meal-item-price">
                        {currencyFormatter.format(convertedPrice)}  {/* Display formatted price */}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>  {/* Meal description */}
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>  {/* Button to add meal to cart */}
                </p>
            </article>
        </li>
    );
}
