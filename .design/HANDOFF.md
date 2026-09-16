# העברת שיחה — תכנון עמודי Portfolio

הדבק את כל הקובץ הזה כהודעה ראשונה בשיחה החדשה.

---

תחשוב שאתה מגייס מנוסה לתפקידים בהייטק / יועץ קריירה מקצועי.
אנחנו באמצע עבודה על האתר האישי שלי (הריפו הזה) — מוסיפים עמודי תיק עבודות.
השיחה הקודמת רצה בענן ואני ממשיך אותה מכאן. הנה כל מה שסגרנו.

## איך אני רוצה שתעבוד איתי

- **נושא אחד בכל הודעה.** אל תערום כמה נושאים בהודעה אחת — איבדתי אותך בעבר ככה.
- **הודעות קצרות.** אם יש הרבה מה לומר, תפצל להודעות ותתקדם רק כשאני אומר.
- **קופי באנגלית בלבד ולא בתוך code block** — זה מקשה עליי להעתיק. טקסט רגיל, עם label מודגש מעליו. לכמה פריטים במקביל — טבלה.
- **חוות דעת אמיתית, אל תרצה אותי.** אם משהו לא טוב תגיד. אם טעית תגיד. אם אני צודק ואתה טעית — תודה בזה ותתקדם.
- אל תמציא עובדות. אם חסר לך מידע — תסמן `[TO FILL]` ותשאל, לא תשלים לבד.

## מי אני

Shoham Fellner. Frontend Developer עם 4+ שנות ניסיון, רקע UX/UI חזק, אחריות מ-Figma לפרודקשן.
סיימתי לעבוד בתקשוב באוגוסט 2026, מחפש עבודה עכשיו.

## הקשר: מה כבר קיים באתר

- `/` — עמוד בית עם קנבס אינטראקטיבי (תיקיות טכנולוגיות נגררות)
- `/resume` — ציר זמן + פתקים דביקים + סרגל גלילה
- `/portfolio` — היה stub, עליו אנחנו עובדים
- Next.js 16, Tailwind v4, CVA, motion, react-icons. **לא MUI** למרות מה שכתוב ב-AGENTS.md
- טוקנים ב-`src/app/globals.css`. תוכן טקסטואלי ב-`src/content/`

## ההחלטה הראשית

**עמוד רשימה אחד + ראוט דינמי לעמודי פרויקט:**
- `/portfolio` — רשימת 4 הפרויקטים
- `/portfolio/[slug]` — עמוד case study לכל פרויקט

בחרנו ראוטים ולא מודאל/דראוור כי מגייס צריך לשלוח לינק ישיר לפרויקט ספציפי.

## עמוד `/portfolio` — סגור לגמרי

שלושה בלוקים: כותרת → 4 כרטיסים ברשת 2×2 → The Common Thread.
**בלי CTA בתחתית** (יש sticky header עם מייל/לינקדאין/Resume).
בלי פילטרים.

### כותרת

Selected Work

Four systems in four very different domains. Some of this work lives behind closed doors — what I can show you is how it was built, and why.

### ארבעת הכרטיסים

לכל כרטיס: ויזואל בתוך מסגרת חלון דסקטופ, כותרת, שורת הקשר, וו של משפט, תפקיד, צ'יפים בפונט קוד, ותג ראיות.

| | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **Title** | Procurement Planning System | Live Drone Patrol Console | OctSeven | Aura Cloud |
| **Context** | IDF Teleprocessing Corps · via Inford-Team · 2024–2026 | Nando · 2022–2024 | October 7 Memorial Platform · Volunteer · 2023–2026 | AWS Resource Monitoring · Academic Project · 2026 |
| **Hook** | Built from scratch to replace the legacy platform behind the Ground Forces' annual budget. | Put the responding guard and the command room on the same live picture, from anywhere in the world. | A public platform where families build memorial pages for the people they lost. Development started two weeks after October 7th. | Maps how AWS resources connect, and surfaces the permission mismatches hiding between them. An MCP server lets AI agents query it directly. |
| **Role** | Lead Frontend Developer & UX/UI | Frontend Developer & UX/UI | Core Frontend Developer | Full-Stack Developer & UX/UI |
| **Stack** | React · TypeScript · TanStack Query · SAP Gateway | React · Leaflet | Next.js · Redux · MUI | React · Node.js · AWS · MCP |
| **Badge** | Design Files | Design Files | Archived | Source Code |

**עקרונות שהוכרעו ואסור לשבור:**
- ארבעה תארים שונים ומדויקים — זה מה שגורם ל-`Lead` להישמע אמין
- מספר צ'יפים לא אחיד (4/2/3/4) — נקרא אמיתי יותר ממרופד
- **OctSeven: אפס מספרים.** בלי "109 pages", בלי מספר נופלים. הטון הוא אחריות, לא תפוקה
- מידות: רוחב תוכן 1200, מרווח עמודות 32, מרווח שורות 48, כרטיס 584 רחב, תמונה 3:2 (~390), כרטיס ~605 גובה

### The Common Thread

**Heading:** The Common Thread
**Subheading:** Different domains, same way of working.

| | Item 1 | Item 2 | Item 3 |
|---|---|---|---|
| **Title** | Figma to production | Data is the hard part | AI-assisted engineering |
| **Body** | I design in Figma and build in the codebase. Intent survives the trip to production instead of getting lost in the handoff. | Thousands of procurement line items, live drone telemetry, AWS topology. State, caching and performance are where the work is. | Claude Code, MCP and agentic workflows — from the Aura Cloud MCP layer to this site itself. |

עיצובית: שלוש עמודות, **שקט משמעותית מהכרטיסים** — בלי רקעים ובלי מסגרות. זו קודה, לא פרק.

## עמוד פרויקט — שדרת 8 סקשנים

1. **Hero** — כותרת, הקשר, וו, תפקיד, סטאק, ויזואל מוביל
2. **The Stakes** — למה המערכת קיימת ומי תלוי בה
3. **My Role** — בכנות: מה היה שלי ומה של הצוות
4. **The Problem** — האילוץ האמיתי
5. **Decisions** — 2-4 החלטות, כל אחת **אילוץ ← מה בחרתי ← מה ויתרתי**. זה הלב
6. **Evidence** — מודול משתנה: `figma` / `archive` / `demo` / `diagram`
7. **Outcome** — בלי מטריקות מומצאות
8. **What I'd Change** — הסקשן שקורא כוותק

| פרויקט | ראיות | משקל |
|---|---|---|
| Procurement | figma + diagram | Decisions |
| Drone | figma + diagram | Stakes |
| OctSeven | archive | Role + Stakes |
| Aura Cloud | demo + diagram | Decisions |

## חומר גולמי שכבר חילצנו לעמודי הפרויקט

**Drone — ל-Decisions:** הטלמטריה עבדה ב-short polling כל 2 שניות. תוכננו לעבור ל-WebRTC אבל הבקאנד לא תמך. הניואנס: ל-2 שניות polling הוא בכלל לא בחירה רעה — הכאב האמיתי היה הוידאו. הפרדה בין שני זרמים עם דרישות latency שונות.

**OctSeven — ל-Decisions:** התחלנו ב-React ועברנו ל-Next.js בשביל SEO/SSR. ההנמקה החזקה: משפחה מחפשת בגוגל את שם יקירהּ — אם העמוד לא מאונדקס, ההנצחה לא קיימת בפועל.

**OctSeven — ל-What I'd Change:** השתמשנו ב-`use client` יותר מדי וביטלנו בפועל חלק ניכר מה-SSR שבשבילו עברנו.

**דפוס שחשוב שתזכיר לי:** אני נוטה למסור פרטים טכניים "חלשים" בטון של התנצלות. בשתי הפעמים זה היה החומר הכי חזק. תעודד אותי לספר אותם.

## מה כבר עשוי

- עמוד `/portfolio` — מבנה, קופי, ו-4 כרטיסים מעוצבים ב-Figma. **פותח**
- עמוד הפרויקט של Procurement — מוקאפ עיצובי מלא ב-`.design/Main.dc.html`
- OctSeven ירד מהאוויר ב-18.8.2026, נשמר ב-web.archive.org לפני

## מה פתוח

**בעמוד ה-case study של Procurement, שני `[TO FILL]`:**
- **Outcome** — באיזה מצב הייתה המערכת כשעזבתי (חי עם משתמשים? בהטמעה? בקבלה?)
- **What I'd Change** — עוד לא סיפרתי כלום. צריך לחלץ ממני

**לבדיקה שלי:** ה-`Trade-off` בארבע ההחלטות של Procurement נוסחו על ידי Claude מתוך קורות החיים. הם הגיוניים אבל צריך לוודא שהם מה שבאמת כאב.

**שתי משימות צד (קבצים מחוץ לתחום, לא לגעת בלי אישור):**
1. `MobileNav` (`src/components/mobileNav/constants/mobileNav.constants.tsx`) — יש Home/Resume/GitHub/Figma, **אין LinkedIn ואין מייל**. בדסקטופ יש הכל. LinkedIn הוא הלינק הכי חשוב בחיפוש עבודה
2. `src/content/resume.ts` — הכניסה `octseven` מפנה ל-`https://octseven.com` שכבר מת. להחליף ללינק ה-Wayback

## הצעד הבא

לחלץ ממני את שני ה-`[TO FILL]` של Procurement, לסגור את עמוד הפיילוט, ואז לעבור לשלושת עמודי הפרויקט הנותרים.

## קבצים וענף

ענף: `claude/portfolio-pages-planning-4g9mko`
- `.design/Main.dc.html` — מקור העיצוב של עמוד ה-case study
- `.design/canvas.json` — פריסה
- `.design/procurement-case-study.html` — ב-gitignore, קובץ מיוצר של 2.2MB
