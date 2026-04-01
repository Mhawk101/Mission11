import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import CartPage from './components/CartPage';
import AdminBooksPage from './components/AdminBooksPage';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
