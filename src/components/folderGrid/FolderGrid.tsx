import Folder from "@/components/folder/Folder";
import { TECH_FOLDERS } from "@/constants/tech";

/** Static grid of technology folders. Phase 2 turns this into a draggable
 *  canvas; the folder markup stays the same. */
const FolderGrid: React.FC = () => {
  return (
    <ul className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
      {TECH_FOLDERS.map((folder) => (
        <li key={folder.id}>
          <Folder folder={folder} />
        </li>
      ))}
    </ul>
  );
};

export default FolderGrid;
