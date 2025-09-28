import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => dispatch(removeFromCart(id));
  const handleClearCart = () => dispatch(clearCart());

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow py-5">
          <div className="max-w-6xl mx-auto px-5 flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-500 font-semibold text-sm hover:text-blue-700 transition"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-gray-800 font-semibold text-lg">My Cart</h1>
          </div>
        </header>

        <main className="max-w-xl mx-auto py-20 px-5 text-center">
          <div className="bg-white rounded-2xl p-16 shadow">
            <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow py-5">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-500 font-semibold text-sm hover:text-blue-700 transition"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-gray-800 font-semibold text-lg">
              My Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-500 border border-red-200 rounded-lg px-3 py-1 text-sm font-semibold hover:bg-red-50 transition"
          >
            <Trash2 size={14} />
            Clear Cart
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
       
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 shadow border border-gray-200 transition hover:shadow-lg"
            >
              <div className="flex gap-5 items-start justify-between flex-wrap sm:flex-nowrap">
      
                <div className="w-28 h-28 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.title} className="p-3 object-contain w-full h-full" />
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-[200px]">
                  <h3 className="text-gray-800 font-semibold text-base line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold text-lg">{formatPrice(item.price)}</span>
                    <span className="text-gray-500 text-sm">each</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex items-center gap-1 text-red-500 text-sm font-semibold hover:text-red-600 transition"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

         
                <div className="flex flex-col items-end gap-1 ml-auto">
                  <span className="text-gray-800 font-bold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-gray-200 sticky top-24 max-h-fit w-full">
          <h2 className="text-gray-800 font-bold text-xl mb-5">Order Summary</h2>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Items ({totalQuantity})</span>
              <span className="text-gray-800 font-semibold">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Shipping</span>
              <span className="text-green-500 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Tax</span>
              <span className="text-gray-800 font-semibold">{formatPrice(totalAmount * 0.08)}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-5 flex justify-between items-center">
            <span className="text-gray-800 font-bold text-lg">Total</span>
            <span className="text-blue-500 font-bold text-xl">{formatPrice(totalAmount * 1.08)}</span>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition mb-3">
            Proceed to Checkout
          </button>
          <Link to="/" className="block text-center text-blue-500 font-semibold hover:text-blue-600 transition text-sm">
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
