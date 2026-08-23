import { cn } from "@/lib/cn";
import { chipVariants } from "./components/chip.variants";
import type { ChipProps } from "./types/chip.types";

/** Small rounded-full label used on the resume sticky cards. */
const Chip: React.FC<ChipProps> = ({
  children,
  color,
  variant,
  className,
  startContent,
}) => {
  return (
    <span className={cn(chipVariants({ color, variant }), className)}>
      {startContent && <span className="text-[20px]">{startContent}</span>}
      {children}
    </span>
  );
};

export default Chip;
