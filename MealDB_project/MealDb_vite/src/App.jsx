import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryMeals from './pages/CategoryMeals';
import MealDetails from './pages/MealDetails'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryName" element={<CategoryMeals />} />
      <Route path="/meal/:mealId" element={<MealDetails />} />
    </Routes>
  );
}

export default App;