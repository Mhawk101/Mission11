export type Book = {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  category: string;
  pageCount: number;
  price: number;
};

export type BookResponse = {
  data: Book[];
  totalBooks: number;
};

export type CartItem = {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
};

export type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
};
