import {React, useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import UserLibraryView from "./Pages/UserLibraryView"; 
//'UserLibraryView' is for testing multi-user functionality.
//Meant to show books stored in books_users junction table for each user via UserId passed via login() function on DashBoard/Auth comp
import PrivateRoute from "./Components/PrivateRoute";
import { UserContext } from "./Components/UserContext"; 
//To pass userId prop across different comp's for multi-user functionality. Not fully working yet.


function App() {

//For multi-user functionality. Not fully working yet! 
//userId gets Updated in DashBoard/Auth comp via login().
//Updated userId is currently being passed up i.e. from Dash/Auth to App, but not back to UserLibraryView comp :(

const [userId, setUserId] = useState(2)
let userObj = {userId, setUserId};

//NB - Paths of Home, MyLibraryView, BookDetail pages are "/private", "/private/myLibrary", "/private/myLibrary/:id" respc
//but because nested, remove "/private". 
//Idem for NavLink paths on NavBar component
  return (
   <>
   
    <BrowserRouter>
     <UserContext.Provider value={userObj}>
     
      <Routes>
      <Route path="/"element={<DashBoard/>} />
      {/*UserLibraryComp is only to test multi-user funct. To check if different libraries are being shown for different users*/}
      <Route path="/userlibrary" element={<UserLibraryView/>}/>
      <Route path="/private" element={<PrivateRoute/> }>
      
          <Route path="" element={<Home/>}/>
          <Route path="myLibrary" element={<MyLibraryView />}  />
          <Route path="myLibrary/:id" element={<BookDetailView />}/>
      </Route>
      </Routes>

      </UserContext.Provider>
    </BrowserRouter>
 
    </>
  );
}

export default App;
