import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import mockProducts from '../data/mockProducts';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Range } from 'react-range';

export default function Shop() {
  const { query } = useRouter();
  const { trait } = query;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);

  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    traits: [],
    priceRange: [0, 50],
  });

  // Toggle helpers
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTrait = (trait) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseFloat(value);
    if (newRange[0] <= newRange[1]) {
      setPriceRange(newRange);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTraits([]);
    setPriceRange([0, 50]);
  };

  const applyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories,
      traits: selectedTraits,
      priceRange: priceRange,
    });
    setIsFilterOpen(false);
  };

  const filtered = mockProducts.filter((product) => {
    const matchesCategory =
      appliedFilters.categories.length === 0 ||
      appliedFilters.categories.some((cat) => product.tags.includes(cat));
    const matchesTrait =
      appliedFilters.traits.length === 0 ||
      appliedFilters.traits.some((trait) => product.tags.includes(trait));
    const productPrice = parseFloat(product.price.replace('$', ''));
    const matchesPrice =
      productPrice >= appliedFilters.priceRange[0] &&
      productPrice <= appliedFilters.priceRange[1];

    return matchesCategory && matchesTrait && matchesPrice;
  });

  return (
    <>
      <Head>
        <title>Shop – AmazingStoreSG</title>
      </Head>
      <Header />

      <main className="pt-20 sm:pt-28 min-h-screen px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto relative">
          {/* Title */}
          <h1 className="text-xl sm:text-3xl font-bold text-stone-800 mb-8 text-center">
            {trait ? `Recommended for ${trait}` : 'Shop All Products'}
          </h1>

          {/* Top Controls */}
          <div className="relative flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* Left: Category Path */}
            <div className="text-stone-700 text-sm font-medium">
              {trait ? `Category: Toys > ${trait}` : 'All Products'}
            </div>

            {/* Right: Filter + Sort */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-black bg-white rounded-md text-sm text-stone-800 hover:bg-stone-100 transition"
              >
                Filters
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Sort Dropdown */}
              <select className="px-3 py-2 border border-stone-800 rounded-md bg-white text-sm text-stone-800">
                <option value="recommended">Sort: Recommended</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          <div className={`absolute left-0 right-0 bg-white border-t border-b border-stone-300 transition-all duration-300 z-30 ${isFilterOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top`}>
            <div className="max-w-6xl mx-auto px-4 md:px-8 bg-white shadow-md py-6">
              <div className="flex flex-col md:flex-row gap-8">

                {/* Category */}
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-700 mb-3">Category</h3>
                  <div className="flex flex-col gap-2 text-sm text-stone-600">
                    {['Toys', 'Books', 'Games'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Trait */}
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-700 mb-3">Trait</h3>
                  <div className="flex flex-col gap-2 text-sm text-stone-600">
                    {['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'].map((trait) => (
                      <label key={trait} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTraits.includes(trait)}
                          onChange={() => toggleTrait(trait)}
                        />
                        {trait}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-700 mb-3">Price Range ($)</h3>
                  <div className="text-sm text-stone-600">
                    <Range
                      step={1}
                      min={0}
                      max={50}
                      values={priceRange}
                      onChange={(values) => setPriceRange(values)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="h-2 bg-stone-200 rounded"
                          style={{ ...props.style }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="h-4 w-4 rounded-full bg-stone-700 cursor-pointer"
                        />
                      )}
                    />
                    <p className="text-xs text-center mt-2">
                      ${priceRange[0]} — ${priceRange[1]}
                    </p>
                  </div>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 border border-stone-800 rounded-md text-sm text-stone-800 hover:bg-stone-100 transition"
                  onClick={resetFilters}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-stone-800 text-white rounded-md text-sm hover:bg-stone-700 transition"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
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