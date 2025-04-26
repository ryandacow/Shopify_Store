import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { MdDelete } from "react-icons/md";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'remove' or 'clear'
  const [selectedItemId, setSelectedItemId] = useState(null);

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return sum + price * item.quantity;
    }, 0).toFixed(2);

  const openModal = (type, id = null) => {
    setModalType(type);
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (modalType === 'remove' && selectedItemId) {
      removeItemCompletely(selectedItemId);
    }
    if (modalType === 'clear') {
      clearCart();
    }
    setShowModal(false);
  };

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
            <p className="text-stone-600">Your cart is empty.</p>
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

                      {/* Remove Product Completely */}
                      <button
                        onClick={() => openModal('remove', item.id)}
                        className="text-xs hover:underline"
                      >
                        <MdDelete className="w-5 h-5 text-red-600 hover:text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total and Actions */}
              <div className="mt-10 text-right space-y-4">
                <p className="text-lg font-medium text-stone-800">
                  Total: ${calculateTotal()}
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <button
                    onClick={() => openModal('clear')}
                    className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition"
                  >
                    Clear Cart
                  </button>
                  <button className="bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center space-y-4">
              <p className="text-lg font-semibold text-stone-700">
                {modalType === 'remove' ? (
                  <>
                    Warning:<br />
                    This action cannot be undone. <br/>
                    Remove this item from your cart?
                  </>
                ) : (
                  <>
                    Warning:<br />
                    This action cannot be undone. <br/>
                    Clear all items from your cart?
                  </>
                )}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="border border-stone-400 text-stone-600 px-4 py-2 rounded hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}