# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# System Instructions for This Project

Always follow these rules unless explicitly instructed otherwise:

* **Readability is the top priority.** When any two approaches work, pick the one that reads more clearly — even if it is longer. Concretely:
  * Name things fully. Never use single-letter or cryptic identifiers (`r`, `e`, `p`, `acc`) — write `resource`, `employee`, `preset`. The only accepted short names are conventional loop indices (`i`) and `_` for a deliberately unused argument.
  * Prefer an explicit, named intermediate value over a dense one-liner.
  * Prefer explicit object keys over spreads when the shape matters to a consumer.
  * A reader who has never seen the file should understand it without reconstructing your reasoning.

* **One component per file — never two.** Each file holds exactly one React component, and the file name matches the component name (`SideBarItem.tsx` exports `SideBarItem`). This applies to tiny presentational helpers too — if it returns JSX and is used as `<Foo />`, it gets its own file.

* **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict. See the note at the top of this file — this Next.js version does not match your training data, so check `node_modules/next/dist/docs/` before relying on remembered APIs.
* **TypeScript:** Write strict and clean TS. Never use `any`, `@ts-expect-error`, or `@ts-ignore`.

* **Styling:** Use Tailwind CSS v4 utility classes exclusively, composed through `cn()` (`src/lib/cn.ts`, a `clsx` + `tailwind-merge` wrapper). Do not use plain CSS files, CSS modules, or a CSS-in-JS library.
  * Never reach for an arbitrary value (`text-[#dfb5fd]`, `p-[16px]`, `text-[16px]`) when a token from the design system already covers it. Use the semantic tokens defined in `src/app/globals.css`:
    * Colors: `bg-surface-page`, `bg-surface-raised`, `bg-surface-sunken`, `text-text-strong`, `text-text-muted`, `text-text-inverse`, `text-text-dormant`, `border-border-subtle`, `bg-accent` / `text-accent-foreground`.
    * Type scale: `text-h1`, `text-h2`, `text-h5`, `text-code`, `text-body`, `text-small`, `text-tiny` (each carries its own line-height — do not pair with a separate `leading-*`).
    * Fonts: `font-display`, `font-body`, `font-code`, `font-ui`.
    * Named shadows: `shadow-folder`, `shadow-logo-card`, `shadow-note`, `shadow-nav`.
    * Raw palette primitives (`--color-primary-300`, `--color-default-600`, etc.) exist only to feed the semantic layer — do not read them directly from a component; go through the semantic token, or add one if the role you need doesn't exist yet.
  * Class strings with more than a couple of conditional or variant-driven classes belong in a `class-variance-authority` (CVA) definition in a `*.variants.ts` file, not inlined as a template-string or ternary soup in the JSX. Keep genuinely static, unconditional classes inline.
  * Shared, cross-component interaction classes (e.g. pressed/hover states used by several controls) live in `src/lib/variants.ts` as plain exported class-string constants, so related components can't drift apart.

* **Component Structure:**
  Folder name: camelCase. Example using a `sideBar` component:
  ```
  components/
    sideBar/
      SideBar.tsx                  ← component only (no variant definitions, no helpers, no types)
      types/
        sideBar.types.ts           ← TypeScript interfaces and types
      helpers/
        sideBar.helpers.ts         ← pure vanilla TS helper functions
      hooks/
        sideBar.hooks.ts           ← component-specific React hooks
      constants/
        sideBar.constants.ts       ← component-specific constants
      components/
        sideBar.variants.ts        ← CVA / class-string variants used by SideBar
        SideBarItem.tsx            ← sub-components, each in its own file
        SideBarFooter.tsx
  ```
  * Only create the sub-folders that are actually needed.
  * Break large components into smaller focused sub-components placed in the `components/` sub-folder.
  * For a page under `src/app/**`, the same idea applies but the variants file lives in a sibling `styles/` folder (e.g. `src/app/resume/styles/resumePage.variants.ts`) rather than `components/`, since a route segment has no component folder of its own.

* **Component Implementation:**
  * Component arrow functions must be typed as `React.FC<Props>` when the component accepts props, or `React.FC` when it does not.
    ```tsx
    const SideBar: React.FC<SideBarProps> = ({ items }) => { ... };
    const SideBar: React.FC = () => { ... }; // no props
    ```
  * Regular arrow functions (handlers, callbacks) are plain arrow functions — do NOT use `React.FC` on them.
  * Name Props interfaces as `[ComponentName]Props` (e.g., `SideBarProps`).
  * Preserve a blank line between distinct logical sections inside a function (hooks block, derived values, handlers) and between groups of JSX children inside a return, including before a closing parent tag:
    ```tsx
    return (
      <ItemRoot isActive={isActive} onClick={onClick} role="button" tabIndex={0}>
        {isActive && <ActiveIndicator />}
        <ItemLabel isActive={isActive}>{label}</ItemLabel>

      </ItemRoot>
    );
    ```

* **Naming Conventions:**
  * Components and their files: `PascalCase` (e.g., `SideBar.tsx`, `SideBarItem.tsx`).
  * All other files (variants, helpers, hooks, types, constants): `camelCase` with a dot-suffix (e.g., `sideBar.variants.ts`, `sideBar.hooks.ts`).
  * Functions and variables: `camelCase` (e.g., `handleClose`).

* **Imports:**
  * Use the `@/` absolute alias (e.g., `import { cn } from '@/lib/cn'`). Avoid deep relative paths like `../../../`.

* **Desktop / Mobile split:**
  * Viewport-dependent UI is split into separate component trees, switched at render time by `ViewportSwitch` (`src/components/viewportSwitch`), not by conditional Tailwind breakpoint classes sprinkled through one component. See `HomeIntro` vs `MobileHome`, `ResumeStage` vs `MobileResume`.

* **Copy & user-facing text:**
  * There is no i18n library in this project. All user-facing copy lives in `src/content/*.ts` as an exported `const` object per page/section (e.g. `HOME_CONTENT` in `src/content/home.ts`, `src/content/resume.ts`, `src/content/error.ts`), declared `as const` and imported into the components that render it. Never hardcode copy strings inline in a component — add or extend an entry in the relevant content file instead.

* **Constants:**
  * Cross-cutting, non-copy constants live in `src/constants/*.ts`, one file per concern (`site.ts`, `mobile.ts`, `canvas.ts`, `tech.ts`, `resume.ts`). Component-local constants live in that component's own `constants/[name].constants.ts`.
  * Avoid hardcoded strings and magic numbers — extract them to the appropriate constants file.

* **Animation & scrolling:**
  * Use `motion` (Framer Motion) for animation and `lenis` for smooth scroll. Don't hand-roll animation with raw CSS transitions/keyframes when the component already needs JS-driven motion.

* **Icons:**
  * Use `react-icons`. Do not create custom SVG icon components.

* **Analytics:**
  * Google Analytics is wired through `@next/third-parties/google`.

* **Best Practices:**
  * Comments: **The default is no comment.** Write code that explains itself through naming and structure instead. A comment is the exception, and the bar is high: only when the code cannot say it itself — a non-obvious constraint, a bug being prevented, a deliberate trade-off. Before writing one, ask "would a competent reader be confused without this?" If no, delete it.
    * Do NOT explain what the code does, restate a name, justify a change, or narrate reasoning ("now we do X", "this used to be Y", "fetch only rejects on network errors, so...").
    * Do NOT add a doc block to every function, type, hook, or component just because one exists elsewhere. Most need none.
    * Do NOT reference things the reader does not have: spec sections, ticket numbers, review comments, chat history.
    * When a comment IS warranted, one line. Never a multi-line block explaining a one-line change.
    * All comments must be written in English.
  * Keep files small and focused. Split large components into sub-components in the `components/` sub-folder; move pure logic to `helpers/`, React logic to `hooks/`. A component file that needs scrolling to understand is a signal to split.
  * Optimization: Use `useMemo` and `useCallback` only when necessary for performance, not by default.

* **Formatting & tooling:**
  * Prettier (with `prettier-plugin-tailwindcss`, which sorts class lists) is the formatter — run `npm run format`, don't hand-order classes.
  * ESLint uses the flat config in `eslint.config.mjs`, built on `eslint-config-next`. Fix lint issues rather than disabling rules.
  * husky + lint-staged run Prettier on staged files at commit time.
  * Tests run with Vitest via `npm test`. Co-locate or mirror the structure of the code under test and prefer testing behavior over implementation details.

* **Preferred Libraries:**
  * Styling: Tailwind CSS v4, `class-variance-authority`, `clsx`, `tailwind-merge` (via `cn()`)
  * Animation: `motion` (Framer Motion)
  * Smooth scroll: `lenis`
  * Icons: `react-icons`
  * Positioning/overlays: `@floating-ui/react`
  * Analytics: `@next/third-parties/google`
  * Testing: `vitest`
