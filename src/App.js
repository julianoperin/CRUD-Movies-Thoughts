import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");

  const submitReview = () => {
    axios
      .post("http://localhost:3001/api/insert", {
        movieName: movieName,
        movieReview: review,
      })
      .then(() => {
        alert("Successfully inserted!");
      });

    setMovieName("");
    setReview("");
  };

  console.log(movieName);
  console.log(review);

  return (
    <div className="App">
      <h1>Crud App</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
}

export default App;
