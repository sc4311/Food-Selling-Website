import { useEffect, useState } from 'react';
import MealItem from './MealItem';

export default function Meals({ currency, exchangeRates, currencyFormatter }) {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);

    return (
        <ul id='meals'>
            {loadedMeals.map((meal) => (
                <MealItem 
                    key={meal.id} 
                    meal={meal} 
                    currency={currency} 
                    exchangeRate={exchangeRates[currency]}
                    currencyFormatter={currencyFormatter} 
                />
            ))}
        </ul>
    );
}
