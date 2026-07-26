import Folder from "@/components/folder/Folder";
import { TECH_FOLDERS } from "@/constants/tech";

/** Static grid of technology folders. The 100px gutter comes from the Figma
 *  grid. Phase 2 turns this into a draggable canvas; the folder markup and
 *  spacing stay as they are. */
const FolderGrid: React.FC = () => {
  return (
    <ul className="flex flex-wrap content-start items-start gap-[100px]">
      {TECH_FOLDERS.map((folder) => (
        <li key={folder.id}>
          <Folder folder={folder} />
        </li>
      ))}
    </ul>
  );
};

export default FolderGrid;
