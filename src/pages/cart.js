import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return sum + price * item.quantity;
    }, 0).toFixed(2);

  return (
    <>
      <Head>
        <title>Your Cart – AmazingStoreSG</title>
      </Head>
      <Header />

      <main className="pt-20 sm:pt-28 min-h-screen px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-stone-600 font-bold mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className='text-stone-600'>Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-white p-4 rounded shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image.url}
                          alt={item.image.altText}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h2 className="font-medium text-stone-800">{item.title}</h2>
                        <p className="text-sm text-stone-600">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded px-2 py-1 text-sm">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-2 text-stone-700 hover:text-red-500"
                        >
                          −
                        </button>
                        <span className="mx-2 text-stone-600">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2 text-stone-700 hover:text-green-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total and Checkout */}
              <div className="mt-10 text-right">
                <p className="text-lg font-medium text-stone-800 mb-4">
                  Total: ${calculateTotal()}
                </p>
                <button className="bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}