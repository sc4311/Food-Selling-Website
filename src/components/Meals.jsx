import useHttp from '../hooks/useHttp.js';
import MealItem from './MealItem.jsx';


const requestConfig = {};
export default function Meals({ currency, exchangeRates, currencyFormatter }) {
    const table = 'main_courses';
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp(`http://localhost:3000/${table}`, requestConfig, []);

    if (isLoading) {
        return <p className="center">Loading...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }

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
