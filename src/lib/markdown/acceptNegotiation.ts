import {
  ACCEPT_HEADER,
  PRODUCIBLE_MEDIA_TYPES,
  VARY_HEADER,
} from "@/lib/markdown/constants";

interface AcceptEntry {
  mediaType: string;
  quality: number;
  specificity: number;
  position: number;
}

const WILDCARD = "*/*";
const SUBTYPE_WILDCARD_SUFFIX = "/*";

const QUALITY_WHEN_ABSENT = 1;
const WILDCARD_SPECIFICITY = 0;
const SUBTYPE_WILDCARD_SPECIFICITY = 1;
const EXACT_SPECIFICITY = 2;

const specificityOf = (mediaType: string): number => {
  if (mediaType === WILDCARD) return WILDCARD_SPECIFICITY;
  if (mediaType.endsWith(SUBTYPE_WILDCARD_SUFFIX)) {
    return SUBTYPE_WILDCARD_SPECIFICITY;
  }

  return EXACT_SPECIFICITY;
};

const parseQuality = (parameters: string[]): number => {
  for (const parameter of parameters) {
    const [name, value] = parameter.split("=").map((part) => part.trim());
    if (name.toLowerCase() !== "q") continue;

    const parsed = Number(value);
    if (Number.isNaN(parsed)) continue;

    return Math.min(Math.max(parsed, 0), 1);
  }

  return QUALITY_WHEN_ABSENT;
};

export const parseAcceptHeader = (header: string): AcceptEntry[] =>
  header
    .split(",")
    .map((rawEntry, position) => {
      const [rawMediaType, ...parameters] = rawEntry
        .split(";")
        .map((part) => part.trim());

      return {
        mediaType: rawMediaType.toLowerCase(),
        quality: parseQuality(parameters),
        specificity: specificityOf(rawMediaType.toLowerCase()),
        position,
      };
    })
    .filter((entry) => entry.mediaType.length > 0);

const entryMatches = (entry: AcceptEntry, candidate: string): boolean => {
  if (entry.mediaType === WILDCARD) return true;
  if (entry.mediaType.endsWith(SUBTYPE_WILDCARD_SUFFIX)) {
    return candidate.startsWith(entry.mediaType.slice(0, -1));
  }

  return entry.mediaType === candidate;
};

/** RFC 9110 section 12.5.1: a more specific range overrides a less specific one
 *  regardless of q, so `text/html;q=0` followed by a catch-all wildcard rejects
 *  HTML rather than letting the wildcard revive it. */
const bestMatchFor = (
  entries: AcceptEntry[],
  candidate: string,
): AcceptEntry | null => {
  let best: AcceptEntry | null = null;

  for (const entry of entries) {
    if (!entryMatches(entry, candidate)) continue;

    const isMoreSpecific =
      best === null || entry.specificity > best.specificity;
    const isEarlierAtSameSpecificity =
      best !== null &&
      entry.specificity === best.specificity &&
      entry.position < best.position;

    if (isMoreSpecific || isEarlierAtSameSpecificity) {
      best = entry;
    }
  }

  return best;
};

/** Returns the media type to serve, or `null` when the client has rejected every
 *  representation on offer - the only case that warrants a 406. A missing or
 *  unparseable header is no constraint at all, so it gets the default. */
export const negotiateMediaType = (
  acceptHeader: string | null,
  producibleTypes: readonly string[] = PRODUCIBLE_MEDIA_TYPES,
): string | null => {
  const defaultType = producibleTypes[0] ?? null;

  if (acceptHeader === null || acceptHeader.trim().length === 0) {
    return defaultType;
  }

  const entries = parseAcceptHeader(acceptHeader);
  if (entries.length === 0) return defaultType;

  let chosenType: string | null = null;
  let chosenQuality = 0;
  let chosenPosition = Number.POSITIVE_INFINITY;

  for (const candidate of producibleTypes) {
    const match = bestMatchFor(entries, candidate);
    if (match === null || match.quality <= 0) continue;

    const isHigherQuality = match.quality > chosenQuality;
    const isEarlierAtSameQuality =
      match.quality === chosenQuality && match.position < chosenPosition;

    if (isHigherQuality || isEarlierAtSameQuality) {
      chosenType = candidate;
      chosenQuality = match.quality;
      chosenPosition = match.position;
    }
  }

  return chosenType;
};

/** Media types are case-insensitive; a wildcard does not count as naming one. */
export const namesMediaType = (
  acceptHeader: string | null,
  mediaType: string,
): boolean => {
  if (acceptHeader === null) return false;

  return parseAcceptHeader(acceptHeader).some(
    (entry) => entry.mediaType === mediaType,
  );
};

/** True only when the client named this type and gave it `q=0`; silence is no
 *  constraint, which is what lets a `.md` URL answer a request that never asked. */
export const explicitlyRejects = (
  acceptHeader: string | null,
  mediaType: string,
): boolean => {
  if (acceptHeader === null || acceptHeader.trim().length === 0) return false;

  const match = bestMatchFor(parseAcceptHeader(acceptHeader), mediaType);

  return match !== null && match.quality <= 0;
};

/** Next sets its own `vary` (rsc, next-router-state-tree, ...) on App Router
 *  responses, so `Accept` is merged into whatever is already there. */
export const mergeVaryWithAccept = (existingVary: string | null): string => {
  if (existingVary === null || existingVary.trim().length === 0) {
    return ACCEPT_HEADER;
  }

  const alreadyVariesOnAccept = existingVary
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .includes(ACCEPT_HEADER.toLowerCase());

  if (alreadyVariesOnAccept) return existingVary;

  return `${existingVary}, ${ACCEPT_HEADER}`;
};

export const applyVaryAccept = (headers: Headers): void => {
  headers.set(VARY_HEADER, mergeVaryWithAccept(headers.get(VARY_HEADER)));
};
