import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import CartSummary from './CartSummary';
import BookCard from './BookCard';
// Explicit extension to avoid resolution issues in some bundler setups
import Pagination from './pagination.tsx';
import type { Book, BookResponse } from '../types';
import {fetchCategories} from "../API/ProjectsAPI"
import {fetchBooks} from "../API/ProjectsAPI"

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories on component mount 
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories()
        setCategories(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);


  // Fetch books when categories, page, or pageSize changes
  useEffect(() => {
  const loadBooks = async () => {
    try {
      setLoading(true);

      const data = await fetchBooks(pageSize, page, selectedCategories);

      setBooks(data.data);
      setTotalBooks(data.totalBooks);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  loadBooks();
}, [selectedCategories, page, pageSize]);

  if (loading) return <p>Loading Books...</p>
  if (error) return <p>Error: {error}</p>
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

  const totalPages = Math.ceil(totalBooks / pageSize);

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

          {/* Book List */}
          <div className="row">
            {sortedBooks.map((b) => (
              <div key={b.bookID} className="col-md-6 col-lg-4 mb-4">
                <BookCard book={b} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}

export default BookList;
