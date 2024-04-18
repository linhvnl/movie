// import React/Hook/...
import React, { useEffect, useState } from "react";

// import custom hook
import useHttpMovie from "../../hooks/use-http-movie";

// function Component
function Banner() {
  // state để lấy movies sau fetch
  const [bannerMovie, setBannerMovie] = useState([]);

  // dùng endPoints
  const { endPoints, originImage, fetchMovies } = useHttpMovie();
  const bannerFetch = endPoints.fetchNetflixOriginals;

  // fetch movies 1 lần đầu tiên khi tải trang
  useEffect(() => {
    const chooseBannerMovie = function (data) {
      // chọn movie hiển thị ngẫu nhiên cho Banner
      const randomMovie = data[Math.floor(Math.random() * data.length)];
      setBannerMovie(randomMovie);
    };

    fetchMovies(bannerFetch, chooseBannerMovie);
  }, [bannerFetch, fetchMovies]);

  // return
  return (
    <div
      className="container-fluid px-4"
      style={{
        height: "400px",
        backgroundImage: `url(${originImage + bannerMovie.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex flex-column justify-content-center text-light w-25 h-100 pt-5">
        <h1
          className="fw-bolder mt-5"
          style={{ textShadow: "1px 1px 4px black" }}
        >
          {bannerMovie.name}
        </h1>
        <div className="mt-4 mb-2">
          <button type="button" className="btn btn-secondary px-4 py-0 mx-2">
            Play
          </button>
          <button type="button" className="btn btn-secondary px-4 py-0 mx-2">
            My List
          </button>
        </div>
        <p style={{ textShadow: "1px 1px 4px black" }}>
          {String(bannerMovie.overview).slice(0, 150)}
        </p>
      </div>
    </div>
  );
}

export default Banner;
