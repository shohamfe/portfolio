import { glowBlue, glowPurple } from "./errorScreen.variants";

/** Two blurred color circles behind the card - a CSS gradient wash instead
 *  of the design's pre-rendered blur images, so there's no asset to ship. */
const ErrorGlow: React.FC = () => {
  return (
    <>
      <div aria-hidden className={glowBlue} />
      <div aria-hidden className={glowPurple} />
    </>
  );
};

export default ErrorGlow;
