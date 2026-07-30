import { SITE } from "@/constants/site";
import { PiDownloadSimple } from "react-icons/pi";
import Magnetic from "../magnetic/Magnetic";
import SiteNav from "../siteNav/SiteNav";
import {
  downloadButton,
  resumeHeaderName,
  resumeHeaderRoot,
} from "./styles/resumeHeader.variants";

const ResumeHeader = () => {
  return (
    <header id="resume-header" className={resumeHeaderRoot}>
      <h1 className={resumeHeaderName}>{SITE.name}</h1>

      <SiteNav
        className="pointer-events-auto w-fit"
        trailing={
          <Magnetic>
            <a href={SITE.cvPath} download className={downloadButton}>
              <PiDownloadSimple aria-hidden />

              <Magnetic>Download CV</Magnetic>
            </a>
          </Magnetic>
        }
      />
    </header>
  );
};

export default ResumeHeader;
