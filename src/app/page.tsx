import { FiBarChart2, FiCode, FiCpu, FiDownload, FiGithub, FiSmartphone } from "react-icons/fi";
import { FaAndroid } from "react-icons/fa";

const heroPills = [
  { label: "Data Analytics", icon: FiBarChart2 },
  { label: "Machine Learning", icon: FiCpu },
  { label: "Frontend", icon: FiCode },
  { label: "Mobile", icon: FiSmartphone },
  { label: "AOSP Development", icon: FaAndroid },
];

export default function Home() {
  return (
    <div className="w-full py-0 sm:py-10">
      <div className="flex w-full min-h-[calc(100svh-12rem)] items-center sm:block sm:min-h-0">
        <section className="relative w-full overflow-hidden rounded-3xl border border-border bg-background p-4 font-mono sm:p-8">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">profile.md</p>

            <div className="rounded-2xl border border-border bg-background p-4 sm:p-8">
              <p className="text-xs text-foreground/60">title:</p>
              <h1 className="mt-2 text-2xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                Developer &amp; Analyst
              </h1>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                {heroPills.map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground/80"
                  >
                    <pill.icon className="h-3.5 w-3.5 text-primary" />
                    {pill.label}
                  </span>
                ))}
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:mt-6 sm:text-lg">
                Hi, I&apos;m Naufal Altaf, based in Indonesia. I write, code, and build things I use. I dive into bleeding-edge tech to solve problems that I encounter, and I usually keep learning by building small things that solve real problems along the way.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary"
              >
                Download CV
                <FiDownload className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/nawocci?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
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
