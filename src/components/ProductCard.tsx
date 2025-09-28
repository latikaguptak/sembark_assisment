import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "../types/products";
import AddToCartButton from "./Add-to-cart";


interface ProductCardProps {
  product: Product;
  viewmode?: string;
}


const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const truncateTitle = (title: string, maxLength: number = 60) =>
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

  return (
    <section
  className="flex flex-col h-full rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
>

      <Link to={`/product/${product.id}/details`} className="flex-1 flex flex-col">
        <div className="relative pb-[75%] bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
            {truncateTitle(product.title)}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={12}
                className={
                  index < Math.floor(product.rating.rate)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold text-blue-500">{formatPrice(product.price)}</span>
            <span className="text-[11px] px-2 py-1 bg-gray-100 text-gray-500 rounded-full capitalize font-medium">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <AddToCartButton
          product={{
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            rating: product.rating,
            description: product.description,
            category: product.category,
          }}
        />
      </div>
    </section>
  );
};

export default ProductCard;
