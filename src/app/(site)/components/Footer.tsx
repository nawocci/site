export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full min-h-32">
      <div className="flex flex-col items-center gap-2 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Naufal Altaf. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary hover:brightness-100"
          >
            GitHub
          </a>
          <a 
            href="https://x.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary hover:brightness-100"
          >
            Twitter
          </a>
          <a 
            href="https://instagram.com/nawocci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary hover:brightness-100"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com/in/naufal-altaf-059ab5326" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary hover:brightness-100"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:me@altaf.xyz"
            className="hover:underline hover:text-primary hover:brightness-100"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
