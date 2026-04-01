import type { BookResponse } from '../types';
import type { Book } from '../types';

//fetches books using the get method from the api
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<BookResponse> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNum.toString());
  params.append('pageSize', pageSize.toString());

  selectedCategories.forEach((category) => {
    params.append('categories[]', category);
  });

  try {
    const res = await fetch(`https://michael-hawkins-book-mission13-ekdkh7etckcxfvdg.westeurope-01.azurewebsites.net/books?${params.toString()}`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch book.")
    }
    
    const data: BookResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//fetches categories for updating categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch('https://michael-hawkins-book-mission13-ekdkh7etckcxfvdg.westeurope-01.azurewebsites.net/books/categories');
    const data: string[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//adds a book from the post method in the controller
export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const res = await fetch('https://michael-hawkins-book-mission13-ekdkh7etckcxfvdg.westeurope-01.azurewebsites.net/books/AddBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!res.ok) {
            throw new Error('Failed to add book');
        }

        return await res.json();
    } catch (error) {
        console.error('Error adding book', error);
        throw error;
    }
};

//Updates the book with the put method from the controller
export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const res = await fetch(`https://michael-hawkins-book-mission13-ekdkh7etckcxfvdg.westeurope-01.azurewebsites.net/books/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!res.ok) {
            throw new Error('Failed to update book');
        }

        return await res.json();
    } catch (error) {
        console.error("Error updating book", error);
        throw error;
    }
};

//deletes the book by calling the delete method
export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const res = await fetch(`https://michael-hawkins-book-mission13-ekdkh7etckcxfvdg.westeurope-01.azurewebsites.net/books/DeleteBook/${bookId}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error("Error deleting book", error);
        throw error;
    }
};