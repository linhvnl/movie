// import React/Hook/...
import React, { Fragment, useEffect, useState } from "react";
import YouTube from "react-youtube";

// import custom hook
import useHttpMovie from "../../hooks/use-http-movie";

// function Component
function MovieTrailer(props) {
  //_____________________________
  // state để lấy trailer movie sau fetch
  const [trailerKey, setTrailerKey] = useState("");

  // dùng hàm tạo url và fetch dữ liệu
  const { fetchMovies, urlMovieDetail } = useHttpMovie();

  //_____________________________
  // fetch trailer 1 lần đầu tiên khi render component
  useEffect(() => {
    const applyData = function (data) {
      // check data dữ liệu có tồn tại không
      if (!data || !data.length) return;

      // xử lý data fetch được
      let firstTrailerKey = "";
      let firstTeaserKey = "";
      for (const item of data) {
        // check các trường dữ liệu để tìm video phù hợp đầu tiên
        // site = YouTube và type = "Trailer" (ưu tiên hơn) /"Teaser"
        if (firstTrailerKey) break;
        if (item.site !== "YouTube") continue;
        if (item.type === "Trailer") {
          firstTrailerKey = item.key;
          continue;
        }
        if (item.type === "Teaser") firstTeaserKey = item.key;
      }

      // lưu dữ liệu vào biến state
      setTrailerKey(firstTrailerKey || firstTeaserKey);
    };

    fetchMovies(urlMovieDetail(props.id), applyData);
  }, [fetchMovies, urlMovieDetail, props.id]);

  //_____________________________
  // return về video trailer
  return (
    <Fragment>
      {trailerKey ? (
        <YouTube
          videoId={trailerKey}
          opts={{
            height: "400",
            width: "100%",
            playerVars: {
              autoplay: 0,
            },
          }}
        />
      ) : (
        <img
          alt={props.title}
          src={props.srcBackdrop}
          style={{ height: "400px" }}
        ></img>
      )}
    </Fragment>
  );
}

export default MovieTrailer;
