import React from "react";
import Search from "../Components/Search";
import MyLibraryWidget from "../Components/MyLibraryWidget";

function Home() {
  return (
    <div className="App">
      <h1>My Library App</h1>
      <MyLibraryWidget />
      <Search />
    </div>
  )
}
export default Home;
