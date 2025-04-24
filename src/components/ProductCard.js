import React from 'react';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <Image
        src={product.image.url}
        alt={product.image.altText}
        width={30}
        height={30}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 mb-1">{product.title}</h3>
        <p className="text-sm text-stone-600 line-clamp-2">{product.description}</p>
        <p className="mt-2 font-medium text-stone-900">{product.price}</p>
        <button className="mt-3 w-full bg-stone-800 text-white py-2 rounded hover:bg-stone-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;