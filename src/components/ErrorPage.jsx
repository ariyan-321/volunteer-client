import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  useEffect(() => {
    document.title = "ErrorPage";
  });
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-100 to-green-300 text-green-800 text-center p-5">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold mb-6 drop-shadow-md">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-700 max-w-xl mb-8 leading-relaxed">
        Oops! The page you are looking for doesn't exist. It might have been
        removed, or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="btn btn-success btn-lg shadow-lg hover:scale-105 transform transition-transform duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
}
