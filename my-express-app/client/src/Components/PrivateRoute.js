import {React, useEffect, useState, useNavigate} from "react";

function PrivateRoute({children}) {

const [error, setError] = useState("");
const [message, setMessage] = useState("");
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
    
          if (!result.ok) 
          console.log(data.error);

          else 
          console.log(data.message);
          return children
    
        } catch (error) {
          console.log(error);
        }
      };

return (
        <>
        </>
    )
}

export default PrivateRoute;
