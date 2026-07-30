<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Comments policy

Default to no comments. Code should read clearly enough on its own that a comment adds nothing.

* Do not write comments that explain reasoning, tuning history, bug-fix backstory, or "an earlier version did X" narration. That belongs in a commit message, not the file.
* Do not write multi-line or paragraph comments, ever — not even for a genuinely tricky workaround. If a gotcha truly needs a comment, it's one short line (under ~15 words), stating the constraint, not the story behind it.
* Do not write JSDoc blocks on components/functions unless the logic itself is genuinely non-obvious (e.g. a subtle algorithm). Component name + props should carry the explanation for anything else — no JSDoc on components like `MobileResume` that are self-explanatory from their name.
* When in doubt, delete the comment and trust the code. If the code isn't clear without the comment, prefer renaming/restructuring over adding prose.
