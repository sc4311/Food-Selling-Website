import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealItem from './MealItem.jsx';

export default function Meals({ currency, exchangeRates, currencyFormatter, searchQuery }) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('category');

  useEffect(() => {
    axios.get('http://localhost:3000/meals')
      .then((response) => {
        setMeals(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch meals.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <p className="center">{error}</p>;
  }

  // Function to sort meals based on selected option
  const sortMeals = (meals, option) => {
    switch (option) {
      case 'price-asc':
        return [...meals].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...meals].sort((a, b) => b.price - a.price);
      case 'category':
        return [...meals].sort((a, b) => a.category.localeCompare(b.category));
      default:
        return meals;
    }
  };

  // Filter meals based on the search query
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || meal.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMeals = sortMeals(filteredMeals, sortOption);

  const mealsByCategory = sortedMeals.reduce((acc, meal) => {
    const category = meal.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(meal);
    return acc;
  }, {});

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div id="meals">
      {/* Sort Dropdown at the top of the body */}
      <div className="sort-container">
        <label htmlFor="sort-dropdown">Sort by: </label>
        <select id="sort-dropdown" onChange={handleSortChange} value={sortOption}>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Render meals */}
      {Object.keys(mealsByCategory).map((category) => (
        <div key={category} className="meal-category">
          <h2>{category}</h2>
          <ul className="meal-list">
            {mealsByCategory[category].map((meal) => (
              <MealItem
                key={meal.id}
                meal={meal}
                currency={currency}
                exchangeRate={exchangeRates[currency]}
                currencyFormatter={currencyFormatter}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

