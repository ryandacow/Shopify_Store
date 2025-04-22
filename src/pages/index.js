import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>KidsTreasures – Thoughtful Toys & Books</title>
        <meta name="description" content="Discover toys and books that match your child’s personality and spark their imagination." />
      </Head>

      <Header />

      <main>
        <section className="py-20 px-4 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-6 leading-snug">
              Discover the Perfect Gift<br />for Your Child’s Personality
            </h1>

            <p className="text-lg text-stone-600 mb-10">
              Tell us about your child — we’ll match them with toys and books that truly fit who they are.
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
      </main>

      <Footer />
    </div>
  );
}