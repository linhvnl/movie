// import React/Hook/...
import React, { useEffect, useState } from "react";

// function Component cho list movies theo 1 type cụ thể
function MovieListOfType(props) {
  //________________________
  // state để lấy movies sau fetch
  const [movies, setMovies] = useState("");

  // dùng các props truyền vào
  const { keyType, type, endPoint, originImage, fetchMovies, onMovieDetail } =
    props;

  // tên tiêu đề type hiển thị từng loại movie
  const typeTitle = {
    fetchNetflixOriginals: "",
    fetchTrending: "Xu hướng",
    fetchTopRated: "Xếp hạng cao",
    fetchActionMovies: "Hành động",
    fetchComedyMovies: "Hài",
    fetchHorrorMovies: "Kinh dị",
    fetchRomanceMovies: "Lãng mạn",
    fetchDocumentaries: "Tài liệu",
  };

  //________________________
  // fetch movies 1 lần đầu tiên khi tải trang
  useEffect(() => {
    fetchMovies(endPoint, setMovies);
  }, [fetchMovies, endPoint]);

  //________________________
  // nội dung movies hiển thị sau khi fetch được dữ liệu
  let content = null;
  if (movies) {
    // kích thước hình ảnh hiển thị tùy theo Poster/Backdrop
    const style = type === "poster" ? { height: "240px" } : { height: "150px" };

    // nội dung hiển thị
    content = movies.map((movie) => {
      // loại hình hiển thị tùy theo Poster/Backdrop
      const srcImg =
        type === "poster"
          ? originImage + movie.poster_path
          : originImage + movie.backdrop_path;
      return (
        <div key={movie.id} className="p-0 me-3">
          <img
            alt={movie.title}
            src={srcImg}
            style={style}
            className="movie-item"
            onClick={() =>
              onMovieDetail(movie, originImage + movie.backdrop_path)
            }
          ></img>
        </div>
      );
    });
  }

  //________________________
  // return
  return (
    <div className="container-fluid">
      {/* tiêu đề từng type list */}
      {typeTitle[keyType] && (
        <h2 className="text-light mb-3">{typeTitle[keyType]}</h2>
      )}
      <div className="d-flex flex-nowrap overflow-scroll px-2 pb-3 movies-type-scroll">
        {content && content}
      </div>
    </div>
  );
}

export default MovieListOfType;
