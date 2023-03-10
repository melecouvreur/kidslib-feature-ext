import {React, useEffect, useState, useNavigate} from "react";
import { Outlet } from "react-router-dom";

function PrivateRoute() {

const [error, setError] = useState("");
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
            // error - had to removed users/privtate and replace with /private but now routes not protected?
          const result = await fetch("/private", options);
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
        (<h3 className="d-flex p-4 justify-content-center pt-5"> {message} </h3>)
        :  <Outlet/> } 
        </div>
    )
}

export default PrivateRoute;
