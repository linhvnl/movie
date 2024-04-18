// import React/Hook/...
import React from "react";

// import Component
import MovieTrailer from "./MovieTrailer";

// function Component
function MovieDetail(props) {
  // return
  return (
    <div className="container-fluid mt-5" style={{}}>
      <div className="row row-cols-2">
        {/* nội dung movie */}
        <div className="col text-light pt-3 px-5">
          <h1 className="fw-bolder border-bottom pb-4 mb-3">{props.title}</h1>
          <p className="fw-bolder fs-5 mb-0">
            Release Date: {props.release_date}
          </p>
          <p className="fw-bolder fs-5 mb-2">Vote: {props.vote_average} / 10</p>
          <p>{props.overview}</p>
        </div>

        {/* video trailer */}
        <div className="col">
          <MovieTrailer
            id={props.id}
            title={props.title}
            srcBackdrop={props.srcBackdrop}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
