import Image from "next/image";
import { cn } from "@/lib/cn";
import { sheetVariants } from "./components/folder.variants";
import type { FolderProps } from "./types/folder.types";

/** A single technology folder: two rotated sticky-note sheets tucked behind a
 *  frosted folder body that holds the technology's logo card.
 *
 *  Sizes, radii, shadows and the -64px overlap all come from the Figma folder
 *  component. Static here — dragging is layered on by the canvas. */
const Folder: React.FC<FolderProps> = ({ folder, className }) => {
  const [leftSheet, rightSheet] = folder.sheets;

  return (
    <figure
      className={cn("flex h-[196px] w-[175px] flex-col items-center justify-end gap-4", className)}
    >
      <div className="flex h-40 w-full flex-col items-center justify-end">
        <div className="relative z-0 mb-[-64px] flex items-center justify-center">
          <div className={sheetVariants({ color: leftSheet.color, side: "left" })}>
            <span className="flex items-center justify-center rounded-full bg-default-300 p-1">
              <leftSheet.Icon aria-hidden className="size-4" />
            </span>
          </div>

          <div className={sheetVariants({ color: rightSheet.color, side: "right" })}>
            <span className="flex items-center justify-center rounded-full bg-default-300 p-1">
              <rightSheet.Icon aria-hidden className="size-4" />
            </span>
          </div>
        </div>

        <div className="relative z-10 flex h-[125px] w-full items-center justify-center rounded-[32px] border-2 border-solid border-white bg-white/60 p-1 shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] backdrop-blur-[20px]">
          <div className="flex size-[60px] items-center justify-center overflow-clip rounded-2xl bg-white p-2.5 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <Image
              src={folder.logo}
              alt=""
              width={40}
              height={40}
              className="size-10 object-contain"
            />
          </div>
        </div>
      </div>

      <figcaption className="text-center font-body text-[16px] font-medium text-black">
        {folder.label}
      </figcaption>
    </figure>
  );
};

export default Folder;
