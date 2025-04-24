import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>KidsTreasures – Thoughtful Toys & Books</title>
        <meta name="description" content="Discover toys and books that match your child&rsquo;s personality and spark their imagination." />
      </Head>

      <Header />

      <main>
        <section
          className="px-4 flex items-center justify-center min-h-screen"
        >
          <div className="max-w-3xl text-center">
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

        <section className="min-h-screen py-20 bg-[#fdfaf6]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-stone-800 mb-10">
              Start Exploring
            </h2>

            <p className="text-center text-stone-600 mb-10">
              Shop handpicked <span className="font-medium text-stone-900">toys</span> and <span className="font-medium text-stone-900">books</span> selected to match your child&rsquo;s needs, interests, and personality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Toys */}
              <Link
                href="/shop?category=Toys"
                className="group relative block aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/toy_display.jpg"
                    alt="Toys"
                    fill
                    className="object-cover"
                    style={{ zIndex: 0 }}
                  />
                  {/* Either blur the background with backdrop-blur-sm or add a translucent black */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                    <h3 className="text-white text-2xl font-semibold tracking-wide group-hover:underline">
                      🧸 Toys
                    </h3>
                  </div>
                </div>
              </Link>

              {/* Books */}
              <Link
                href="/shop?category=Books"
                className="group relative block aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/book_display.jpg"
                    alt="Toys"
                    fill
                    className="object-cover"
                    style={{ zIndex: 0 }}
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <h3 className="text-white text-2xl font-semibold tracking-wide group-hover:underline">
                      📚 Books
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="min-h-screen items-center justify-center flex bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-stone-800 mb-10">Why Shop with KidsTreasures?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center text-sm text-stone-700">
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