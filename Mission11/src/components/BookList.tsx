import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import CartSummary from './CartSummary';
import BookCard from './BookCard';
import type { Book, BookResponse } from '../types';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  // Fetch categories on component mount (only once)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://localhost:7067/books/categories');
        const data: string[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch books when categories, page, or pageSize changes
  useEffect(() => {
    const fetchBooks = async () => {
      const params = new URLSearchParams();
      params.append('pageNumber', page.toString());
      params.append('pageSize', pageSize.toString());

      selectedCategories.forEach((category) => {
        params.append('categories[]', category);
      });

      try {
        const res = await fetch(`https://localhost:7067/books?${params.toString()}`);
        const data: BookResponse = await res.json();
        setBooks(data.data);
        setTotalBooks(data.totalBooks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [selectedCategories, page, pageSize]);

  // Sort the books that came from API
  const sortedBooks = [...books].sort((a, b) =>
    sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
  );

  const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryName]);
      setPage(1);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryName));
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
            Sort by Title ({sortAsc ? 'A -> Z' : 'Z -> A'})
          </button>

          {/* Page Size Selector */}
          <h3>Books to display: </h3>
          <select
            className="form-select mb-3"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            value={pageSize}
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
              disabled={page * pageSize >= totalBooks}
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
