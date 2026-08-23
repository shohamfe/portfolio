"use client";

import IconButton from "@/components/iconButton/IconButton";
import { CONTACT_ITEMS, SOCIAL_LINKS } from "@/constants/contact";
import { PiCheck, PiCopy } from "react-icons/pi";
import { COPIED_MESSAGE } from "../constants/mobileNav.constants";
import { useCopyToClipboard } from "../hooks/mobileNav.hooks";
import {
  connectDivider,
  connectRow,
  connectRowIcon,
  connectRowStatus,
  connectRowValue,
  connectSocials,
} from "./mobileNav.variants";

const ConnectPanel: React.FC = () => {
  const { copiedValue, copy } = useCopyToClipboard();

  return (
    <>
      {CONTACT_ITEMS.map((item) => {
        const copied = copiedValue === item.text;

        return (
          <button
            key={item.text}
            type="button"
            aria-label={item.copyLabel}
            onClick={() => copy(item.text)}
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
            size="sm"
            target="_blank"
            rel="noreferrer"
          />
        ))}
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {copiedValue ? COPIED_MESSAGE : ""}
      </span>
    </>
  );
};

export default ConnectPanel;
