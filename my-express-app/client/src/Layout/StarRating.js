import { React} from "react";
import Star from "./Star";

function StarRating({ rating, setRating }) {

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </span>
  );
}
export default StarRating;
