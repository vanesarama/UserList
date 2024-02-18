import { useState } from "react";

const Input = ({ onChangeCallback }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search Username"
      className="input-style"
    />
  );
};

export default Input;
