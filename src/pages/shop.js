import { useState, useEffect } from 'react';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8); // default for mobile

  useEffect(() => {
    const updateProductsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setProductsPerPage(16); // large screens
      } else if (width >= 768) {
        setProductsPerPage(12); // tablets
      } else {
        setProductsPerPage(8);  // phones
      }
    };

    updateProductsPerPage(); // set on mount
    window.addEventListener('resize', updateProductsPerPage);

    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Recommended');

  let sortedProducts = [...filtered];

  if (sortOption === 'Price: Low to High') {
    sortedProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  } else if (sortOption === 'Price: High to Low') {
    sortedProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
  } else if (sortOption === 'Name (A-Z)') {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Then slice for pagination
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  if (!isFilterOpen) setIsSortOpen(false); // Close Sort if opening Filter
                }}
                className="flex items-center gap-2 px-4 py-2 border border-black bg-white rounded-md text-sm sm:text-base text-stone-800 hover:bg-stone-100 transition"
              >
                Filters
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    if (!isSortOpen) setIsFilterOpen(false); // Close Filter if opening Sort
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-black bg-white rounded-md text-sm sm:text-base text-stone-800 hover:bg-stone-100 transition"
                >
                  Sort
                  <ChevronDownIcon
                    className={`w-4 h-4 transform transition ${isSortOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-300 rounded-md shadow-lg z-40">
                    {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Name (A-Z)'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${currentPage === index + 1
                    ? 'bg-stone-800 text-white'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

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