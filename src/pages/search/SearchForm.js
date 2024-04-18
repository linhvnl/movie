// import React/Hook/...
import React from "react";

// import Custom Hook xử lý input
import useInput from "../../hooks/use-input";

//___________________________
// logic xác thực là hợp lệ: value không được rỗng
const isNotEmpty = (value) => value.trim() !== "";

//___________________________
// function Component
const SearchForm = (props) => {
  // dùng Custom Hook cho mỗi đầu vào
  const { input: inputSearch } = useInput(isNotEmpty);

  // hàm xử lý Submit cho form
  const submitHandler = (event) => {
    event.preventDefault();

    // submit là đã "touch"
    inputSearch.inputBlurHandler();

    // input không hợp lệ thì return
    if (!inputSearch.isValidValue) return;

    ///////////////////////////////
    // logic muốn thực hiện khi form hợp lệ
    props.onGetSearchKey(inputSearch.enteredValue);

    // KHÔNG đặt lại giá trị ban đầu (reset) các input, SẼ NHẤN NÚT RESET RIÊNG
    // inputSearch.resetInput();
  };

  //___________________________
  // return
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center pt-5">
        <form
          className="bg-white mt-4"
          style={{ width: "800px" }}
          onSubmit={submitHandler}
        >
          <div className="">
            <div className="d-flex justify-content-between align-items-center border-bottom border-primary border-3 py-2">
              <input
                className="form-control w-100 border-0 px-5 py-3 fs-4"
                type="text"
                onChange={inputSearch.inputChangeHandler}
                onBlur={inputSearch.inputBlurHandler}
                value={inputSearch.enteredValue}
              />
              <svg
                className="svg-inline--fa fa-search fa-w-16 mx-4"
                fill="#ccc"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="30px"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </div>
            {inputSearch.hasError && (
              <p className="text-danger fs-5 px-3 mt-2 mb-0">
                Search must not be empty.
              </p>
            )}
          </div>

          {/* button */}
          <div className="d-flex justify-content-end py-5">
            <button
              type="button"
              className="btn fw-bold fs-5 px-4"
              onClick={inputSearch.resetInput}
            >
              RESET
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-0 fw-bold fs-5 px-4 ms-1 me-5"
              disabled={!inputSearch.isValidValue}
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
