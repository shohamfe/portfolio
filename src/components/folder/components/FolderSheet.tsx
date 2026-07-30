import Magnetic from "@/components/magnetic/Magnetic";
import type { FolderSheetProps } from "../types/folder.types";
import {
  sheetIconBadgeVariants,
  sheetIconVariants,
  sheetVariants,
} from "./folder.variants";

/** One coloured sticky note behind the folder body, carrying an icon badge
 *  that hints at what the technology does. */
const FolderSheet: React.FC<FolderSheetProps> = ({ id, sheet, side }) => {
  return (
    <Magnetic actionArea="global">
      <div id={id} className={sheetVariants({ color: sheet.color, side })}>
        <span
          id={`${id}-badge`}
          className={sheetIconBadgeVariants({ color: sheet.color })}
        >
          <sheet.Icon
            aria-hidden
            className={sheetIconVariants({ color: sheet.color })}
          />
        </span>
      </div>
    </Magnetic>
  );
};

export default FolderSheet;
