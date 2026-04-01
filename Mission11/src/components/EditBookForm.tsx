import { useState } from 'react';
import type { Book } from '../types';
import { updateBook } from '../API/ProjectsAPI';

//defines the props with book and the on success and cancel
interface EditBookFormProps {
    book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  // gets the state of the exisitng book
  const [formData, setFormData] = useState<Book>({...book});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //updates the values and converst count and price to numeric if needed. 
    setFormData({
      ...formData,
      [name]:
        name === 'pageCount' || name === 'price'
          ? Number(value)
          : value,
    });
  };

  //submits the new book by calling the updateBook for the book with the matching id
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(book.bookID, formData);
    onSuccess();
  };

  return (
    <div className="card p-4 mt-4 mb-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Book</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher:</label>
          <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input type="text" className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Classification:</label>
          <input type="text" className="form-control" name="classification" value={formData.classification} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Page Count:</label>
          <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Update Book</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;