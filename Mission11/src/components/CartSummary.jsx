import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

//creates a cart summary that is displayed on the main page. 
function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="card p-3 mb-4 bg-light">
      <h4>Cart Summary</h4>
      <hr />
      <p>

        {/* The bootstrap badge extra requirement is here */}
        <strong>Items in Cart:</strong> 
        <span className="badge bg-primary ms-2">{cart.length}</span>
      </p>
      <p><strong>Total Quantity:</strong> 
      <span className="badge bg-primary ms-2">{totalQuantity}</span></p>
      <h5 className="mt-3">Total: ${total.toFixed(2)}</h5>
      <button 
        className="btn btn-primary w-100 mt-3"
        onClick={() => navigate('/cart')}
      >
        View Cart
      </button>
    </div>
  );
}

export default CartSummary;