import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryMeals() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealsByCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }

        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByCategory();
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-dark mb-3">
        ← Back to Home
      </Link>
      
      <h2 className="mb-4">Meals in <span className="text-success">"{categoryName}"</span></h2>

      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {meals.map((meal) => (
            <div className="col" key={meal.idMeal}>
              <div className="card h-100 shadow-sm">
                <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="card-title text-center fw-bold">{meal.strMeal}</h6>
                  <Link to={`/meal/${meal.idMeal}`} className="btn btn-sm btn-primary mt-2 w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryMeals;