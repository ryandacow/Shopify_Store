import React from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  // Find how many of this product is in the cart
  const quantityInCart = cartItems.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 sm:p-4 flex flex-col">
      {/* Heart Icon */}
      <button className="absolute top-3 right-3 z-10 text-black hover:text-red-500 transition">
        <HeartIcon className="w-5 h-5" />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-[4/3] mb-2 sm:mb-3">
        <Image
          src={product.image.url}
          alt={product.image.altText}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base mb-1">{product.title}</h3>
        </div>

        <div className="mt-3">
          <p className="font-medium text-stone-900">{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-2 w-full bg-stone-800 text-white text-xs sm:text-sm py-2 rounded hover:bg-stone-700 transition"
          >
            {quantityInCart > 0
              ? `Added (${quantityInCart})`
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;