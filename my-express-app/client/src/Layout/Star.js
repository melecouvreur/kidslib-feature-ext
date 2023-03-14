import { React} from "react";
import { FaStar } from "react-icons/fa";

function Star({ filled, onClick }) {

//Star component imports React star icon. 
//passes as parameters styling of filled star &  event handler.
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