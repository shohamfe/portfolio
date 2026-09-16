export interface MagicCardProps {
  children: React.ReactNode;
  /** Radius of the glow, in pixels. */
  gradientSize?: number;
  glowColor: string;
  glowOpacity?: number;
  className?: string;
}
