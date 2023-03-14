import {React, useEffect, useState, useNavigate} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";

function PrivateRoute() {

//const [error, setError] = useState("");
const [message, setMessage] = useState("");
const [isLoggenIn, setIsLoggedIn] = useState(true)
//const navigate = useNavigate();

useEffect(() => {
    requestData();
      },[]);
       
const requestData = async () => {
        let options = {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }; 
        try {
          const result = await fetch("/users/private", options);
          const data = await result.json();
    
          if (!result.ok) {
          console.log(data.error);
          setIsLoggedIn(false)
          setMessage(data.error)
          //navigate("/")
          console.log(isLoggenIn)
        }

          else {
          console.log(data.message);
          setIsLoggedIn(true)
          console.log(isLoggenIn)
        }
    
        } catch (error) {
          console.log(error);
        }
      };

return (
        <div> {!isLoggenIn ? 
        (<h2 className="d-flex p-4 justify-content-center align-self-center pt-5"> {message} </h2>)
        :  (<> <Navbar/> <Outlet/>  </>) } 
        </div>
    )
}

export default PrivateRoute;
