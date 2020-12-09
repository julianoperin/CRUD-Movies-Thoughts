import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      const movieList = response.data;
      setMovieList(movieList);
    });
  }, []);

  //! SUBMIT REVIEW
  const submitReview = () => {
    axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([...movieList, { movieName: movieName, movieReview: review }]);
  };

  //! DELETE
  const deleteReview = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  //! UPDATE
  const updateReview = (movie) => {
    axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>Crud App</h1>
      <div className="form ">
        <label>Movie Name</label>
        <input
          className="form-input"
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <input
          className="form-input"
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="btn" onClick={submitReview}>
          Submit
        </button>
      </div>
      {movieList.map((movie) => {
        return (
          <div className="card">
            <h3>{movie.movieName} </h3>
            <p>{movie.movieReview}</p>
            {/*DELETE */}
            <button
              onClick={() => {
                deleteReview(movie.movieName);
              }}
              className="btn"
            >
              Delete
            </button>
            <input
              type="text"
              id="uptadeInput"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            {/*UPDATE */}
            <button
              onClick={() => {
                updateReview(movie.movieName);
              }}
              className="btn"
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
