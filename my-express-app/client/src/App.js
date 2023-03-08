import {React, useState} from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import DashBoard from "./Pages/DashBoard";
import Layout from "./Components/Layout";

function App() {

  const [isLoggenIn, setIsLoggedIn] = useState(false)

  return (
   <>
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        <Route path="/private" element={<Home />}/>
        <Route path="/myLibrary" element={<MyLibraryView />}  />
        <Route path="/myLibrary/:id" element={<BookDetailView />}/>
      </Routes>
    </BrowserRouter>
 
    </>
  );
}

export default App;
