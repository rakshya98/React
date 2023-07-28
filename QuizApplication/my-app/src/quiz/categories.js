import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./categories.css"

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api_category.php"
      );
      setCategories(response.data.trivia_categories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Choose a Quiz Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/quiz/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizCategories;
