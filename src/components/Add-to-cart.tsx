import React, { useState, useEffect } from "react";
import { ShoppingCart, Check, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addToCart } from "../store/cartSlice";
import type { Product } from "../types/products";
import { Link } from "react-router";


interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState(false);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    setAddedToCart(true);
  };

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);




  return (
    <div className="flex lg:flex-row md:flex-col items-start gap-4 ">
      {isInCart && (
        <Link to="/cart">
        <button className="px-3 py-3 rounded-xl font-semibold text-gray-700 border-2  bg-gray-50 hover:bg-gray-200 transition text-sm ">
          <ShoppingBag size={20} />
        </button>
        </Link>
      )}

      <button
        onClick={handleAddToCart}
        disabled={addedToCart}
        className={`flex items-center justify-center gap-2 py-3 rounded-xl px-3 font-semibold text-white text-base transition transform bg-blue-500 hover:bg-blue-600 disabled:opacity-50
        ${isInCart ? "w-full" : "w-full md:w-auto lg:w-auto"}`}
      >
        {addedToCart ? (
          <>
            <Check size={20} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            {isInCart ? "Added" : "Add to Cart"}
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
