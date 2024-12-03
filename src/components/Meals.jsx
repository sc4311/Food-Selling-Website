import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealItem from './MealItem.jsx';

export default function Meals({ currency, exchangeRates, currencyFormatter }) {
    const [meals, setMeals] = useState([]);  // State to hold meal data
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    useEffect(() => {
        // Fetch meals from the backend API
        axios.get('http://localhost:3000/meals')
            .then((response) => {
                setMeals(response.data);  // Set the meals data
                setIsLoading(false);  // Disable loading state
            })
            .catch((err) => {
                setError('Failed to fetch meals.');  // Set error if request fails
                setIsLoading(false);  // Disable loading state
            });
    }, []);  // Empty dependency array to run this once on component mount

    if (isLoading) {
        return <p className="center">Loading...</p>;  // Show loading message while fetching data
    }

    if (error) {
        return <p className="center">{error}</p>;  // Show error message if data fetching fails
    }

    return (
        <ul id="meals">
            {meals.map((meal) => (
                <MealItem
                    key={meal.id}
                    meal={meal}
                    currency={currency}
                    exchangeRate={exchangeRates[currency]}
                    currencyFormatter={currencyFormatter}
                />
            ))}  {/* Map through the meals and render each meal using MealItem component */}
        </ul>
    );
}
