import { useState } from 'react';
import type { Book } from '../types';
import { addBook } from '../API/ProjectsAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

//creates a new book
const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  //handles the form data. Converting to numeric if neccessary
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'pageCount' || name === 'price'
          ? Number(value)
          : value,
    });
  };

  //prevents default refresh then calls the add book with the form data. 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <div className="card p-4 mt-4 mb-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add a New Book</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher:</label>
          <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input type="text" className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Classification:</label>
          <input type="text" className="form-control" name="classification" value={formData.classification} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Page Count:</label>
          <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Add Book</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewBookForm;