import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart } from "lucide-react";
import type { Product } from "../types/products";
import { fetchProductById } from "../services/API";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import AddToCartButton from './../components/Add-to-cart';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const productData = await fetchProductById(parseInt(id));
        setProduct(productData);
        setSelectedImage(productData.image);
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className=" bg-white border-b border-gray-200 shadow-sm py-5">
        <div className="max-w-6xl mx-auto px-5 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-500 font-semibold text-sm hover:text-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <h1 className="text-gray-800 font-semibold text-lg truncate flex-1">{product.title}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10 grid lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-5">
          <div className="relative bg-white rounded-2xl shadow-md aspect-square overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.title}
              className="p-10 object-contain w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition">
              <Heart size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-semibold text-xs capitalize">
            {product.category}
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.floor(product.rating?.rate!=null ? product.rating?.rate : 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 font-semibold text-gray-800">{product?.rating?.rate?.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 text-sm">({product?.rating?.count} reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 p-6 bg-white rounded-xl border border-gray-200">
            <span className="text-4xl font-bold text-blue-500">{formatPrice(product.price)}</span>
            <span className="bg-green-50 text-green-500 font-semibold text-sm px-2 py-1 rounded">
              Free shipping
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

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

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Product Features</h4>
            <ul className="flex flex-col gap-2 list-none">
              {["High quality materials", "30-day return policy", "Secure payment"].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full block" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
