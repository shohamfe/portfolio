import Image from "next/image";
import { folderBody, logoCard, logoImage } from "./folder.variants";
import type { FolderBodyProps } from "../types/folder.types";
import Magnetic from "@/components/magnetic/Magnetic";

/** The frosted folder body and the white card holding the logo. */
const FolderBody: React.FC<FolderBodyProps> = ({ id, logo }) => {
  return (
    <div id={id} className={folderBody}>
      <Magnetic actionArea="global" range={200} intensity={0.2}>
        <div id={`${id}-card`} className={logoCard}>
          <Image
            src={logo}
            alt=""
            width={40}
            height={40}
            draggable={false}
            className={logoImage}
          />
        </div>
      </Magnetic>
    </div>
  );
};

export default FolderBody;
