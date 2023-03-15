import {React} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Components/PrivateRoute";


function App() {

//NB - Paths of Home, MyLibraryView, BookDetail pages are "/private", "/private/myLibrary", "/private/myLibrary/:id" respc
//but because nested, remove "/private". 
//Idem for NavLink paths on NavBar component
  return (
   <>
  
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/private" element={<PrivateRoute/> }>
          <Route path="" element={<Home/>}/>
          <Route path="myLibrary" element={<MyLibraryView />}  />
          <Route path="myLibrary/:id" element={<BookDetailView />}/>
      </Route>

      </Routes>

    </BrowserRouter>
 
    </>
  );
}

export default App;
