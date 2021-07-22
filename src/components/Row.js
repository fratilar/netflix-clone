import React, { useEffect, useState } from "react";
import "../styles/Row.css";
import axios from "../axios";

function Row({ title, fetchURL, isLargeRow = false }) {
   const [movies, setMovies] = useState([]);

   const base_url = "https://image.tmdb.org/t/p/original/";

   useEffect(() => {
      async function fetchData() {
         const response = await axios.get(fetchURL);
         setMovies(response.data.results);
         return response;
      }
      fetchData();
   }, [fetchURL]);

   return (
      <div className="row">
         <h1>{title}</h1>
         <div className="row-content">
            {movies.map((movie) => {
               return (
                  ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                     <img
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                     />
                  )
               );
            })}
         </div>
      </div>
   );
}

export default Row;
