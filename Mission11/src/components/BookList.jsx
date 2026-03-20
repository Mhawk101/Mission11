import { useEffect, useState } from "react";

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortAsc, setSortAsc] = useState(true); 

  useEffect(() => {
    fetch("https://localhost:7067/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ SORT BY TITLE (based on toggle)
  const sortedBooks = [...books].sort((a, b) => {
    if (sortAsc) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // PAGINATION
  const start = (page - 1) * pageSize;
  const paginatedBooks = sortedBooks.slice(start, start + pageSize);

  return (
    <div className="container">
      <h1>Bookstore</h1>

      {/* SORT BUTTON */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setSortAsc(!sortAsc)}
      >
        Sort by Title ({sortAsc ? "A → Z" : "Z → A"})
      </button>

      {/* Page Size Selector */}
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
      {paginatedBooks.map((b) => (
        <div key={b.bookId} className="card p-3 mb-3">
          <h3>{b.title}</h3>
          <p><strong>Author:</strong> {b.author}</p>
          <p><strong>Publisher:</strong> {b.publisher}</p>
          <p><strong>ISBN:</strong> {b.isbn}</p>
          <p><strong>Category:</strong> {b.category}</p>
          <p><strong>Pages:</strong> {b.pageCount}</p>
          <p><strong>Price:</strong> ${b.price}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={start + pageSize >= sortedBooks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;