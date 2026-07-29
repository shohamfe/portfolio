"use client";

import { useEffect, useState } from "react";
import { PiShareNetwork } from "react-icons/pi";
import FolderBody from "@/components/folder/components/FolderBody";
import FolderSheet from "@/components/folder/components/FolderSheet";
import { folderRoot, folderStack, sheetRow } from "@/components/folder/components/folder.variants";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { TECH_FOLDERS } from "@/constants/tech";

const [reactFolder] = TECH_FOLDERS;
const [leftSheet, rightSheet] = reactFolder.sheets;

/** Shown instead of the real site below the `lg` breakpoint (see
 *  MobileRedirect) - there is no mobile layout yet, so this just points the
 *  visitor back to a desktop browser. The React folder from the home canvas
 *  is reused as-is rather than drawn again for a page with no other art. */
const MobilePage: React.FC = () => {
  const [url, setUrl] = useState("");
  const [roleLabel, setRoleLabel] = useState(resolveRoleLabel(undefined));

  useEffect(() => {
    setUrl(window.location.origin);
    setRoleLabel(
      resolveRoleLabel(new URLSearchParams(window.location.search).get(ROLE_QUERY_PARAM) ?? undefined)
    );
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url, title: SITE.name });
      } catch {
        // Cancelled by the user - nothing to do.
      }
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="font-display text-h1 text-text-strong">{SITE.name}</h1>

      <figure className={folderRoot}>
        <div className={folderStack}>
          <div className={sheetRow}>
            <FolderSheet id="mobile-folder-sheet-left" sheet={leftSheet} side="left" />

            <FolderSheet id="mobile-folder-sheet-right" sheet={rightSheet} side="right" />
          </div>

          <FolderBody id="mobile-folder-body" logo={reactFolder.logo} />
        </div>

        <figcaption className="text-center font-body text-[16px] font-medium text-black">
          {roleLabel.primary}
          {roleLabel.secondary && (
            <>
              <br />
              <span className="text-text-muted">{roleLabel.secondary}</span>
            </>
          )}
        </figcaption>
      </figure>

      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-h5 text-text-strong">
          This portfolio is best
          <br />
          viewed on desktop
        </h2>

        <p className="max-w-xs text-center font-body text-body text-text-muted">
          Open this link on a desktop browser to continue exploring my software engineering case
          studies.
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <p className="w-full rounded-full border border-solid border-border-subtle px-4 py-2 font-body text-small text-accent">
          {url}
        </p>

        <button
          type="button"
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 font-body text-body text-accent-foreground"
        >
          <PiShareNetwork aria-hidden className="size-5" />
          Share desktop link
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="font-body text-small text-accent underline underline-offset-4"
        >
          Copy link to clipboard
        </button>
      </div>
    </main>
  );
};

export default MobilePage;
