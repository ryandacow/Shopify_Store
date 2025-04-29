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

  const [selectedSpecials, setSelectedSpecials] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ageRange, setAgeRange] = useState([0, 16]); // Assuming ages 0-10

  const [filterSections, setFilterSections] = useState({
    special: false,
    trait: false,
    brand: false,
    category: false,
    age: false,
    price: false,
  });

  const toggleSection = (section) => {
    setFilterSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [appliedFilters, setAppliedFilters] = useState({
    specials: [],
    categories: [],
    traits: [],
    brands: [],
    priceRange: [0, 50],
    ageRange: [0, 16],
  });

  // Toggle helpers
  const toggleSelected = (stateSetter, value) => {
    stateSetter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedSpecials([]);
    setSelectedCategories([]);
    setSelectedTraits([]);
    setSelectedBrands([]);
    setPriceRange([0, 50]);
    setAgeRange([0, 16]);
  };

  const applyFilters = () => {
    setAppliedFilters({
      specials: selectedSpecials,
      categories: selectedCategories,
      traits: selectedTraits,
      brands: selectedBrands,
      priceRange: priceRange,
      ageRange: ageRange,
    });
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const filtered = mockProducts.filter((product) => {
    const productTags = product.tags;

    const matchesSpecial =
      !appliedFilters.specials || appliedFilters.specials.length === 0 ||
      appliedFilters.specials.some((special) => productTags.includes(special));

    const matchesCategory =
      !appliedFilters.categories || appliedFilters.categories.length === 0 ||
      appliedFilters.categories.some((cat) => productTags.includes(`category_${cat}`));

    const matchesTrait =
      !appliedFilters.traits || appliedFilters.traits.length === 0 ||
      appliedFilters.traits.some((trait) => productTags.includes(`trait_${trait}`));

    const matchesBrand =
      !appliedFilters.brands || appliedFilters.brands.length === 0 ||
      appliedFilters.brands.some((brand) => productTags.includes(`brand_${brand}`));

    const matchesPrice =
      parseFloat(product.price.replace('$', '')) >= (appliedFilters.priceRange?.[0] ?? 0) &&
      parseFloat(product.price.replace('$', '')) <= (appliedFilters.priceRange?.[1] ?? 50);

    const ageTag = productTags.find(tag => tag.startsWith('ageGroup_'));
    const productAge = ageTag ? parseInt(ageTag.split('_')[1].split('-')[0]) : null;
    const matchesAge =
      !productAge || (productAge >= (appliedFilters.ageRange?.[0] ?? 0) && productAge <= (appliedFilters.ageRange?.[1] ?? 16));

    return matchesSpecial && matchesCategory && matchesTrait && matchesBrand && matchesPrice && matchesAge;
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
          <div className="mb-8 text-center">
            <h1 className="text-xl sm:text-3xl font-bold text-stone-800">
              Catalogue
            </h1>
          </div>

          {/* Top Controls */}
          <div className="relative flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* Left: Category Path + Filters */}
            <div className="text-stone-700 text-sm font-medium">
              <div className="text-center sm:text-left mb-2">
                All Products
                {appliedFilters.categories.length > 0 && ` > ${appliedFilters.categories.join(' | ')}`}
              </div>

              {/* Applied Filters Summary */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs text-stone-600">
                {appliedFilters.specials.map((s) => (
                  <span key={s} className="bg-stone-100 px-2 py-1 rounded-full">{s === 'Featured' ? 'Best Sellers' : 'Promotion'}</span>
                ))}
                {appliedFilters.traits.map((t) => (
                  <span key={t} className="bg-stone-100 px-2 py-1 rounded-full">{t}</span>
                ))}
                {appliedFilters.brands.map((b) => (
                  <span key={b} className="bg-stone-100 px-2 py-1 rounded-full">{b}</span>
                ))}
                {appliedFilters.ageRange[0] > 0 || appliedFilters.ageRange[1] < 16 ? (
                  <span className="bg-stone-100 px-2 py-1 rounded-full">Age {appliedFilters.ageRange[0]}–{appliedFilters.ageRange[1]}</span>
                ) : null}
                {appliedFilters.priceRange[0] > 0 || appliedFilters.priceRange[1] < 50 ? (
                  <span className="bg-stone-100 px-2 py-1 rounded-full">${appliedFilters.priceRange[0]}–{appliedFilters.priceRange[1]}</span>
                ) : null}
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">

                {/* Traits and Type */}
                <div className="flex flex-col gap-4 md:gap-8">

                  {/* Special (Featured or Sale) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Highlights</h3>
                      <button
                        className="text-stone-700 text-xl md:hidden"
                        onClick={() => toggleSection('special')}
                      >
                        {filterSections.special ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`${filterSections.special ? 'block' : 'hidden'} md:block`}>
                      <div className="flex flex-col gap-2 text-sm text-stone-600">
                        {['Featured', 'Sale'].map((special) => (
                          <label key={special} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedSpecials.includes(special)}
                              onChange={() => toggleSelected(setSelectedSpecials, special)}
                            />
                            {special === 'Featured' ? 'Best Sellers' : 'Promotion'}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trait */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Trait</h3>
                      <button
                        className="text-stone-700 text-xl md:hidden"
                        onClick={() => toggleSection('trait')}
                      >
                        {filterSections.trait ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`${filterSections.trait ? 'block' : 'hidden'} md:block`}>
                      <div className="flex flex-col gap-2 text-sm text-stone-600">
                        {['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'].map((trait) => (
                          <label key={trait} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedTraits.includes(trait)}
                              onChange={() => toggleSelected(setSelectedTraits, trait)}
                            />
                            {trait}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-stone-700">Brand</h3>
                    <button
                      className="text-stone-700 text-xl md:hidden"
                      onClick={() => toggleSection('brand')}
                    >
                      {filterSections.brand ? '−' : '+'}
                    </button>
                  </div>
                  <div className={`${filterSections.brand ? 'block' : 'hidden'} md:block overflow-y-auto max-h-48 pr-2`}>
                    <div className="flex flex-col gap-2 text-sm text-stone-600">
                      {['MontessoriCo', 'LittleReaders', 'PlayTogether', 'CalmKids', 'TechTots', 'CreativeKids', 'LittleArtists', 'LittleWriters', 'NatureKids'].map((brand) => (
                        <label key={brand} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleSelected(setSelectedBrands, brand)}
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-stone-700">Category</h3>
                    <button
                      className="text-stone-700 text-xl md:hidden"
                      onClick={() => toggleSection('category')}
                    >
                      {filterSections.category ? '−' : '+'}
                    </button>
                  </div>
                  <div className={`${filterSections.category ? 'block' : 'hidden'} md:block overflow-y-auto max-h-48 pr-2`}>
                    <div className="flex flex-col gap-2 text-sm text-stone-600">
                      {['Puzzle', 'Storybook', 'BoardGame', 'CalmingToy', 'Robotics', 'Storytelling', 'Planner', 'SensoryBook', 'CraftKit', 'Emotions', 'CardGame', 'Writing', 'Sorting', 'Adventure'].map((cat) => (
                        <label key={cat} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleSelected(setSelectedCategories, cat)}
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Age + Price Sliders */}
                <div className="flex flex-col gap-4 md:gap-8">
                  {/* Age Range */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Age Group (Years)</h3>
                      <button
                        className="text-stone-700 text-xl md:hidden"
                        onClick={() => toggleSection('age')}
                      >
                        {filterSections.age ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`${filterSections.age ? 'block' : 'hidden'} md:block`}>
                      <div className="text-sm text-stone-600">
                        <Range
                          step={1}
                          min={0}
                          max={16}
                          values={ageRange}
                          onChange={(values) => setAgeRange(values)}
                          renderTrack={({ props, children }) => (
                            <div {...props} className="h-2 bg-stone-200 rounded" style={{ ...props.style }}>
                              {children}
                            </div>
                          )}
                          renderThumb={({ props }) => (
                            <div {...props} className="h-4 w-4 rounded-full bg-stone-700 cursor-pointer" />
                          )}
                        />
                        <p className="text-xs text-center mt-2">{ageRange[0]} — {ageRange[1]} years</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Price Range ($)</h3>
                      <button
                        className="text-stone-700 text-xl md:hidden"
                        onClick={() => toggleSection('price')}
                      >
                        {filterSections.price ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`${filterSections.price ? 'block' : 'hidden'} md:block`}>
                      <div className="text-sm text-stone-600">
                        <Range
                          step={1}
                          min={0}
                          max={50}
                          values={priceRange}
                          onChange={(values) => setPriceRange(values)}
                          renderTrack={({ props, children }) => (
                            <div {...props} className="h-2 bg-stone-200 rounded" style={{ ...props.style }}>
                              {children}
                            </div>
                          )}
                          renderThumb={({ props }) => (
                            <div {...props} className="h-4 w-4 rounded-full bg-stone-700 cursor-pointer" />
                          )}
                        />
                        <p className="text-xs text-center mt-2">${priceRange[0]} — ${priceRange[1]}</p>
                      </div>
                    </div>
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