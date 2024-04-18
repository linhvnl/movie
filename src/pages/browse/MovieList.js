// import React/Hook/...
import React, { useState } from "react";

// import custom hook
import useHttpMovie from "../../hooks/use-http-movie";

// import Component
import MovieListOfType from "./MovieListOfType";
import MovieDetail from "../common/MovieDetail";

// function Component list tổng của các list theo type
function MovieList() {
  //________________________
  // state để gọi hiển thị 1 movie chi tiết
  const [movieDetailData, setMovieDetailData] = useState({});

  //________________________
  // dùng Custom Hook xử lý Request
  // các type endPoints: fetchTrending - fetchNetflixOriginals - fetchTopRated - fetchActionMovies - fetchComedyMovies - fetchHorrorMovies - fetchRomanceMovies - fetchDocumentaries - fetchSearch
  const { endPoints, originImage, fetchMovies } = useHttpMovie();

  //________________________
  // function để lấy dữ liệu để xem 1 movie chi tiết
  // keyType là tên thuộc tính của loại phim (ví dụ fetchTrending, ..)
  const movieDetailHandler = function (key, movieData, srcBackdrop) {
    setMovieDetailData((prevMovie) => {
      if (prevMovie.id === movieData.id) return {};
      return {
        keyType: key,
        id: movieData.id,
        title: movieData.title || movieData.name,
        release_date: movieData.release_date || movieData.first_air_date,
        vote_average: movieData.vote_average,
        overview: movieData.overview,
        srcBackdrop,
      };
    });
  };

  //________________________
  // tạo list các movies theo từng type
  const content = [];
  for (const key in endPoints) {
    const item = (
      <div key={key} className="pt-3 mb-5">
        <MovieListOfType
          keyType={key}
          type={key === "fetchNetflixOriginals" ? "poster" : "backdrop"}
          endPoint={endPoints[key]}
          originImage={originImage}
          fetchMovies={fetchMovies}
          onMovieDetail={movieDetailHandler.bind(null, key)}
        />

        {/* hiển thị movie chi tiết */}
        {movieDetailData.keyType === key && (
          <MovieDetail {...movieDetailData} />
        )}
      </div>
    );
    content.push(item);
  }

  //________________________
  // return
  return <div className="px-3 pt-4 pb-5">{content}</div>;
}

export default MovieList;
