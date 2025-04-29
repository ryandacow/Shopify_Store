import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutContactPage() {
  return (
    <>
      <Head>
        <title>About Us & Contact – AmazingStoreSG</title>
      </Head>
      <Header />

      <main className="pt-20 sm:pt-28 min-h-screen px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-16 text-stone-700">

          {/* About Section */}
          <section className="space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">About AmazingStoreSG</h1>
            <p className="text-stone-600 leading-relaxed">
              AmazingStoreSG is dedicated to helping children grow, learn, and thrive with the best educational toys and books.
              <br />
              We carefully curate every product with love and a focus on personal development.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Whether you&rsquo;re looking for creativity boosters, calming toys, or early learning kits — we&rsquo;ve got you covered!
              Thank you for being a part of our journey.
            </p>
          </section>

          {/* Why Choose Us */}
          <section className="bg-stone-50 p-6 md:p-8 rounded-lg shadow space-y-5">
            <h2 className="text-2xl font-bold text-stone-800 text-center">Why Choose Us?</h2>
            <ul className="space-y-3 list-disc list-inside text-stone-700">
              <li>
                <strong>Singapore-Based & Trusted:</strong> Local shipping, familiar payment methods (PayNow, GrabPay), and customer service that understands you.
              </li>
              <li>
                <strong>Curated for Growth:</strong> We specialize in toys and books that nurture creativity, curiosity, and confidence.
              </li>
              <li>
                <strong>Safe & Certified:</strong> Every product is sourced from trusted suppliers and meets safety standards.
              </li>
              <li>
                <strong>Always in Trend:</strong> Blind boxes, character kits, collectibles — we keep things exciting for little learners.
              </li>
              <li>
                <strong>Parents First:</strong> We offer tips, guides, and honest advice because your parenting journey matters.
              </li>
            </ul>
          </section>

          {/* Contact Form Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-800 text-center">Get in Touch</h2>
            <form
              method="POST"
              action="/contact#contact_form"
              className="space-y-4 bg-white p-6 rounded-lg shadow"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-stone-700 mb-1">Name</label>
                <input
                  type="text"
                  name="contact[name]"
                  id="name"
                  required
                  className="border border-stone-300 rounded p-2 focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  name="contact[email]"
                  id="email"
                  required
                  className="border border-stone-300 rounded p-2 focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-stone-700 mb-1">Message</label>
                <textarea
                  name="contact[body]"
                  id="message"
                  rows="5"
                  required
                  className="border border-stone-300 rounded p-2 focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}