import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center space-y-8">
      <Hero />
      <SocialLinks />
    </main>
  );
}