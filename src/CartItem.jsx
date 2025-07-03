import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const getPrice = (priceStr) => parseFloat(priceStr.replace('$', ''));

  const calculateTotalAmount = () => {
    return items
      .reduce((total, item) => total + getPrice(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (getPrice(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 className="total_cart_amount">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {items.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />

          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>

            <div className="cart-item-quantity">
              <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
            </div>

            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}

      <div>
        <button className="get-started-button1 continue_shopping_btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
