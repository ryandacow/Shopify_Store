import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import mockProducts from '../../data/mockProducts'; // Mock data
import Image from 'next/image';
import { useCart } from '../../context/CartContext'; // Cart Context

export default function ProductPage() {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const router = useRouter();
  const { id } = router.query;

  const product = mockProducts.find((item) => item.id === id);

  const quantityInCart = cartItems.find((item) => item.id === product?.id)?.quantity || 0;

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-20 sm:pt-28 min-h-screen flex items-center justify-center">
          <p className="text-stone-600">Product not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} – AmazingStoreSG</title>
      </Head>
      <Header />

      <main className="pt-20 sm:pt-30 min-h-screen px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <Image
              src={product.image.url}
              alt={product.image.altText}
              width={500}
              height={500}
              className="rounded-lg w-full h-auto max-w-sm object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">{product.title}</h1>
            <p className="text-lg text-stone-700">{product.price}</p>
            <p className="text-stone-600">{product.description}</p>

            {/* Quantity Controls */}
            {quantityInCart > 0 ? (
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-stone-300 hover:bg-stone-400 text-stone-800 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold"
                >
                  −
                </button>

                <span className="text-stone-800 font-semibold text-lg">{quantityInCart}</span>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-stone-800 hover:bg-stone-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="mt-6 px-6 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition w-full md:w-1/2"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}