import { React} from "react";
import { FaStar } from "react-icons/fa";

function Star({ filled, onClick }) {
  return (
    <>
    <FaStar 
     color={filled ? "orange" : "lightgray"}
     fontSize="40px"
     onClick={onClick}
     />
     </>
  );
}
export default Star;