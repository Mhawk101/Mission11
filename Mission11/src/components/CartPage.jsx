import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

//returns the cart page
function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          <p>Your cart is empty</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="row mb-4">
            <div className="col-md-8">
              {cart.map(item => (
                <div key={item.bookId} className="card p-3 mb-3">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>{item.title}</h5>
                      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.bookId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="col-md-4">
              <div className="card p-4">
                <h4>Order Summary</h4>
                <hr />
                <p><strong>Items:</strong> {cart.length}</p>
                <p><strong>Total Quantity:</strong> {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                <h5 className="mt-3">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-success w-100 mt-3">
                  Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Continue Shopping Button - takes you back to main page */}
          <button 
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          >
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;