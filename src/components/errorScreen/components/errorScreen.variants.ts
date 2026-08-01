export const errorScreenRoot =
  "dot-grid relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-6 py-8";

const glowCircleBase =
  "pointer-events-none absolute size-[600px] rounded-full blur-[120px]";

export const glowBlue = `${glowCircleBase} -left-[100px] -top-[100px] bg-primary/30`;

export const glowPurple = `${glowCircleBase} -bottom-[100px] -right-[100px] bg-secondary/25`;

export const desktopCard =
  "relative z-10 flex w-[720px] flex-col items-center gap-10 rounded-[32px] border-[1.5px] border-white/90 bg-white/56 p-16 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.05)] backdrop-blur-[15px]";

export const desktopHeroTitle = "flex flex-col items-center gap-2 text-center";

export const desktopName =
  "font-display text-h2 font-extrabold text-text-strong";

export const desktopRole = "font-display text-h5 text-text-strong";

export const desktopTagline = "font-code text-code text-text-muted";

export const desktopMessage =
  "font-body text-[24px] font-semibold text-text-strong text-center";

export const mobileCard =
  "relative z-10 flex w-full flex-col items-center gap-6 rounded-3xl border-[1.5px] border-white/90 bg-white/56 p-8 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.03)] backdrop-blur-[10px]";

export const mobileHeroTitle = "flex flex-col items-center gap-1 text-center";

export const mobileName =
  "font-display text-[24px] font-extrabold text-text-strong";

export const mobileRole = "font-display text-[16px] text-text-strong";

export const mobileTagline = "font-code text-[13px] text-text-muted";

export const mobileMessage =
  "font-display text-[16px] text-text-strong text-center";
