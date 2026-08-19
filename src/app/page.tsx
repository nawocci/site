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

const bioText =
  "Hi, I\u2019m Naufal Altaf, based in Indonesia. I write, code, and build things I use. I dive into bleeding-edge tech to solve problems that I encounter, and I usually keep learning by building small things that solve real problems along the way.";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <div className="flex w-full flex-1 items-start py-4 sm:items-center sm:py-8">
        <section className="relative w-full overflow-hidden font-mono sm:rounded-3xl sm:border sm:border-border sm:bg-background sm:p-8 motion-scale-in">

          {/* ── Desktop layout ── */}
          <div className="hidden sm:block">
            <div className="space-y-6">
              <p
                className="motion-fade-up text-xs uppercase text-muted-foreground"
                style={{ letterSpacing: "0.2em" }}
              >
                profile.md
              </p>
              <div className="rounded-2xl border border-border bg-background p-8 shadow-elevated motion-fade-up motion-delay-1">
                <p className="text-xs text-muted-foreground">title:</p>
                <h1
                  className="mt-2 text-5xl font-bold tracking-tight md:text-6xl motion-fade-up motion-delay-2"
                  style={{ lineHeight: 0.95 }}
                >
                  Developer &amp; Analyst
                </h1>
                <div className="mt-5 flex flex-wrap gap-2 motion-fade-up motion-delay-2">
                  {heroPills.map((pill) => (
                    <span
                      key={pill.label}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/60"
                    >
                      <pill.icon className="h-3.5 w-3.5 text-primary" />
                      {pill.label}
                    </span>
                  ))}
                </div>
                <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-foreground/80 motion-fade-up motion-delay-3">
                  {bioText}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 motion-fade-up motion-delay-3">
                <a
                  href="/cv-naufal-altaf-2026-06-28.pdf"
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
          </div>

          {/* ── Mobile layout ── */}
          <div className="sm:hidden">
            <div className="space-y-4 rounded-2xl border border-border bg-background p-4 shadow-elevated">
              <p
                className="text-xs uppercase text-muted-foreground"
                style={{ letterSpacing: "0.2em" }}
              >
                profile.md
              </p>

              <div className="space-y-5 rounded-xl border border-border bg-background p-4 shadow-elevated">
                <p className="text-xs text-muted-foreground">title:</p>

                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ lineHeight: 0.95 }}
                >
                  Developer &amp; Analyst
                </h1>

                <div className="flex flex-wrap gap-2">
                  {heroPills.map((pill) => (
                    <span
                      key={pill.label}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/60"
                    >
                      <pill.icon className="h-3.5 w-3.5 text-primary" />
                      {pill.label}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {bioText}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="/cv-naufal-altaf-2026-06-28.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-md transition duration-100 hover:bg-primary hover:shadow-lg active:scale-[0.98]"
                >
                  Download CV
                  <FiDownload className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/nawocci?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border px-4 py-3 text-sm font-semibold text-foreground transition duration-100 hover:border-primary hover:text-primary active:scale-[0.98]"
                >
                  View Projects
                  <FiGithub className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
