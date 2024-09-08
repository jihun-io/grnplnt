import Image from "next/image";
import HeroCarousel from "../components/hero-carousel";

export default function Home() {
  return (
    <main className="w-[100vw]">
      <section className="hero">
        <HeroCarousel />
      </section>
      <section className="synopsis"></section>
      <section className="character"></section>
      <section className="more"></section>
    </main>
  );
}
