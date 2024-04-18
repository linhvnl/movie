// import React/Hook/...
import React, { useEffect, useState } from "react";

// import Custom Hook xử lý yêu cầu Search dữ liệu movie
import useHttpMovie from "../../hooks/use-http-movie";

// import Component
import MovieDetail from "../common/MovieDetail";

// function Component search và hiển thị kết quả movie
const ResultList = (props) => {
  //_______________________________
  // state để lấy movies sau fetch
  const [results, setResults] = useState(null);
  // state để gọi hiển thị 1 movie chi tiết
  const [movieDetailData, setMovieDetailData] = useState({});

  //_______________________________
  // dùng Custom Hook xử lý Request
  const { originImage, fetchMovies, urlSearch } = useHttpMovie();

  //_______________________________
  // fetch movies khi có từ khóa Search
  useEffect(() => {
    if (!props.searchKey) return;
    fetchMovies(urlSearch(props.searchKey), setResults);
  }, [fetchMovies, urlSearch, props.searchKey]);

  //_______________________________
  // function để lấy dữ liệu để xem 1 movie chi tiết
  // keyType là tên thuộc tính của loại phim (ví dụ fetchTrending, ..)
  const movieDetailHandler = function (movieData, srcBackdrop) {
    setMovieDetailData((prevMovie) => {
      if (prevMovie.id === movieData.id) return {};
      return {
        id: movieData.id,
        title: movieData.title || movieData.name,
        release_date: movieData.release_date || movieData.first_air_date,
        vote_average: movieData.vote_average,
        overview: movieData.overview,
        srcBackdrop,
      };
    });
  };

  //_______________________________
  // nội dung movies hiển thị sau khi fetch được dữ liệu Search
  let content = null;
  if (results) {
    // nội dung hiển thị
    content = results.map((movie) => {
      return (
        <div key={movie.id} className="col-auto">
          <img
            alt={movie.title}
            src={originImage + movie.poster_path}
            style={{ width: "173px" }}
            className="movie-item"
            onClick={() =>
              movieDetailHandler(movie, originImage + movie.backdrop_path)
            }
          ></img>
        </div>
      );
    });
  }

  //_______________________________
  return (
    <div className="container-fluid pb-5">
      {/* tiêu đề*/}
      {content && <h2 className="text-light mb-3">Search Result</h2>}

      {/* kết quả */}
      {content && <div className="row g-4 px-4">{content}</div>}

      {/* chi tiết của 1 movie */}
      {movieDetailData.id && <MovieDetail className="" {...movieDetailData} />}
    </div>
  );
};

export default ResultList;
