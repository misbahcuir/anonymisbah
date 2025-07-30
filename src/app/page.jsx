"use client";
import { useEffect, useState } from "react";
import Hero from "./components/hero";
import Quote from "./components/quote";
import getquotesClient from "./lib/getQuotesClient";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getquotesClient();
        setQuotes(data);
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setError("Failed to load quotes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <main>
      <Hero></Hero>
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold text-center my-8 text-white">
          Quotes and their Replies
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            <p>No quotes available at the moment.</p>
          </div>
        ) : (
          <div className="p-8 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quotes.map((quote) => (
              <Quote key={quote.id} q={quote} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
