import { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import CartSummary from './CartSummary';
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortAsc, setSortAsc] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

// Fetch categories on component mount (only once)
useEffect(() => {
  fetch("https://localhost:7067/books/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) => console.error(err));
}, []);

// Fetch books when categories, page, or pageSize changes
useEffect(() => {
  const params = new URLSearchParams();
  params.append('pageNumber', page);
  params.append('pageSize', pageSize);
  
  selectedCategories.forEach(category => {
    params.append('categories[]', category);
  });

  fetch(`https://localhost:7067/books?${params}`)
    .then((res) => res.json())
    .then((data) => {
      setBooks(data.data);
      setTotalBooks(data.totalBooks);
    })
    .catch((err) => console.error(err));
}, [selectedCategories, page, pageSize]);

  // Sort the books that came from API
  const sortedBooks = [...books].sort((a, b) => {
    if (sortAsc) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const handleCategoryChange = (categoryName, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryName]);
      setPage(1);
    } else {
      setSelectedCategories(
        selectedCategories.filter(c => c !== categoryName)
      );
      setPage(1);
    }
  };

return (
  <div className="container-fluid">
    <h1 className="mb-4">Bookstore</h1>

    <div className="row">
      {/* Left Column - Filter Sidebar */}
      <div className="col-lg-3 mb-4">
        <div className="sticky-top">
          <CategoryFilter 
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Right Column - Books and Cart Summary */}
      <div className="col-lg-9">
        {/* Cart Summary at Top */}
        <CartSummary />

        {/* SORT BUTTON */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSortAsc(!sortAsc)}
        >
          Sort by Title ({sortAsc ? "A → Z" : "Z → A"})
        </button>

        {/* Page Size Selector */}
        <h3>Books to display: </h3>
        <select
          className="form-select mb-3"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        {/* Book List */}
        <div className="row">
          {sortedBooks.map((b) => (
            <div key={b.bookID} className="col-md-6 col-lg-4 mb-4">
              <BookCard book={b} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex gap-2 justify-content-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="align-self-center">Page {page}</span>

          <button
            className="btn btn-primary"
            onClick={() => setPage(page + 1)}
            disabled={(page - 1) * pageSize + pageSize >= totalBooks}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default BookList;