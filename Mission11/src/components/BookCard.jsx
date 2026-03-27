//This file creates a book card component with teh attributes of all books and book actions
//that is displayed for each book on the book list page. 

import { useState } from 'react';
import { useCart } from '../context/CartContext';

//creates the book card function
function BookCard({ book }) {
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const { addToCart } = useCart();

  //adds to car the book id, title, price, and quanity with a default quantity of 1
  const handleAddToCart = () => {
    addToCart({
      bookId: book.bookID,
      title: book.title,
      price: book.price,
      quantity: quantity
    });
    setQuantity(1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  //displays all of the book informations with the book title being displayed the largest
  return (
    <div className="card p-3 mb-3">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Pages:</strong> {book.pageCount}</p>
      <p><strong>Price:</strong> ${book.price}</p>

      {/* bonus bootstrap functionality that shows the added to cart alert within the card */}
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Added "{book.title}" to cart
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      
      <div className="mb-3">
        <label htmlFor={`qty-${book.bookID}`} className="form-label">Quantity:</label>
        <input
          id={`qty-${book.bookID}`}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="form-control"
          style={{ width: '100px' }}
        />
      </div>

      <button 
        className="btn btn-success"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default BookCard;