import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detailView.css";

function BookDetailView() {
  const [book, setBook] = useState([]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const ID = params.id;

  useEffect(() => {
    searchMyBooksById(ID);
    console.log(book);
    // console.log(params);
  }, []);

  const searchMyBooksById = async (ID) => {
    // let ID = params.id;
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
      console.log(data); //returning full object of book data from Google

      setBook(data);

      console.log(book);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Not working yet.
  const updateReview = async (e) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: e }),
    };
    try {
      let results = await fetch(`/mylibrary/${book.id}`, options);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Code to update review & rating in DB here - Use PUT router function
    updateReview(e);
  };

  return (
    <div className="container">
      <div id="bookDetails" className="col mt-6">
        <img src={book.volumeInfo?.imageLinks?.thumbnail} />
        <h5>{book?.volumeInfo?.title}</h5>
        <p>
          {book.volumeInfo?.authors[0]} {book.volumeInfo?.authors[1]}{" "}
        </p>
        <p>{book?.volumeInfo?.description}</p>
      </div>
      <div id="ratings" className="offset-md-3 col-md-6 mb-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="review" className="form-label">
            <h3>What did you think about this book?</h3>
          </label>
          <textarea
            type="textarea"
            className="form-control"
            placeholder="Write your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </form>
      </div>
    </div>
  );
}
export default BookDetailView;
