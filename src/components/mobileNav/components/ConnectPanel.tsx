"use client";

import IconButton from "@/components/iconButton/IconButton";
import { CONTACT_ITEMS, SOCIAL_LINKS } from "@/constants/contact";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { PiCheck, PiCopy } from "react-icons/pi";
import { COPIED_MESSAGE } from "../constants/mobileNav.constants";
import {
  connectDivider,
  connectRow,
  connectRowIcon,
  connectRowStatus,
  connectRowValue,
  connectSocials,
} from "./mobileNav.variants";

const ConnectPanel: React.FC = () => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      {CONTACT_ITEMS.map((item) => {
        const copied = copiedText === item.text;

        return (
          <button
            key={item.text}
            type="button"
            aria-label={item.copyLabel}
            onClick={() => copyToClipboard(item.text)}
            className={connectRow}
          >
            <span aria-hidden className={connectRowIcon}>
              {item.icon}
            </span>

            <span className={connectRowValue}>{item.text}</span>

            <span aria-hidden className={connectRowStatus({ copied })}>
              {copied ? <PiCheck /> : <PiCopy />}
            </span>
          </button>
        );
      })}

      <span aria-hidden className={connectDivider} />

      <div className={connectSocials}>
        {SOCIAL_LINKS.map((link) => (
          <IconButton
            key={link.href}
            href={link.href}
            aria-label={link.label}
            icon={link.icon}
            size="lg"
            target="_blank"
            rel="noreferrer"
          />
        ))}
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {copiedText ? COPIED_MESSAGE : ""}
      </span>
    </>
  );
};

export default ConnectPanel;
