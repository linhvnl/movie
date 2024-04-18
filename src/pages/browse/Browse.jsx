// import React/Hook/...
import React from "react";

// import Component
import NavBar from "../common/NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList";

// function Component
function Browse() {
  return (
    <div className="bg-dark">
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
