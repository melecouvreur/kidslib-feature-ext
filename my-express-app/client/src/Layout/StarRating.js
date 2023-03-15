import { React} from "react";
import Star from "./Star";

function StarRating({ rating, setRating }) {

//StarRating component defines when & how star gets filled
//map assigns value between 1-5 to each star.
//Each star gets assigned rating equal to its value when clicked
//Stars get filled if rating is >= (1 to 5) i.e. star gets clicked
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={rating >= value}
          onClick={() => changeRating(value)}
        />
      ))}
    </span>
  );
}
export default StarRating;
