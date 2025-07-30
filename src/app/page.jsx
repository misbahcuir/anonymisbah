import Hero from "./components/hero";
import Quote from "./components/quote";
import getquotes from "./lib/getQuotes";

export default async function Home() {
  const quotes = await getquotes();
  console.log(quotes);

  return (
    <main>
      <Hero></Hero>
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold text-center my-8">
          Quotes and their Replies
        </h1>
        <div className="p-8 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote) => (
            <Quote key={quote.id} q={quote} />
          ))}
        </div>
      </div>
    </main>
  );
}
