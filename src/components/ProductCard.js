import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const quantityInCart = cartItems.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 sm:p-4 flex flex-col">

      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-[4/3] mb-2 sm:mb-3">
          <Image
            src={product.image.url}
            alt={product.image.altText}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <Link href={`/product/${product.id}`}>
          <div>
            <h3 className="font-semibold text-stone-800 text-sm sm:text-base mb-1">{product.title}</h3>
          </div>
        </Link>

        <div className="mt-3">
          <div className='flex'>
            <p className="font-medium text-stone-900">{product.price}</p>
            {/* Heart Icon */}
            <button className="text-black hover:text-red-500 transition absolute right-3">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
          {/* Quantity Controls */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-stone-300 hover:bg-stone-400 text-stone-800 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
              >
                −
              </button>

              <span className="text-stone-800 font-semibold text-sm">{quantityInCart}</span>

              <button
                onClick={() => addToCart(product)}
                className="bg-stone-800 hover:bg-stone-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-stone-800 text-white text-xs sm:text-sm py-2 rounded hover:bg-stone-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;