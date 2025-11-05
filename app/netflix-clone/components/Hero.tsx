import EmailForm from "./EmailForm";

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] md:h-[560px] bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://picsum.photos/seed/hero/1600/600')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">Unlimited movies, TV shows and more.</h1>
        <p className="mt-4 text-lg sm:text-2xl text-gray-200">Watch anywhere. Cancel anytime.</p>
        <div className="mt-6">
          <EmailForm />
        </div>
      </div>
    </section>
  );
}
