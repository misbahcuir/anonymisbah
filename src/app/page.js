import Hero from "./components/hero";
import Qoute from "./components/qoute";
import getQoutes from "./lib/getQoutes";

export default async function Home() {
  const qoutes = await getQoutes();
  console.log(qoutes);

  return (
    <main>
      <Hero></Hero>
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold text-center my-8">
          Qoutes and their Replies
        </h1>
        <div className="p-8 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qoutes.map((qoutes) => (
            <Qoute key={qoutes.id} q={qoutes}></Qoute>
          ))}
        </div>
      </div>
    </main>
  );
}
