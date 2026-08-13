import { useState } from 'react';

function MealDBApp() {
  const [categories, setCategories] = useState([]);
  const [status,setStatus]=useState("");
  
  const loadCategories = async () => {
    setStatus(true);
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

      if (!response.ok) {
        throw new Error("Request failed: " + response.status);
      }
      const data = await response.json();
      setCategories(data.categories);
      setStatus(false);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Tanzim's Canteen</h1>

      <button onClick={loadCategories} className="btn btn-primary mb-3">
        View Categories
      </button>
      
      <ul className="list-group col-md-4 mx-auto text-start">
        {status?(<h2>Loading...</h2>):(categories.map((item) => (
          <li key={item.idCategory} className="list-group-item">
            {item.strCategory}
          </li>
        )))}
      </ul>
    </div>
  );
}

export default MealDBApp;