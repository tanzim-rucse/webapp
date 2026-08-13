import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Something went wrong:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary ">CSE Canteen</h1>

      <button onClick={fetchCategories} className="btn btn-success mb-4">
        Load Categories
      </button>

      {loading && (<p>Loading.....</p>)}

      <div className="d-flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${cat.strCategory}`}
            className="btn btn-primary"
          >
            {cat.strCategory}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;