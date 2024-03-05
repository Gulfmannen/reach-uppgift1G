import React, { useState, useEffect } from 'react';
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search meal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="meal-container">
          {meals.map(meal => (
            <div key={meal.idMeal} className="meal">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div>
                <h3>{meal.strMeal}</h3>
                <p>{meal.strInstructions}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
