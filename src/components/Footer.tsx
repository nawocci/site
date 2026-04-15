export default function Footer() {
  return (
    <footer className="w-full py-8 font-mono text-center text-sm">
      <div className="mx-auto max-w-5xl px-6 sm:px-0">
        <p>&copy; {new Date().getFullYear()} Naufal Altaf.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="https://github.com/nawocci" className="hover:text-primary hover:underline">GitHub</a>
          <a href="https://x.com/nawocci" className="hover:text-primary hover:underline">Twitter</a>
          <a href="https://instagram.com/nawocci" className="hover:text-primary hover:underline">Instagram</a>
          <a href="https://linkedin.com/in/naufal-altaf-059ab5326" className="hover:text-primary hover:underline">LinkedIn</a>
          <a href="mailto:naufal@altaf.xyz" className="hover:text-primary hover:underline">Email</a>
        </div>
      </div>
    </footer>
  );
}
