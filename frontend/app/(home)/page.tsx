import Cards from "@components/home/cards";

function Page() {
  return (
    <section className="mx-auto my-14 max-w-5xl px-8">
      <div className="mx-auto mb-12 max-w-2xl space-y-6">
        <a
          href="#"
          className="bg-gradient-to-r from-yellow-400 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl"
        >
          Plan
        </a>

        <p className="text-lg text-slate-300">
          Linear is a tool to remove barriers. Powerful yet simple to use, it
          helps you to plan ahead, make better decisions and execute faster. You
          don&apos;t have to come up with best practices for how to use Linear —
          we already built them directly into the product.
        </p>
      </div>

      <Cards />
    </section>
  );
}

export default Page;
