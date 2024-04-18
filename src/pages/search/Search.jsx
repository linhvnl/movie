// import React/Hook/...
import React, { useState } from "react";

// import Component
import NavBar from "../common/NavBar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";

// function Component
const Search = () => {
  // từ khóa tìm kiếm
  const [searchKey, setSearchKey] = useState("");

  // lấy từ khóa tìm kiếm (để fetch dữ liệu sau đó)
  const getSearchKeyHandler = function (key) {
    setSearchKey(key);
  };

  // return
  return (
    <div className="bg-dark min-vh-100 pb-5">
      <NavBar />
      <SearchForm onGetSearchKey={getSearchKeyHandler} />
      <ResultList searchKey={searchKey} />
    </div>
  );
};

export default Search;
