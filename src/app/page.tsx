import { FiBarChart2, FiCode, FiCpu, FiDownload, FiGithub, FiSmartphone } from "react-icons/fi";
import { FaAndroid } from "react-icons/fa";
import { UI_BUTTON_CLASSNAMES } from "@/lib/ui.classes";

const heroPills = [
  { label: "Data Analytics", icon: FiBarChart2 },
  { label: "Machine Learning", icon: FiCpu },
  { label: "Frontend", icon: FiCode },
  { label: "Mobile", icon: FiSmartphone },
  { label: "AOSP Development", icon: FaAndroid },
];

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <div className="flex w-full flex-1 items-start pt-2 sm:items-center sm:py-8">
        {/* Desktop: card with border chrome. Mobile: transparent, no borders */}
        <section className="relative w-full overflow-hidden font-mono sm:rounded-3xl sm:border sm:border-border sm:bg-background sm:p-7 motion-scale-in">
          <div className="space-y-5 sm:space-y-6">
            {/* "profile.md" label — desktop only */}
            <p
              className="hidden sm:block motion-fade-up text-xs uppercase text-foreground/60"
              style={{ letterSpacing: "0.2em" }}
            >
              profile.md
            </p>

            {/* Desktop: inner card. Mobile: no chrome, stacked sections */}
            <div className="sm:rounded-2xl sm:border sm:border-border sm:bg-background sm:p-7 motion-fade-up motion-delay-1">
              {/* "title:" label — desktop only */}
              <p className="hidden sm:block text-xs text-foreground/60">title:</p>

              {/* Section 1: Title */}
              <h1
                className="text-3xl font-bold tracking-tight sm:mt-2 sm:text-5xl md:text-6xl motion-fade-up motion-delay-2"
                style={{ lineHeight: 0.95 }}
              >
                Developer &amp; Analyst
              </h1>

              {/* Section 2: Skills — horizontal scroll on mobile, wrap on desktop */}
              <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none sm:mx-0 sm:mt-5 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 motion-fade-up motion-delay-2">
                {heroPills.map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/60"
                  >
                    <pill.icon className="h-3.5 w-3.5 text-primary" />
                    {pill.label}
                  </span>
                ))}
              </div>

              {/* Section 3: Bio */}
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-lg motion-fade-up motion-delay-3">
                Hi, I&apos;m Naufal Altaf, based in Indonesia. I write, code, and build things I use. I dive into bleeding-edge tech to solve problems that I encounter, and I usually keep learning by building small things that solve real problems along the way.
              </p>
            </div>

            {/* Section 4: CTA buttons */}
            <div className="flex flex-wrap gap-3 motion-fade-up motion-delay-3">
              <a
                href="/cv-naufal-altaf-2026-04-19.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={UI_BUTTON_CLASSNAMES.primary}
              >
                Download CV
                <FiDownload className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/nawocci?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={UI_BUTTON_CLASSNAMES.secondary}
              >
                View Projects
                <FiGithub className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
