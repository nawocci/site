export const UI_BUTTON_CLASSNAMES = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition duration-100 hover:bg-primary active:scale-[0.98]",
  secondary:
    "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold text-foreground transition duration-100 hover:border-primary hover:text-primary active:scale-[0.98]",
  navBack:
    "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 text-foreground font-semibold transition duration-100 hover:border-primary hover:text-primary sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
} as const;

export const UI_BLOG_CLASSNAMES = {
  datePill:
    "inline-flex w-fit max-w-full self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:px-3 sm:text-sm",
  articleLabel: { letterSpacing: "0.3em" },
  titleLabel: { letterSpacing: "0.25em" },
} as const;
