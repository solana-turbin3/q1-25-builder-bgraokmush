import ASCIIText from "@/components/ASCIIText";
import { NavBar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <NavBar />

      <main className="relative mx-auto flex flex-col">
        <section className="w-full h-screen relative">
          <ASCIIText text="AgenNFT" enableWaves={true} asciiFontSize={8} />
        </section>
      </main>
    </>
  );
}
