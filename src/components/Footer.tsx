const socialLinks = [
  { href: "https://github.com/nawocci", label: "GitHub", isExternal: true },
  { href: "https://x.com/nawocci", label: "Twitter", isExternal: true },
  { href: "https://instagram.com/nawocci", label: "Instagram", isExternal: true },
  { href: "https://linkedin.com/in/naufal-altaf-059ab5326", label: "LinkedIn", isExternal: true },
  { href: "mailto:naufal@altaf.xyz", label: "Email", isExternal: false },
];

export default function Footer() {
  return (
    <footer className="w-full py-6 font-mono text-center text-xs sm:py-8 sm:text-sm">
      <p>&copy; {new Date().getFullYear()} Naufal Altaf.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-y-0">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.isExternal ? "_blank" : undefined}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            className="hover:text-primary hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
