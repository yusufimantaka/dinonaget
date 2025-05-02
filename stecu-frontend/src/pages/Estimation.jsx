import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';

export default function Estimate() {
  const navigate = useNavigate();

  // State to hold the estimated price
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(true); // State to show loading or initial state
  const [error, setError] = useState(null); // State to handle potential errors

  useEffect(() => {
    const submissionResultString = sessionStorage.getItem("submissionResult");

    if (submissionResultString) {
      try {
        const submissionResult = JSON.parse(submissionResultString);
        if (submissionResult && submissionResult.priceEstimate) {
          setEstimatedPrice(submissionResult.priceEstimate);
          setLoading(false); // Data loaded
        } else {
          // Data exists but doesn't have the expected format
          setError("Price estimate not found in session storage.");
          setLoading(false);
        }
      } catch (e) {
        // Error parsing JSON
        console.error("Failed to parse submissionResult from sessionStorage:", e);
        setError("Failed to load price estimate.");
        setLoading(false);
      }
    } else {
      // No data found in session storage
      setError("Submission result not found in session storage.");
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Define the content to display based on state
  let content;
  if (loading) {
    content = <p className="text-center text-xl font-semibold mb-3 leading-snug">Loading estimate...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500 text-md mb-3 leading-snug">{error}</p>;
  } else if (estimatedPrice) {
     // Display the fetched price
    content = (
      <p className="text-center text-3xl font-semibold mb-3 leading-snug">
        {estimatedPrice}
      </p>
    );
  } else {
      // Fallback if loading is false but price isn't set (should be covered by error)
       content = <p className="text-center text-md mb-3 leading-snug">Could not load estimate.</p>;
  }


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

        {/* Display the dynamic content */}
        {content}

        {/* Description */}
        <p className="text-center text-sm text-gray mb-6 max-w-md mx-auto">
          This price is just an estimation. You can contact us or we will reach out to you within 1×24 hours to discuss further and ensure the project.
        </p>

        {/* CTA Button */}
        <div className="w-full max-w-lg mx-auto">
          <a
            href="https://wa.me/628990221068"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition flex justify-center"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}