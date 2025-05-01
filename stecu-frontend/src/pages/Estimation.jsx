import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Estimate() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-customGrayDark">
      <div className="relative bg-customGrayLight text-white rounded-xl px-14 py-10 max-w-xl w-full border border-white">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 w-8 h-8 flex items-center justify-center leading-none"
          >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-center text-lg font-regular mb-2">Estimated Price</h2>

        {/* Price Range */}
        <p className="text-center text-3xl font-semibold mb-3 leading-snug">
          IDR 1,000,000 to<br />IDR 3,000,000
        </p>

        {/* Description */}
        <p className="text-center text-sm text-gray mb-6 max-w-md mx-auto">
          You can contact us or we will reach out to you within 1×24 hours to discuss further and ensure the project
        </p>

        {/* CTA Button */}
        <div className="w-full max-w-lg mx-auto">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition">
          Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
