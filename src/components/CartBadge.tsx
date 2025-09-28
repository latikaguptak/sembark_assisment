import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';

const CartBadge: React.FC = () => {
  const { totalQuantity, totalAmount } = useAppSelector((state) => state.cart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Link
      to="/cart"
      className={`
        fixed bottom-6 right-6 bg-blue-500 rounded-full px-5 py-3 flex items-center gap-3
        shadow-[0_10px_25px_rgba(59,130,246,0.3)] z-50 text-white text-sm font-semibold
        transform transition-all duration-300 ease-in-out
        ${totalQuantity > 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}
        no-underline
      `}
    >
      <div className="relative">
        <ShoppingCart size={20} />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 
                           flex items-center justify-center text-[10px] font-bold">
            {totalQuantity}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start">
        <span className="text-xs opacity-90">
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
        </span>
        <span className="text-sm font-bold">{formatPrice(totalAmount)}</span>
      </div>
    </Link>
  );
};

export default CartBadge;
