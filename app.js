import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import burgerImage from './burger.jpeg'; // Import burger image
import pizzaImage from './pizza.jpeg'; // Import pizza image
import saladImage from './salad.jpeg';
import Receipt from './Receipt'; // Import Receipt component

function MenuItem({ name, price, image, addItem }) {
  return (
    <div className="menu-item">
      <img src={image} alt={name} />
      <span>{name}</span>
      <span>${price.toFixed(2)}</span>
      <button onClick={() => addItem(name, price)}>Add</button>
    </div>
  );
}

function OrderItem({ name, price, removeItem }) {
  return (
    <div className="order-item">
      <span>{name}</span>
      <span>${price.toFixed(2)}</span>
      <button onClick={() => removeItem(name)}>Remove</button>
    </div>
  );
}

function RestaurantPOS() {
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const addItem = (name, price) => {
    const updatedItems = [...orderItems, { name, price }];
    const updatedTotal = total + price;
    setOrderItems(updatedItems);
    setTotal(updatedTotal);
  };

  const removeItem = (name) => {
    const removedItem = orderItems.find(item => item.name === name);
    const updatedItems = orderItems.filter(item => item.name !== name);
    const updatedTotal = total - removedItem.price;
    setOrderItems(updatedItems);
    setTotal(updatedTotal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const processPayment = () => {
    // Validate customer details before processing payment
    if (customerDetails.name && customerDetails.email && customerDetails.phone) {
      // Process payment based on the selected method
      switch(paymentMethod) {
        case 'cash':
          alert(`Payment received in cash. Total amount: $${total.toFixed(2)}`);
          break;
        case 'debit':
          alert(`Debit card payment processed successfully. Total amount: $${total.toFixed(2)}`);
          break;
        case 'credit':
          alert(`Credit card payment processed successfully. Total amount: $${total.toFixed(2)}`);
          break;
        default:
          alert('Invalid payment method selected.');
      }
      // Show receipt after successful payment
      setShowReceipt(true);
    } else {
      alert('Please provide all required customer details.');
    }
  };

  const handleCheckout = () => {
    // Clear order items and reset total
    setOrderItems([]);
    setTotal(0);
    // Reset customer details and payment method
    setCustomerDetails({ name: '', email: '', phone: '' });
    setPaymentMethod('cash');
    // Hide payment form and receipt
    setShowPaymentForm(false);
    setShowReceipt(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Restaurant POS System</h1>
      <div id="menu">
        <h2>Menu</h2>
        {/* Menu items */}
        <MenuItem name="Burger" price={10} image={burgerImage} addItem={addItem} />
        <MenuItem name="Pizza" price={12} image={pizzaImage} addItem={addItem} />
        <MenuItem name="Salad" price={8} image={saladImage} addItem={addItem} />
      </div>
      <div id="order">
        <h2>Order</h2>
        <div id="order-items">
          {orderItems.map((item, index) => (
            <OrderItem key={index} name={item.name} price={item.price} removeItem={removeItem} />
          ))}
        </div>
        <div className="total">Total: ${total.toFixed(2)}</div>
        <button className="process-payment" onClick={() => setShowPaymentForm(true)}>proceed</button>
        
      </div>
      {showPaymentForm && (
        <div id="payment-form">
          <hr></hr>
          <h2>Customer Details</h2>
          <input type="text" name="name" placeholder="Name" value={customerDetails.name} onChange={handleInputChange} /><br></br>
          <input type="email" name="email" placeholder="Email" value={customerDetails.email} onChange={handleInputChange} /><br></br>
          <input type="tel" name="phone" placeholder="Phone" value={customerDetails.phone} onChange={handleInputChange} /><br></br>
          <br></br>
          <h2>Select Payment Method</h2>
          <div className="payment-methods">
            <label>
              <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={handlePaymentMethodChange} />
              Cash<br></br>
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="debit" checked={paymentMethod === 'debit'} onChange={handlePaymentMethodChange} />
              Debit Card<br></br>
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="credit" checked={paymentMethod === 'credit'} onChange={handlePaymentMethodChange} />
              Credit Card
            </label>
          </div>
          <br></br>
          <button className = "pay" onClick={processPayment}>payment</button>
        </div>
      )}
      <div >
      {showReceipt && <Receipt customerDetails={customerDetails} paymentMethod={paymentMethod} total={total} orderItems={orderItems} />}
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        {/* <button className="print-receipt" onClick={handlePrint}>save</button> */}
      </div>
    </div>
  );
}

export default RestaurantPOS;
