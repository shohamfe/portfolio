<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# System Instructions for React Projects

Always follow these rules unless explicitly instructed otherwise:

* **Readability is the top priority.** When any two approaches work, pick the one that reads more clearly — even if it is longer. Concretely:
  * Name things fully. Never use single-letter or cryptic identifiers (`r`, `e`, `p`, `acc`) — write `resource`, `employee`, `preset`. The only accepted short names are conventional loop indices (`i`) and `_` for a deliberately unused argument.
  * Prefer an explicit, named intermediate value over a dense one-liner.
  * Prefer explicit object keys over spreads when the shape matters to a consumer.
  * In DB projections and similar option objects, use `true`/`false` rather than `1`/`0`.
  * A reader who has never seen the file should understand it without reconstructing your reasoning.

* **One component per file — never two.** Each file holds exactly one React component, and the file name matches the component name (`SideBarItem.tsx` exports `SideBarItem`). This applies to tiny presentational helpers too — if it returns JSX and is used as `<Foo />`, it gets its own file. Styled components are the only exception: all of a component's `styled` definitions live together in its `*.styled.ts`.

* **Stack:** Use React, TypeScript, and Vite/Next.js.
* **TypeScript:** Write strict and clean TS. Never use `any`, `@ts-expect-error`, or `@ts-ignore`.
* **Styling:** Use MUI `styled` components exclusively. Do not use plain CSS or CSS modules.
  * Never use hardcoded color or spacing strings (e.g. `'#dfb5fd'`, `'16px'`) inside component or styled-component files. Always reference values from the MUI theme (e.g. `theme.palette.primary.main`, `theme.spacing(2)`).
  * In `sx` props, never use the MUI shorthand spacing keys (`m`, `p`, `mx`, `my`, `px`, `py`, `mt`, `mb`, `ml`, `mr`, `pt`, `pb`, `pl`, `pr`). Always write the full CSS property name for readability — prefer logical properties: `marginInline`, `marginBlock`, `paddingInline`, `paddingBlock`, plus `marginTop`, `paddingBottom`, etc. MUI still applies the spacing transformation to these long-form keys, so e.g. `paddingBlock: 4` resolves to `theme.spacing(4)`.

* **Component Structure:**
  Folder name: camelCase. Example using a `sideBar` component:
  ```
  components/
    sideBar/
      SideBar.tsx              ← component only (no styled components, no helpers, no types)
      types/
        sideBar.types.ts       ← TypeScript interfaces and types
      helpers/
        sideBar.helpers.ts     ← pure vanilla TS helper functions
      hooks/
        sideBar.hooks.ts       ← component-specific React hooks
      components/
        sideBar.styled.ts      ← all MUI styled components used by SideBar
        SideBarItem.tsx        ← sub-components, each in its own file
        SideBarFooter.tsx
  ```
  * Only create the sub-folders that are actually needed.
  * Break large components into smaller focused sub-components placed in the `components/` sub-folder.

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
  * All other files (styled, helpers, hooks, types): `camelCase` with a dot-suffix (e.g., `sideBar.styled.ts`).
  * Functions and variables: `camelCase` (e.g., `handleClose`).

* **Imports:**
  * Use absolute paths (e.g., `import { Button } from '@/components/button'`). Avoid deep relative paths like `../../../`.

* **Services & Data Fetching:**
  * Pure logic/API calls: place in `src/services/[name].service.ts`.
  * React Query hooks (query/mutation): place in `src/hooks/[name].hooks.ts`.
  * All React Query `queryKey` values must be centralised in a single file: `src/constants/queryKeys.ts`. Never inline query keys at the call site.

* **Best Practices:**
  * Comments: **The default is no comment.** Write code that explains itself through naming and structure instead. A comment is the exception, and the bar is high: only when the code cannot say it itself — a non-obvious constraint, a bug being prevented, a deliberate trade-off. Before writing one, ask "would a competent reader be confused without this?" If no, delete it.
    * Do NOT explain what the code does, restate a name, justify a change, or narrate reasoning ("now we do X", "this used to be Y", "fetch only rejects on network errors, so...").
    * Do NOT add a doc block to every function, type, hook, or component just because one exists elsewhere. Most need none.
    * Do NOT reference things the reader does not have: spec sections, ticket numbers, review comments, chat history.
    * When a comment IS warranted, one line. Never a multi-line block explaining a one-line change.
    * All comments must be written in English.
  * Keep files small and focused. Split large components into sub-components in the `components/` sub-folder; move pure logic to `helpers/`, React logic to `hooks/`. A component file that needs scrolling to understand is a signal to split.
  * Optimization: Use `useMemo` and `useCallback` only when necessary for performance, not by default.
  * Constants: Avoid hardcoded strings and magic numbers. Extract them to a `constants.ts` file.
  * Texts & i18n: Always use `react-i18next` for all user-facing texts. Avoid hardcoded texts in components.

* **Preferred Libraries:**
  * UI: `@mui/material`
  * Icons: `@phosphor-icons/react`. Icon names use the `Icon` suffix (e.g. `SparkleIcon`, `GearIcon`). Never create custom SVG icon components.
  * Forms: `react-hook-form`
  * Common Hooks: `usehooks-ts` (or similar library)
  * State Management: `zustand`
  * Data Fetching: `@tanstack/react-query`
  * i18n: `react-i18next`

