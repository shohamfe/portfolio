import Image from "next/image";
import { cn } from "@/lib/cn";
import { sheetVariants } from "./components/folder.variants";
import type { FolderProps } from "./types/folder.types";

/** A single technology folder: two coloured sheets peeking out from behind a
 *  translucent folder body carrying the technology's logo. Static here —
 *  dragging is layered on by the canvas that renders it. */
const Folder: React.FC<FolderProps> = ({ folder, className }) => {
  const [leftSheet, rightSheet] = folder.sheets;

  return (
    <figure className={cn("flex w-28 flex-col items-center gap-2", className)}>
      <div className="relative h-24 w-28">
        <div className={sheetVariants({ color: leftSheet.color, side: "left" })}>
          <leftSheet.Icon aria-hidden className="size-4" />
        </div>

        <div className={sheetVariants({ color: rightSheet.color, side: "right" })}>
          <rightSheet.Icon aria-hidden className="size-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-center rounded-2xl bg-surface-raised/70 shadow-lg backdrop-blur-xl">
          <Image src={folder.logo} alt="" width={40} height={40} className="size-10 object-contain" />
        </div>
      </div>

      <figcaption className="font-ui text-tiny text-text-muted">{folder.label}</figcaption>
    </figure>
  );
};

export default Folder;
