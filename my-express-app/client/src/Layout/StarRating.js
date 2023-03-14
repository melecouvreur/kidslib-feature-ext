import { React} from "react";
import Star from "./Star";

function StarRating({ rating, setRating }) {

//StarRating component defines when & how star = filled
//map assigns value between 1-5 to each star. a star gets assigned value when clicked
//rating decided how many stars get filled i.e. if rating is >= (1 to 5) i.e. star gets clicked
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
