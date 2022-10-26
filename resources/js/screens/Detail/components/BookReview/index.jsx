
function BookReview({ reviews }) {
  return (
    <div className="book-review">
      <h2 className="book-review__title">Reviews</h2>
      <div className="book-review__content">
        <p className="book-review__text">{reviews}</p>
      </div>
    </div>
  );
}

export default BookReview;