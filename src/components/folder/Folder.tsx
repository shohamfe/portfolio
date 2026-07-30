import { cn } from "@/lib/cn";
import FolderBody from "./components/FolderBody";
import FolderSheet from "./components/FolderSheet";
import { folderLabel, folderRoot, folderStack, sheetRow } from "./components/folder.variants";
import type { FolderProps } from "./types/folder.types";
import Magnetic from "../magnetic/Magnetic";

/** A single technology folder: two rotated sticky notes tucked behind a
 *  frosted body that holds the technology's logo card. Static here - dragging
 *  is layered on by the canvas that renders it. */
const Folder: React.FC<FolderProps> = ({ folder, className }) => {
  const [leftSheet, rightSheet] = folder.sheets;
  const id = `folder-${folder.id}`;

  return (
    <Magnetic actionArea="global" range={250} >
      <figure id={id} className={cn(folderRoot, className)}>
        <div id={`${id}-stack`} className={folderStack}>
          <div id={`${id}-sheets`} className={sheetRow}>
            <FolderSheet id={`${id}-sheet-left`} sheet={leftSheet} side="left" />

            <FolderSheet id={`${id}-sheet-right`} sheet={rightSheet} side="right" />
          </div>

          <FolderBody id={`${id}-body`} logo={folder.logo} />
        </div>

        <figcaption id={`${id}-label`} className={folderLabel}>
          {folder.label}
        </figcaption>
      </figure>
    </Magnetic>
  );
};

export default Folder;
