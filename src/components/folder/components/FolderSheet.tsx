import { sheetIcon, sheetIconBadge, sheetVariants } from "./folder.variants";
import type { FolderSheetProps } from "../types/folder.types";

/** One coloured sticky note behind the folder body, carrying an icon badge
 *  that hints at what the technology does. */
const FolderSheet: React.FC<FolderSheetProps> = ({ id, sheet, side }) => {
  return (
    <div id={id} className={sheetVariants({ color: sheet.color, side })}>
      <span id={`${id}-badge`} className={sheetIconBadge}>
        <sheet.Icon aria-hidden className={sheetIcon} />
      </span>
    </div>
  );
};

export default FolderSheet;
