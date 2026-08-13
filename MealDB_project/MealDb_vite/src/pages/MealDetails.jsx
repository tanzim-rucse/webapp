import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MealDetails() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch meal details');
        }

        const data = await response.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  return (
    <div className="container mt-4">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Go Back
      </button>

      {loading ? (
       <p>Loading......</p>
      ) : meal ? (
        <div className="card shadow p-4">
          <div className="row g-4">
            <div className="col-md-4">
              <img src={meal.strMealThumb} className="img-fluid rounded" alt={meal.strMeal} />
            </div>
            <div className="col-md-8">
              <h2>{meal.strMeal}</h2>
              <p><span className="badge bg-info text-dark me-2">Category: {meal.strCategory}</span> 
                 <span className="badge bg-warning text-dark">Area: {meal.strArea}</span></p>
              
              <h5 className="mt-3">Instructions:</h5>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>{meal.strInstructions}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger">No meal details found!</div>
      )}
    </div>
  );
}

export default MealDetails;