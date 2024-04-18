// import React/Hook/...
import { useCallback } from "react";

// function custom hook
// => tạo object chứa endPoints đầy đủ và các phương thức để fetch API từ THE MOVIE DATABASE API
const useHttpMovie = () => {
  //________________________________
  // mẫu url "https://api.themoviedb.org/3/movie/550?api_key=<Token>";
  // "https://api.themoviedb.org/3/trending/all/week?api_key=4dc9bbad01754faa1d43c0c6900a45d1&language=en-US";
  const origin = "https://api.themoviedb.org/3";
  const API_KEY = "4dc9bbad01754faa1d43c0c6900a45d1";
  const originImage = "https://image.tmdb.org/t/p/w500";

  //________________________________
  // các trường cần lấy dữ liệu về movies theo các type
  const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  //________________________________
  // tạo object chứa endPoints đầy đủ về movies theo các type
  let endPoints = {};
  for (const key in requests) {
    const endPoint = origin + requests[key];
    endPoints[key] = endPoint;
  }

  //________________________________
  // phương thức tạo URL để fetch chi tiết video của 1 movie
  // tìm video https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<api_key>
  const urlMovieDetail = useCallback(function (id) {
    const url = origin + "/movie/" + id + "/videos?api_key=" + API_KEY;
    return url;
  }, []);

  //________________________________
  // phương thức tạo URL để fetch movies theo từ khóa Search
  // https://api.themoviedb.org/3/search/movie?api_key=4dc9bbad01754faa1d43c0c6900a45d1&language=en-US&query=batman
  const urlSearch = useCallback(function (query) {
    const url =
      origin +
      "/search/movie?api_key=" +
      API_KEY +
      "&language=en-US&query=" +
      query;
    return url;
  }, []);

  //________________________________
  // phương thức để fetch tìm nạp dữ liệu movie
  const fetchMovies = useCallback(async function (url, getData) {
    // tìm nạp movies
    const response = await fetch(url);
    const data = await response.json();

    // lấy dữ liệu là trường data.results là 1 array chứa nhiều object (1 movie)
    getData(data.results);
  }, []);

  //________________________________
  // return về 1 object
  return { endPoints, originImage, fetchMovies, urlMovieDetail, urlSearch };
};

export default useHttpMovie;
