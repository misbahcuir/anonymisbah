import Hero from "./components/hero";
import Quote from "./components/quote";
import getquotes from "./lib/getQuotes";

export default async function Home() {
  let quotes = [];
  let error = null;

  try {
    quotes = await getquotes();
    console.log(quotes);
  } catch (err) {
    console.error("Error fetching quotes:", err);
    error = "Failed to load quotes";
  }

  return (
    <main>
      <Hero></Hero>
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold text-center my-8">
          Quotes and their Replies
        </h1>
        {error ? (
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
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
