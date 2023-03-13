import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "../Components/StarRating";
import "./detailView.css";

function BookDetailView() {
  const [book, setBook] = useState([]); //Book info from Google
  const [bookData, setBookData] = useState([]); //Book info from database
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this bookId is also used in the URL for this page

  useEffect(() => {
    searchMyBooksById(ID);
    fetchDBBooks(ID);
    // console.log(book);
    // console.log(params);
  }, []);

  const searchMyBooksById = async (ID) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: ID }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/searchById`, options);
      let data = await results.json();
      // console.log(data); //returning full object of book data from Google

      setBook(data);

      console.log(book);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDBBooks = async (bookId) => {
    // console.log(bookId); //bookId
    setLoading(true);
    try {
      //Get all database books
      let results = await fetch(`/mylibrary`);
      let data = await results.json();

      //Loop through books, look for bookId
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToUpdate = data[i].id;
          let bookData = data[i]; //individual book data from database
          setBookData(bookData); //individual book data from database -- used in rendering review
          console.log(bookData);

          return bookToUpdate; //id of book to update for PUT function below
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReview = async () => {
    let bookToUpdate = await fetchDBBooks(book.id);
    // console.log(bookToUpdate);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review, rating: rating }),
    };
    try {
      let results = await fetch(`/myLibrary/review/${bookToUpdate}`, options);
      let data = await results.json();
      console.log(data);

      setLoading(false);
      setSuccess(true); //To show success message
      setTimeout(function () {
        window.location.reload(); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  
  const updateRating = async () => {
    let bookToUpdate = await fetchDBBooks(book.id);
    // console.log(bookToUpdate);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating }),
    };
    try {
      let results = await fetch(`/myLibrary/rating/${bookToUpdate}`, options);
      let data = await results.json();
      console.log(data);

      setLoading(false);
      setSuccess(true); //To show success message
      setTimeout(function () {
        window.location.reload(); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  //For review input field
  //Having trouble rendering review conditionally below because this updates immediately.
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  //For rating input field
  const handleRatingChange = (e) => {
    setRating(e.target.value)
  };


  //For review input field
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    updateReview(review);
    //setReview("");
    console.log(review);
  };

  
   //For rating input field
   const handleRatingSubmit = (e) => {
    e.preventDefault();
    updateRating(rating)
    console.log(rating) 
  };

function log(value) {
    console.log(value);
    setRating(value)
    //updateRating(value)
  }


  return (
    <div className="container">
      <div id="nav" className="col mt-4">
        {/* The styling for the buttons here could be better...kind of weird at different screen sizes */}
      </div>

      <div id="bookDetails" className="col w-75 mt-6 mb-6">
        {success ? (
          <div id="success" className="rounded bg-info mb-4">
            <h3>Your review has been updated!</h3>
          </div>
        ) : (
          <div></div>
        )}
        <div className="row md-9">
          <div className="col">
            <img
              className="rounded mx-auto d-block mb-3"
              src={book.volumeInfo?.imageLinks?.thumbnail}
            />
            <h5>{book?.volumeInfo?.title}</h5>
            <h6>
              {book.volumeInfo?.authors?.[0]} {book.volumeInfo?.authors?.[1]}{" "}
            </h6>
          </div>
          <div className="col-md-8">
            <p>{book?.volumeInfo?.description}</p>
          </div>

          {bookData.review ? (
            <div className="row mt-4">
              <div className="col">
                <h5>{bookData.review}</h5>
              </div>
            </div>
          ) : null}

        {bookData.rating ? (
            <div className="row mt-4">
              <div className="col">
                <h5>{bookData.rating}</h5>
              </div>
            </div>
          ) : null}

          <StarRating rating={bookData.rating} />
        </div>
      </div>

      <div id="ratings" className="offset-md-3 col-md-6 mb-3 mt-4">
        <form onSubmit={handleReviewSubmit}>
          <label htmlFor="review" className="form-label p-2">
            {bookData.review ? (
              <h3>Update your review here.</h3>
            ) : (
              <h3>What did you think about this book?</h3>
            )}
          </label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Write your review here"
            value={review}
            onChange={handleReviewChange}
          ></input>
          </form>

           <form onSubmit={handleRatingSubmit}>
        <label htmlFor="review" className="form-label pt-4 p-2">
            {bookData.rating ? (
              <h3>Rate your book here.</h3>
            ) : (
              <h3>What did you think about this book?</h3>
            )}
          </label>
          <input
            type="number"
            className="form-control p-2"
            placeholder="Write your review here"
            value={rating}
            onChange={handleRatingChange}
          ></input>
          
         </form>
         <div> <StarRating onChange={log} rating={rating} setRating={setRating}/> </div>
      </div>

    </div>
  );
}
export default BookDetailView;
