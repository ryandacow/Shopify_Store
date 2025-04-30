import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionCarousel from '../components/SectionCarousel';
import LinkTileCarousel from '../components/LinkTileCarousel';
import mockProducts from '../data/mockProducts';
import { extractTags } from '@/lib/extractTags';

export default function Home() {
  // Filter products based on tags
  const featuredProducts = mockProducts.filter((p) => p.tags.includes('Featured'));
  const saleProducts = mockProducts.filter((p) => p.tags.includes('Sale'));

  const { brands: hotBrands, categories: hotCategories } = extractTags(mockProducts);


  console.log('Brands:', hotBrands);
  console.log('Categories:', hotCategories);

  return (
    <>
      <Head>
        <title>AmazingStoreSG</title>
        <meta name="description" content="Discover toys and books that match your child&rsquo;s personality and spark their imagination." />
      </Head>

      <Header />

      <main>
        <section
          className="min-h-screen px-4 flex items-center justify-center bg-cover bg-center bg-[#fbf7f3]"
          style={{
            backgroundImage: "url('/header.png')", // Replace with the actual path to your image
            backgroundSize: "cover", // Ensures the image covers the entire section
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Ensures the section takes up the full viewport height
            paddingBottom: 0,
            marginBottom: 0
          }}
        >
          {/* <div className="max-w-3xl text-center bg-opacity-80 p-6 rounded-lg" style={{
            marginBottom: 0 }}> */}
          <div
            className="absolute inset-0 bg-white opacity-35"
            style={{
              zIndex: 1, // Ensure the overlay is behind the content
            }}
          ></div>
          <div
            className="relative max-w-3xl text-center bg-opacity-80 p-6 rounded-lg"
            style={{
              zIndex: 2, // Ensure the content is above the overlay
            }}
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-stone-800 mb-6 leading-snug">
              Discover the Perfect Gift<br />for Your Child&rsquo;s Personality
            </h1>

            <p className="text-sm sm:text-lg text-stone-600 mb-10">
              Tell us about your child — we&rsquo;ll match them with toys and books that truly fit who they are.
            </p>

            <Link
              href="/personality"
              className="inline-block bg-stone-800 hover:bg-stone-700 text-white font-medium 
        px-8 py-3 rounded-full text-base shadow-md transition-colors duration-200"
            >
              Find Perfect Matches
            </Link>
          </div>
        </section>

        <section className="min-h-screen pt-20 bg-[#fbf7f3]">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
            Start Exploring
          </h2>

          <p className="text-center text-stone-600 mb-10">
            Shop handpicked <span className="font-medium text-stone-900">toys</span> and <span className="font-medium text-stone-900">books</span> selected to match your child&rsquo;s needs, interests, and personality.
          </p>

          <div className="max-w-6xl mx-auto px-4 pb-10">
            <SectionCarousel title="Best Sellers" products={featuredProducts} />
            <SectionCarousel title="Hot Deals" products={saleProducts} />
            <LinkTileCarousel title="🔥 Hot Brands" items={hotBrands} type="brand" />
            <LinkTileCarousel title="🧠 Categories You Might Be Interested In" items={hotCategories} type="category" />
          </div>
        </section>

        <section className="min-h-[70vh] py-20 justify-center flex px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-stone-800 mb-10">Why Shop with KidsTreasures?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left text-sm text-stone-700">
              <div className="p-4 border rounded-lg shadow-sm">✅ Market-Beating Prices</div>
              <div className="p-4 border rounded-lg shadow-sm">🛡️ Quality-Assured</div>
              <div className="p-4 border rounded-lg shadow-sm">🔐 Secure Payments</div>
              <div className="p-4 border rounded-lg shadow-sm">🚚 Swift Doorstep Delivery</div>
              <div className="p-4 border rounded-lg shadow-sm">🎯 Personalized Picks</div>
              <div className="p-4 border rounded-lg shadow-sm">🌟 Loved by Parents</div>
              <div className="p-4 border rounded-lg shadow-sm">🧠 Curated with Care</div>
              <div className="p-4 border rounded-lg shadow-sm">😌 Stress-Free Shopping</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}