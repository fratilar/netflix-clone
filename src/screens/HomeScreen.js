import React from "react";
import requests from "../Requests";
import "./HomeScreen.css";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Row from "../components/Row";

function HomeScreen() {
   return (
      <div className="homescreen">
         <Nav />
         <Banner />
         <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true} />
         <Row title="Trending" fetchURL={requests.fetchTrending} />
         <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
         <Row title="Action" fetchURL={requests.fetchActionMovies} />
         <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
         <Row title="Animation" fetchURL={requests.fetchAnimation} />
         <Row title="Horror" fetchURL={requests.fetchHorrorMovies} />
         <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
         <Row title="TV Series" fetchURL={requests.fetchTV} />
      </div>
   );
}

export default HomeScreen;
