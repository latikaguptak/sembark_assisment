import { useState, useEffect } from "react";
import { Search, Filter, Grid2x2 as Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import type { Product } from "../types/products";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../services/API";


const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "rating">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([fetchProducts(), fetchCategories()]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = async () => {
      try {
        let result: Product[] = selectedCategory === "all" ? products : await fetchProductsByCategory(selectedCategory);
        if (searchTerm) {
          result = result.filter(
            (product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (!Array.isArray(result)) return [];

        result = [...result]; 
        const sortStrategies: Record<string, (a: Product, b: Product) => number> = {
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  "rating": (a, b) => b.rating.rate - a.rating.rate,
};

if (sortStrategies[sortBy]) {
  result.sort(sortStrategies[sortBy]);
}
        setFilteredProducts(result);
      } catch {
        console.error("Error filtering products");
      }
    };
    filterAndSortProducts();
  }, [selectedCategory, searchTerm, sortBy, products]);

  const handleRetry = () => window.location.reload();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-white border-b border-gray-200 shadow-sm py-5">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            >
              <Filter size={16} />
              {showFilters ? "Close Filters" : "Filters"}
            </button>
          </div>
          <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center transition-all duration-300 ${showFilters ? "block" : "hidden md:grid"}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "price-low" | "price-high" | "rating")}
              className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md transition ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-600"}`}
              >
                <Grid size={16} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md transition ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-600"}`}
              >
                <List size={16} />
                List
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
            {selectedCategory !== "all" && (
              <span className="text-gray-500 font-normal"> in {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</span>
            )}
          </h2>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex-col max-w-200 items-center justify-center"}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewmode={viewMode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
