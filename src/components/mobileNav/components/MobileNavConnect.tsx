"use client";

import {
  FloatingPortal,
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PiLink, PiLinkBold } from "react-icons/pi";
import {
  CONNECT_LABEL,
  PANEL_EDGE_PADDING,
  PANEL_OFFSET,
  PANEL_TRANSITION,
} from "../constants/mobileNav.constants";
import ConnectPanel from "./ConnectPanel";
import {
  connectAnchor,
  connectPanel,
  navIconWrap,
  navItem,
  navLabel,
} from "./mobileNav.variants";

/** Nav item that opens a speed-dial style contact panel above itself. */
const MobileNavConnect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-end",
    /** Positions with top/left so the panel's own transform stays free to animate. */
    transform: false,
    middleware: [offset(PANEL_OFFSET), shift({ padding: PANEL_EDGE_PADDING })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { ancestorScroll: true });
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        ref={setReference}
        type="button"
        className={navItem}
        {...getReferenceProps()}
      >
        <span aria-hidden className={navIconWrap({ active: isOpen })}>
          {isOpen ? <PiLinkBold /> : <PiLink />}
        </span>

        <span className={navLabel({ active: isOpen })}>{CONNECT_LABEL}</span>
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={setFloating}
              style={floatingStyles}
              className={connectAnchor}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={PANEL_TRANSITION}
              {...getFloatingProps()}
            >
              <div className={connectPanel}>
                <ConnectPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default MobileNavConnect;
