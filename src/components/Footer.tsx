export default function Footer() {
  return (
    <footer className="w-full py-6 font-mono text-center text-xs sm:py-8 sm:text-sm">
      <p>&copy; {new Date().getFullYear()} Naufal Altaf.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-y-0">
        <a href="https://github.com/nawocci" className="hover:text-primary hover:underline">GitHub</a>
        <a href="https://x.com/nawocci" className="hover:text-primary hover:underline">Twitter</a>
        <a href="https://instagram.com/nawocci" className="hover:text-primary hover:underline">Instagram</a>
        <a href="https://linkedin.com/in/naufal-altaf-059ab5326" className="hover:text-primary hover:underline">LinkedIn</a>
        <a href="mailto:naufal@altaf.xyz" className="hover:text-primary hover:underline">Email</a>
      </div>
    </footer>
  );
}
