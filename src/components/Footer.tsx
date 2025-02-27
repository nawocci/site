export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full min-h-24 sm:min-h-32 text-secondary">
      <div className="flex flex-col items-center gap-2 text-center text-xs sm:text-sm">
        <p>
          &copy; {new Date().getFullYear()} Naufal Altaf. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lg:hover:underline lg:hover:text-primary"
          >
            GitHub
          </a>
          <a 
            href="https://x.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lg:hover:underline lg:hover:text-primary"
          >
            X
          </a>
          <a 
            href="https://instagram.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lg:hover:underline lg:hover:text-primary"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com/in/naufal-altaf-059ab5326" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lg:hover:underline lg:hover:text-primary"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:me@altaf.xyz"
            className="lg:hover:underline lg:hover:text-primary"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}