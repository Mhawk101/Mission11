import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import CartSummary from './CartSummary';
import BookCard from './BookCard';
import NewBookForm from './NewBookForm';
import EditBookForm from './EditBookForm';
import type { Book, BookResponse } from '../types';
import { fetchCategories } from '../API/ProjectsAPI';
import { fetchBooks } from '../API/ProjectsAPI';
import { deleteBook } from '../API/ProjectsAPI';
import Pagination from './pagination.tsx';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    // Fetch categories on component
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    //fetch books when page or pageSize changes
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, page, selectedCategories);
                setBooks(data.data);
                setTotalBooks(data.totalBooks);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, page, selectedCategories]);

    //shows the edit form for later when edit is clicked
    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setShowEditForm(true);
    };

    //displays a confirm delete popup
    const handleDelete = async (bookId: number) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(bookId);
                fetchBooks(pageSize, page, selectedCategories).then((data) =>
                    setBooks(data.data)
                );
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    //if loading or error show the respective message. 
    if (loading) return <p>Loading Books...</p>;
    if (error) return <p>Error: {error}</p>;

    //if no error or loading then return the table with all the book stuff
    return (
        <div>
            <h1>Admin - Books</h1>

            {/* shows the add book form when clicked */}
            <button onClick={() => setShowForm(true)}>Add New Book</button>

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, page, selectedCategories).then((data) =>
                            setBooks(data.data)
                        );
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* shows the edit book form */}
            {showEditForm && editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setShowEditForm(false);
                        setEditingBook(null);
                        fetchBooks(pageSize, page, selectedCategories).then((data) =>
                            setBooks(data.data)
                        );
                    }}
                    onCancel={() => {
                        setShowEditForm(false);
                        setEditingBook(null);
                    }}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                            <td>
                                <button onClick={() => handleEdit(b)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(b.bookID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalBooks / pageSize)}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;