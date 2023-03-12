import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components/mylibrary.css";
import Navbar from "../Components/Navbar";

function MyLibraryView() {
  const [books, setBooks] = useState([]); //All books to be rendered
  const [loading, setLoading] = useState(false); //For loading spinner
  const [success, setSuccess] = useState(false); //For success message upon deletion

  useEffect(() => {
    fetchBooks(); //Get all book
    // console.log(books);
  }, []);

  const searchMyBooksById = async (bookId) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: bookId }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/searchById`, options);
      let data = await results.json();
      // console.log(data); //individual objects with book details

      setBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?
      // console.log(books);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // This function gets books FROM DATABASE and loops through them, using the bookId to search the GOOGLE BOOKS API and return all book data
  const fetchBooks = async () => {
    setLoading(true);
    try { 
      //Get books from database
      let results = await fetch("/mylibrary");
      let data = await results.json();
      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].bookId); //Seems to be accessing the bookId here
        await searchMyBooksById(data[i].bookId); //Use search function to look up book details using bookId
      }
      // console.log(books);
      setLoading(false);
      return books;
    } catch (err) {
      console.log(err);
    }
  };

  //FUNCTION TO GET DATABASE BOOKS BASED ON BOOKID FOR DELETE FUNCTION
  const fetchDBBooks = async (bookId) => {
    setLoading(true);
    try {
      console.log(bookId);
      //Get all database books
      let results = await fetch(`/mylibrary`);
      let data = await results.json();

      //Loop through books, look for bookId
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToDelete = data[i].id;
          // console.log(bookToDelete);
          return bookToDelete; //id of book to delete to be used in delete function below
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE FUNCTION -- USES ID RETURNED IN PREVIOUS FUNCTION TO DELETE BOOK FROM DATABASE
  const deleteBook = async (e) => {
    setLoading(true);
    let bookToDelete = await fetchDBBooks(e); //id of book to delete
    // console.log(bookToDelete);
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`/mylibrary/${bookToDelete}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
      setSuccess(true); //For success message upon delete
      // setTimeout(function () {
      //   setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      // }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
        {/*<Navbar/>*/}
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-4">
            <h2>My Library</h2>
          </div>

          <div className="offset-md-6 offset-sm-5 offset-5 col-2">
          
          </div>
        </div>
        {loading ? (
          <div className="spinner-border text-warning mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div id="myLibraryArea" className="row mt-2">
            {success ? (
              <div className="rounded bg-info mb-4">
                <h3>A book was deleted from your library!</h3>
              </div>
            ) : null}
            {books.map((book) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3 mt-5"
                id="book"
                key={book.id + book.volumeInfo.title}
              >
                <h5>{book.volumeInfo.title}</h5>
                <p>
                  {book.volumeInfo?.authors?.[0]} {book.volumeInfo.authors?.[1]}{" "}
                </p>
                <img src={book.volumeInfo.imageLinks?.thumbnail} />
                <div className="row mt-4">
                  <Link to={`${book.id}`} >
                    <button id="seeMore" className="btn btn-primary col">
                      See More
                    </button>
                  </Link>
                  <div id="deleteIcon" className="col" key={book.id}>
                    <button
                      className="rounded btn btn-danger mt-2"
                      onClick={(e) => {
                        deleteBook(book.id);
                      }}
                    >
                      {" "}
                      Delete Book{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLibraryView;
