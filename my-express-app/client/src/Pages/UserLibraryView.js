import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react'; 
import {UserContext}  from '../Components/UserContext'
import "../Components/mylibrary.css";

function UserLibraryView() {
  const [userBooks, setUserBooks] = useState([]); //All books to be rendered for specific user
  const [loading, setLoading] = useState(true); //For loading spinner
  const [success, setSuccess] = useState(false); //For success message upon deletion
  const [message, setMessage] = useState("");

  let {userId} = useContext(UserContext);

  useEffect(() => {
    fetchUserBooks()//Get all book from specific user
    fetchUserBooksbyID()
    console.log(userBooks, userId);
  }, []);

  const searchUserBooksById = async (bookId) => {
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
      console.log(data); //individual objects with book details
      setUserBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?
      console.log(userBooks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
 
   // WORKING
   // This function gets books FROM DATABASE for specific user via users_books juntion table
   // and loops through them, using the bookId to search the GOOGLE BOOKS API and return all book data
   const fetchUserBooks = async () => {
    setLoading(true);
    try { 
      //Get books from database for userId
      let id = userId
      let results = await fetch(`users/userlibrary/${id}`); 
      let data = await results.json();
      let books = data.books
      console.log(books) //returns array of books objects
      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      for (let i = 0; i < books.length; i++) {
        //console.log(books[i].bookId); //Seems to be accessing the bookId here
        await searchUserBooksById(books[i].bookId) ;//Use search function to look up book details using bookId
        console.log(books[i].bookId)
      }
      console.log(userBooks);
      setLoading(false);
      return userBooks;
    } catch (err) {
      console.log(err);
    }
  };
 

   //
  ///Not Done ///
  //


  //FUNCTION TO GET DATABASE BOOKS BASED ON BOOKID FOR DELETE FUNCTION 
  const fetchUserBooksbyID = async (book) => {
    setLoading(true);
    try {
      console.log({book});
      let id = userId
      //Get all database books by user
      let results = await fetch(`users/userlibrary/${id}`);
      let data = await results.json();
      let books = data.books
      console.log(books)
      //Loop through books, look for bookId
      for (let i = 0; i < books.length; i++) {
        console.log(books[i].bookId)
        if (book.id === books[i].bookId) {
          let bookToDelete = books[i].libraryId;
          console.log(bookToDelete);
          return bookToDelete; //id of book to delete to be used in delete function below
        } 
      }
      //setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE FUNCTION -- USES ID RETURNED IN PREVIOUS FUNCTION TO DELETE BOOK FROM DATABASE
  const deleteUserBook = async (e) => {
    //setLoading(true);
    let bookToDelete = await fetchUserBooksbyID(e); //id of book to delete
    console.log(bookToDelete);
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`/mylibrary/${bookToDelete}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
      setSuccess(true); //For success message upon delete
      setTimeout(function () {
      setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
       }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE FUNCTION -- USES ID RETURNED IN PREVIOUS FUNCTION TO DELETE BOOK FROM DATABASE
  const deleteUserBookAlt = async (e) => {
    //setLoading(true);
    let bookToDelete = await fetchUserBooksbyID(e); //id of book to delete
    console.log(bookToDelete);
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookToDelete),
    };
    try {
      let results = await fetch(`users/userlibrary/${userId}`, options);
      let data = await results.json();

      setLoading(false);
      window.location.reload(); //To manually refresh the page & update data -- idk why it wasn't working through the fetch functions
      setSuccess(true); //For success message upon delete
      setTimeout(function () {
      setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
       }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
    
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-4">
            <h2>My Library</h2>
            {userId}
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
            {userBooks.map((book) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3 mt-5"
                id="book"
                
                key={book.bookId + book.volumeInfo.title}
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
                        //deleteUserBook(book);
                        deleteUserBookAlt(book);
                        console.log(book.id)
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

export default UserLibraryView;
