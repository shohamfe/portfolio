import Image from "next/image";
import { folderBody, logoCard, logoImage } from "./folder.variants";
import type { FolderBodyProps } from "../types/folder.types";

/** The frosted folder body and the white card holding the logo. */
const FolderBody: React.FC<FolderBodyProps> = ({ id, logo }) => {
  return (
    <div id={id} className={folderBody}>
      <div id={`${id}-card`} className={logoCard}>
        <Image src={logo} alt="" width={40} height={40} className={logoImage} />
      </div>
    </div>
  );
};

export default FolderBody;
