import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../Requests";
import "../styles/Banner.css";
import { PlayIcon, StarIcon } from "@heroicons/react/solid";

function Banner() {
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      async function getMovie() {
         const request = await axios.get(requests.fetchNetflixOriginals);
         setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
         return request;
      }
      getMovie();
   }, []);

   const truncate = (string, number) => {
      if (string.length > number) {
         return string.slice(0, number) + " ...";
      }
      return string;
   };

   return (
      <header
         className="banner"
         style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
         }}
      >
         <div className="banner_content">
            <p className="upper">today's featured tv series</p>
            <h1 className="banner_title">
               {movie?.title || movie?.name || movie?.original_name}
               <span>{"(" + `${movie?.first_air_date}`.slice(0, 4) + ")"}</span>
            </h1>
            <h1 className="banner-description">{truncate(`${movie?.overview}`, 150)}</h1>
            <div className="vote-content">
               <StarIcon className="star_icon" />
               <StarIcon className="star_icon" />
               <StarIcon className="star_icon" />
               <StarIcon className="star_icon" />
               <StarIcon className="star_icon" />
               <p>{movie?.vote_average}</p>
               <span className="small">{`(${movie?.vote_count})`}</span>
            </div>
            <button className="banner_button">
               <PlayIcon className="play_icon" />
               Play trailer
            </button>
         </div>
         <div className="banner--fadeBottom" />
      </header>
   );
}

export default Banner;
