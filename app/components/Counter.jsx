import { useState } from "react";
import Button from "./Button";

const Counter = ({ count, add, subtract }) => {
  // const [count, setCount] = useState(initialValue);

  // const subtract = () => {
  //   setCount(Math.max(initialValue, count - step));
  // };

  // const add = () => {
  //   setCount(count + step);
  // };

  return (
    <div className="flex counter">
      <Button click={subtract} className="bg-gray-100">
        -
      </Button>
      {count}
      <Button click={add} className="bg-gray-100">
        +
      </Button>
    </div>
  );
};

export default Counter;
