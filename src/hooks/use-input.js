import { useState } from "react";

// valueValidateFunc là hàm xác thực cụ thể tùy component dùng Custom Hook này

const useInput = (valueValidateFunc) => {
  // state giá trị đầu vào và state được chạm hay chưa
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // gọi valueValidateFunc và truyền value để xác thực riêng tùy component
  const isValidValue = valueValidateFunc(enteredValue);
  const hasError = !isValidValue && isTouched;

  // khi thay đổi value đầu vào
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // khi đã chạm và rời khỏi đầu vào => blur
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  // đặt lại value "rỗng"/ban đầu chưa chạm
  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // trả lại 1 object input chứa tất cả biến/func
  return {
    input: {
      enteredValue,
      isValidValue,
      hasError,
      inputChangeHandler,
      inputBlurHandler,
      resetInput,
    },
  };
};

export default useInput;
