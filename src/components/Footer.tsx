export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full min-h-12 sm:min-h-16 text-secondary">
      <p className="px-4 text-center text-xs sm:text-base">
        &copy; {new Date().getFullYear()} Naufal Altaf. All rights reserved.
      </p>
    </footer>
  );
}