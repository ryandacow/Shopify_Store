import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import mockProducts from '../data/mockProducts';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Shop() {
  const { query } = useRouter();
  const { trait } = query;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = trait
    ? mockProducts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(trait.toLowerCase())
      )
    : mockProducts;

  return (
    <>
      <Head>
        <title>Shop – AmazingStoreSG</title>
      </Head>
      <Header />

      <main className="pt-20 sm:pt-30 min-h-screen px-4 md:px-8 pb-16 bg-[#f6ede6]">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-xl sm:text-3xl font-bold text-stone-800 mb-8 text-center">
            {trait ? `Recommended for ${trait}` : 'Shop All Products'}
          </h1>

          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* Left: Category Path */}
            <div className="text-stone-700 text-sm font-medium">
              {trait ? `Category: Toys > ${trait}` : 'All Products'}
            </div>

            {/* Right: Filter + Sort */}
            <div className="relative flex items-center gap-3">
              {/* Filter Dropdown Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-stone-300 bg-white rounded-md text-sm hover:bg-stone-100 transition"
              >
                Filters
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition ${
                    isFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              {isFilterOpen && (
                <div className="absolute top-12 right-0 z-10 bg-white border border-stone-300 rounded-md shadow-lg w-48">
                  <ul className="text-sm text-stone-700 divide-y divide-stone-200">
                    <li className="px-4 py-2 hover:bg-stone-100 cursor-pointer">Category</li>
                    <li className="px-4 py-2 hover:bg-stone-100 cursor-pointer">Price Range</li>
                    <li className="px-4 py-2 hover:bg-stone-100 cursor-pointer">Age Group</li>
                    <li className="px-4 py-2 hover:bg-stone-100 cursor-pointer">Trait</li>
                  </ul>
                </div>
              )}

              {/* Sort Dropdown */}
              <select className="px-3 py-2 border rounded-md bg-white text-sm">
                <option value="recommended">Sort: Recommended</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Products Message */}
          {filtered.length === 0 && (
            <p className="text-center text-stone-600 mt-12">
              No products found for this trait.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}