# KesherTech Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild kesher-tech.com as a clean Apple-style Hebrew (RTL) one-page site with hero, products (Magen + SummerJob) and contact, plus accurate SummerJob privacy & terms pages, served statically by GitHub Pages.

**Architecture:** Plain static HTML + a single shared CSS file, no framework, no build step. Files at the repo root are served at kesher-tech.com by GitHub Pages on push. System/SF font stack + custom CSS deliver the Apple aesthetic. Scroll animations are progressive enhancement (a tiny inline IntersectionObserver) — the page is fully usable/visible without JS. Verification is via headless-Chrome screenshots and a link/structure check (no unit-test framework for static HTML).

**Tech Stack:** HTML5, CSS3 (custom properties, fl/grid, backdrop-filter), minimal vanilla JS, GitHub Pages.

**Brand tokens:** SummerJob accent `#F59E0B` (sun orange); Magen accent `#0FB5AE` (shield teal); ink `#0b0b0f`; muted `#6b6b73`; bg `#ffffff`; soft `#f5f5f7` (Apple grey). Font: `-apple-system, "SF Pro Text", "Helvetica Neue", "Segoe UI", system-ui, sans-serif`.

---

## File Structure

```
KesherTech.github.io/
  index.html                 # one-page site
  css/styles.css             # shared stylesheet (site + legal)
  js/reveal.js               # IntersectionObserver scroll-reveal (progressive enhancement)
  assets/sun.svg             # SummerJob mark
  assets/shield.svg          # Magen mark
  summerjob/privacy.html     # SummerJob privacy policy (Hebrew)
  summerjob/terms.html       # SummerJob terms of use (Hebrew)
  CNAME                      # kesher-tech.com (unchanged)
```

> The old `index.html` (Magen-only) is fully replaced in Task 3.

---

### Task 1: Shared stylesheet (Apple aesthetic)

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Write `css/styles.css`**

```css
:root {
  --ink: #0b0b0f;
  --muted: #6b6b73;
  --bg: #ffffff;
  --soft: #f5f5f7;
  --line: #e6e6ea;
  --sun: #f59e0b;
  --sun-dark: #d97706;
  --teal: #0fb5ae;
  --maxw: 1080px;
  --font: -apple-system, "SF Pro Text", "Helvetica Neue", "Segoe UI", system-ui, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font);
  color: var(--ink);
  background: var(--bg);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
a { color: inherit; text-decoration: none; }
img, svg { display: block; }

.wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }

/* Nav */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--line);
}
.nav .wrap { display: flex; align-items: center; gap: 24px; height: 52px; }
.nav .brand { font-weight: 700; letter-spacing: -0.02em; }
.nav .links { margin-inline-start: auto; display: flex; gap: 22px; }
.nav .links a { color: var(--muted); font-size: 15px; transition: color .2s; }
.nav .links a:hover { color: var(--ink); }

/* Hero */
.hero { text-align: center; padding: 120px 0 90px;
  background: radial-gradient(1200px 500px at 50% -10%, #fff7ec 0%, #ffffff 60%); }
.hero h1 { font-size: clamp(40px, 7vw, 80px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
.hero p { color: var(--muted); font-size: clamp(18px, 2.4vw, 24px); margin: 22px auto 0; max-width: 640px; }
.hero .cta { margin-top: 34px; display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

.btn { display: inline-block; padding: 12px 24px; border-radius: 980px; font-weight: 600; font-size: 16px; transition: transform .15s, opacity .2s; }
.btn:active { transform: scale(.97); }
.btn-primary { background: var(--ink); color: #fff; }
.btn-ghost { background: var(--soft); color: var(--ink); }

/* Sections */
.section { padding: 90px 0; }
.section-soft { background: var(--soft); }
.section-title { text-align: center; font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -0.02em; }
.section-sub { text-align: center; color: var(--muted); font-size: 19px; margin-top: 12px; }

/* Product cards */
.products { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px; }
.product {
  background: #fff; border: 1px solid var(--line); border-radius: 28px; padding: 40px;
  display: flex; flex-direction: column; gap: 16px;
  transition: transform .25s ease, box-shadow .25s ease;
}
.product:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,.08); }
.product .mark { width: 64px; height: 64px; border-radius: 18px; display: grid; place-items: center; }
.product .mark.sun { background: linear-gradient(160deg,#ffd27a,#f59e0b); }
.product .mark.shield { background: linear-gradient(160deg,#7fe3df,#0fb5ae); }
.product .mark svg { width: 38px; height: 38px; }
.product h3 { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
.product .lede { color: var(--muted); font-size: 17px; }
.product .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.chip { background: var(--soft); color: #4b4b53; font-size: 13px; padding: 6px 12px; border-radius: 980px; }
.product .foot { margin-top: auto; display: flex; align-items: center; gap: 14px; padding-top: 8px; }
.product .store { font-weight: 600; color: var(--sun-dark); }
.product.magen .store { color: var(--teal); }
.product .soon { color: var(--muted); font-size: 14px; }

/* Contact */
.contact { text-align: center; }
.contact a.mail { font-size: clamp(24px, 4vw, 40px); font-weight: 800; letter-spacing: -0.02em; color: var(--sun-dark); }

/* Footer */
.footer { border-top: 1px solid var(--line); padding: 40px 0; color: var(--muted); font-size: 14px; }
.footer .wrap { display: flex; flex-wrap: wrap; gap: 18px 28px; align-items: center; }
.footer a { color: var(--muted); }
.footer a:hover { color: var(--ink); }
.footer .legal { margin-inline-start: auto; display: flex; flex-wrap: wrap; gap: 18px; }

/* Reveal animation (enhancement) */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s ease; }
.reveal.in { opacity: 1; transform: none; }

/* Legal pages */
.legal { max-width: 760px; margin: 0 auto; padding: 60px 24px 100px; }
.legal a.back { color: var(--muted); font-size: 15px; }
.legal h1 { font-size: clamp(30px, 5vw, 44px); font-weight: 800; letter-spacing: -0.02em; margin: 18px 0 6px; }
.legal .updated { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
.legal h2 { font-size: 22px; font-weight: 700; margin: 34px 0 10px; }
.legal p, .legal li { color: #2a2a31; font-size: 16px; line-height: 1.7; }
.legal ul { padding-inline-start: 22px; margin: 8px 0; }
.legal li { margin: 6px 0; }
.legal .disclaimer { background: #fff7ec; border: 1px solid #f6d79a; border-radius: 16px; padding: 16px 18px; color: #6b4e12; font-size: 14px; margin: 28px 0; }

@media (max-width: 760px) {
  .products { grid-template-columns: 1fr; }
  .hero { padding: 88px 0 64px; }
  .section { padding: 64px 0; }
  .nav .links { gap: 16px; }
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/KesherTech.github.io && git add css/styles.css && git commit -m "feat: Apple-style shared stylesheet"
```

---

### Task 2: Brand mark SVGs + reveal script

**Files:**
- Create: `assets/sun.svg`, `assets/shield.svg`, `js/reveal.js`

- [ ] **Step 1: Create `assets/sun.svg`** (white sun, used on the orange chip)

```svg
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="24" cy="24" r="9" fill="#fff"/>
  <g stroke="#fff" stroke-width="3" stroke-linecap="round">
    <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2"/>
  </g>
</svg>
```

- [ ] **Step 2: Create `assets/shield.svg`** (white shield + check)

```svg
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M24 4l16 6v10c0 10-6.8 16.8-16 20-9.2-3.2-16-10-16-20V10l16-6z" fill="#fff"/>
  <path d="M17 24l5 5 9-10" stroke="#0fb5ae" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 3: Create `js/reveal.js`**

```js
// Progressive enhancement: fade/slide elements in on scroll.
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
  els.forEach((e) => io.observe(e));
})();
```

- [ ] **Step 4: Commit**

```bash
cd ~/KesherTech.github.io && git add assets js && git commit -m "feat: brand mark SVGs + scroll-reveal script"
```

---

### Task 3: One-page site (`index.html`)

**Files:**
- Modify (replace): `index.html`

- [ ] **Step 1: Replace `index.html` with the full page**

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>KesherTech — בונים מוצרים שמגנים ועוזרים לאנשים</title>
  <meta name="description" content="KesherTech בונה אפליקציות ישראליות שמגנות ועוזרות לאנשים — מגן נגד הונאות, ועבודת קיץ לנוער." />
  <link rel="icon" href="assets/sun.svg" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <nav class="nav">
    <div class="wrap">
      <a class="brand" href="#top">KesherTech</a>
      <div class="links">
        <a href="#products">מוצרים</a>
        <a href="#contact">צור קשר</a>
      </div>
    </div>
  </nav>

  <header id="top" class="hero">
    <div class="wrap reveal">
      <h1>בונים מוצרים שמגנים<br/>ועוזרים לאנשים</h1>
      <p>KesherTech היא סטודיו ישראלי לאפליקציות. אנחנו מתמקדים בכלים פשוטים, אנונימיים ובטוחים — לכל אחד.</p>
      <div class="cta">
        <a class="btn btn-primary" href="#products">המוצרים שלנו</a>
        <a class="btn btn-ghost" href="#contact">דברו איתנו</a>
      </div>
    </div>
  </header>

  <section id="products" class="section section-soft">
    <div class="wrap">
      <h2 class="section-title reveal">המוצרים שלנו</h2>
      <p class="section-sub reveal">שתי אפליקציות. מטרה אחת — לעזור לאנשים בישראל.</p>
      <div class="products">

        <article class="product magen reveal">
          <div class="mark shield"><img src="assets/shield.svg" alt="" /></div>
          <h3>מגן</h3>
          <p class="lede">המגן מפני הונאות. הדביקו הודעה חשודה וקבלו תשובה מיידית — האם זו הונאה.</p>
          <div class="chips">
            <span class="chip">בדיקה מיידית</span>
            <span class="chip">אנונימי לחלוטין</span>
            <span class="chip">בינה מלאכותית</span>
            <span class="chip">4 שפות</span>
          </div>
          <div class="foot">
            <a class="store" href="https://apps.apple.com/" target="_blank" rel="noopener">App Store →</a>
          </div>
        </article>

        <article class="product summerjob reveal">
          <div class="mark sun"><img src="assets/sun.svg" alt="" /></div>
          <h3>עבודת קיץ</h3>
          <p class="lede">עבודות קיץ לנוער. לוח משרות פשוט שמחבר מעסיקים ובני נוער ישירות — בלי הרשמה.</p>
          <div class="chips">
            <span class="chip">בלי הרשמה</span>
            <span class="chip">חינם</span>
            <span class="chip">מותאם לחוק עבודת נוער</span>
          </div>
          <div class="foot">
            <span class="soon">בקרוב ב-App Store</span>
          </div>
        </article>

      </div>
    </div>
  </section>

  <section id="contact" class="section contact">
    <div class="wrap reveal">
      <h2 class="section-title">יש שאלה? 👋</h2>
      <p class="section-sub">נשמח לשמוע. כתבו לנו ונחזור אליכם.</p>
      <p style="margin-top:28px">
        <a class="mail" href="mailto:contact@kesher-tech.com">contact@kesher-tech.com</a>
      </p>
    </div>
  </section>

  <footer class="footer">
    <div class="wrap">
      <span>© <span id="yr">2026</span> KesherTech</span>
      <span class="legal">
        <a href="summerjob/privacy.html">מדיניות פרטיות — עבודת קיץ</a>
        <a href="summerjob/terms.html">תנאי שימוש — עבודת קיץ</a>
      </span>
    </div>
  </footer>

  <script>document.getElementById("yr").textContent = new Date().getFullYear();</script>
  <script src="js/reveal.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd ~/KesherTech.github.io && git add index.html && git commit -m "feat: Apple-style one-page site (hero, products, contact)"
```

---

### Task 4: SummerJob privacy page

**Files:**
- Create: `summerjob/privacy.html`

- [ ] **Step 1: Create `summerjob/privacy.html`**

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>מדיניות פרטיות — עבודת קיץ | KesherTech</title>
  <meta name="description" content="מדיניות הפרטיות של אפליקציית עבודת קיץ מאת KesherTech." />
  <link rel="icon" href="../assets/sun.svg" />
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
  <main class="legal">
    <a class="back" href="../index.html">← KesherTech</a>
    <h1>מדיניות פרטיות — עבודת קיץ</h1>
    <p class="updated">עודכן לאחרונה: 22 ביוני 2026</p>

    <div class="disclaimer">מסמך זה נכתב בלשון פשוטה ואינו מהווה ייעוץ משפטי. מומלץ להיוועץ בעורך/ת דין לפני הסתמכות עליו.</div>

    <p>אפליקציית «עבודת קיץ» (להלן «האפליקציה») מופעלת על־ידי KesherTech. אנחנו מאמינים בפרטיות מקסימלית: האפליקציה פועלת ללא הרשמה וללא חשבונות משתמש, ואנו אוספים כמה שפחות מידע.</p>

    <h2>איזה מידע נאסף</h2>
    <ul>
      <li><strong>תוכן משרה שמפרסם מעסיק:</strong> כותרת, עיר, תיאור, וכן <strong>מספר טלפון ליצירת קשר</strong>. מספר הטלפון הוא פרט אישי ומוצג בלוח כדי שמחפשי עבודה יוכלו לפנות ישירות.</li>
      <li><strong>כתובת IP בעת פרסום משרה:</strong> נשמרת לזמן קצר לצורך מניעת ספאם והגבלת קצב פרסום בלבד.</li>
    </ul>

    <h2>איזה מידע אינו נאסף</h2>
    <ul>
      <li>אין הרשמה, אין חשבונות ואין סיסמאות.</li>
      <li><strong>איננו אוספים שום מידע על מחפשי העבודה (בני הנוער)</strong> — צפייה בלוח אינה דורשת מסירת פרטים.</li>
      <li>אין מעקב, אין פרסומות ואין פרופילי משתמש.</li>
    </ul>

    <h2>למה משתמשים במידע</h2>
    <ul>
      <li>הצגת המשרות בלוח הציבורי ויצירת קשר ישיר בין מעסיק למחפש עבודה.</li>
      <li>מניעת שימוש לרעה וספאם (באמצעות כתובת ה־IP).</li>
    </ul>

    <h2>שמירה ומחיקה</h2>
    <ul>
      <li>משרות נמחקות אוטומטית כ־30 יום לאחר הפרסום.</li>
      <li>רשומות מניעת הספאם (IP) נשמרות לזמן קצר בלבד.</li>
      <li>ניתן לבקש הסרת משרה או מידע בכל עת בכתובת <a href="mailto:contact@kesher-tech.com">contact@kesher-tech.com</a>.</li>
    </ul>

    <h2>היכן המידע מאוחסן</h2>
    <p>המידע מאוחסן בשירות הענן Supabase (מסד נתונים מנוהל), המשמש כמעבד מידע עבורנו. איננו מוכרים מידע לצדדים שלישיים.</p>

    <h2>בני נוער</h2>
    <p>האפליקציה מיועדת לבני נוער מגיל 14 ומעלה בהתאם לחוק עבודת הנוער. מתוך מודעות לכך, בחרנו בעיצוב שאינו אוסף כל מידע אישי ממחפשי העבודה.</p>

    <h2>הזכויות שלך</h2>
    <p>ניתן לפנות אלינו בכל בקשה לעיון, תיקון או מחיקה של מידע. בנוסף, בכל משרה קיים כפתור «דווח» שמאפשר הסרה מהירה של תוכן בעייתי.</p>

    <h2>יצירת קשר</h2>
    <p>בשאלות פרטיות: <a href="mailto:contact@kesher-tech.com">contact@kesher-tech.com</a></p>

    <div class="disclaimer">הודעה: מסמך זה אינו ייעוץ משפטי. לפני הסתמכות עליו לצרכים רגולטוריים (חוק הגנת הפרטיות, דרישות Apple וכד׳) יש להיוועץ בעורך/ת דין.</div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd ~/KesherTech.github.io && git add summerjob/privacy.html && git commit -m "feat: SummerJob privacy policy page"
```

---

### Task 5: SummerJob terms page

**Files:**
- Create: `summerjob/terms.html`

- [ ] **Step 1: Create `summerjob/terms.html`**

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>תנאי שימוש — עבודת קיץ | KesherTech</title>
  <meta name="description" content="תנאי השימוש של אפליקציית עבודת קיץ מאת KesherTech." />
  <link rel="icon" href="../assets/sun.svg" />
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
  <main class="legal">
    <a class="back" href="../index.html">← KesherTech</a>
    <h1>תנאי שימוש — עבודת קיץ</h1>
    <p class="updated">עודכן לאחרונה: 22 ביוני 2026</p>

    <div class="disclaimer">מסמך זה נכתב בלשון פשוטה ואינו מהווה ייעוץ משפטי. מומלץ להיוועץ בעורך/ת דין לפני הסתמכות עליו.</div>

    <p>השימוש באפליקציית «עבודת קיץ» (להלן «האפליקציה»), המופעלת על־ידי KesherTech, כפוף לתנאים הבאים. שימוש באפליקציה מהווה הסכמה לתנאים אלה.</p>

    <h2>מהות השירות</h2>
    <p>האפליקציה היא <strong>לוח מודעות לפרסום משרות בלבד</strong>. KesherTech <strong>אינה צד</strong> לכל משרה, פנייה, ראיון או יחסי עבודה בין מעסיק למחפש עבודה, ואינה מתחייבת לנכונות, לחוקיות או לזמינות של משרה כלשהי.</p>

    <h2>אחריות המשתמש</h2>
    <ul>
      <li>המעסיק אחראי באופן בלעדי לעמוד ב<strong>חוק עבודת הנוער</strong> (גיל מינימלי 14, שעות עבודה, תנאים ועוד). KesherTech אינה בודקת ואינה אוכפת זאת.</li>
      <li>על המשתמשים לפרסם מידע נכון, חוקי ולא מטעה.</li>
      <li>חל איסור לפרסם תוכן פוגעני, מפלה, מסוכן או בלתי חוקי.</li>
    </ul>

    <h2>גיל</h2>
    <p>האפליקציה מיועדת למשתמשים מגיל 14 ומעלה, בהתאם לחוק עבודת הנוער בישראל.</p>

    <h2>הסרת תוכן</h2>
    <p>קיים מנגנון «דווח» בכל משרה. משרה שתדווח על־ידי מספר משתמשים תוסתר אוטומטית. KesherTech רשאית להסיר כל תוכן, בכל עת ולפי שיקול דעתה, ללא הודעה מוקדמת.</p>

    <h2>היעדר אחריות</h2>
    <p>השירות ניתן «כפי שהוא» (AS IS) וללא אחריות מכל סוג. KesherTech לא תישא באחריות לכל נזק ישיר או עקיף הנובע משימוש באפליקציה, מהסתמכות על משרה, או מהתקשרות בין משתמשים.</p>

    <h2>שינויים</h2>
    <p>אנו רשאים לעדכן תנאים אלה מעת לעת. המשך השימוש לאחר עדכון מהווה הסכמה לתנאים המעודכנים.</p>

    <h2>דין וסמכות שיפוט</h2>
    <p>על תנאים אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בישראל.</p>

    <h2>יצירת קשר</h2>
    <p>בכל שאלה: <a href="mailto:contact@kesher-tech.com">contact@kesher-tech.com</a></p>

    <div class="disclaimer">הודעה: מסמך זה אינו ייעוץ משפטי. לפני הסתמכות עליו יש להיוועץ בעורך/ת דין.</div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd ~/KesherTech.github.io && git add summerjob/terms.html && git commit -m "feat: SummerJob terms of use page"
```

---

### Task 6: Verify (screenshots + links) and deploy

**Files:** none (verification + push)

- [ ] **Step 1: Link/structure check**

```bash
cd ~/KesherTech.github.io
for f in summerjob/privacy.html summerjob/terms.html css/styles.css js/reveal.js assets/sun.svg assets/shield.svg; do
  test -f "$f" && echo "OK $f" || echo "MISSING $f"
done
# footer legal links resolve to real files
grep -oE 'summerjob/(privacy|terms)\.html' index.html | sort -u
# CNAME preserved
cat CNAME
```
Expected: all `OK`, both legal links listed, CNAME = `kesher-tech.com`.

- [ ] **Step 2: Screenshot the homepage (desktop + mobile) with headless Chrome**

```bash
cd ~/KesherTech.github.io
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1280,1600 \
  --screenshot=/tmp/kt-home.png "file://$PWD/index.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=390,1800 \
  --screenshot=/tmp/kt-home-mobile.png "file://$PWD/index.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1280,1700 \
  --screenshot=/tmp/kt-privacy.png "file://$PWD/summerjob/privacy.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1280,1700 \
  --screenshot=/tmp/kt-terms.png "file://$PWD/summerjob/terms.html" >/dev/null 2>&1
ls -la /tmp/kt-*.png
```
Open each PNG and confirm: Apple-style hero, RTL layout, two product cards (shield + sun),
contact email, footer legal links; legal pages render with disclaimer boxes and read RTL.
Iterate on `css/styles.css` / markup until it looks right.

- [ ] **Step 3: Commit any visual fixes**

```bash
cd ~/KesherTech.github.io && git add -A && git commit -m "polish: visual fixes from screenshot review" || echo "no fixes needed"
```

- [ ] **Step 4: Push (GitHub Pages auto-deploys kesher-tech.com)**

```bash
cd ~/KesherTech.github.io && git push origin main
```
Expected: push succeeds; site updates at kesher-tech.com within ~1 minute.

---

## Self-Review

**Spec coverage:**
- Apple-style one-page Hebrew RTL → Task 1 (CSS), Task 3 (index). ✓
- Hero → Task 3 hero. ✓
- Products (Magen + SummerJob), scalable grid → Task 1 `.products` grid + Task 3 two cards. ✓
- Contact at bottom (contact@kesher-tech.com) → Task 3 contact section. ✓
- Footer with SummerJob legal links → Task 3 footer. ✓
- SummerJob privacy page (contact phone + IP logging disclosed, no seeker data, minors,
  retention, processor, removal) → Task 4. ✓
- SummerJob terms page (info board only, not a party, youth-law responsibility, age,
  removal rights, no liability, Israeli law) → Task 5. ✓
- "Not legal advice" disclaimer on both → Tasks 4, 5 disclaimer boxes. ✓
- Marks/assets + reveal enhancement → Task 2. ✓
- Works without JS (reveal is enhancement; fallback adds `.in`) → Task 2 `reveal.js`. ✓
- Screenshot verification desktop+mobile, link check, CNAME preserved → Task 6. ✓
- Static, GitHub Pages deploy on push → Task 6 Step 4. ✓

**Placeholder scan:** The Magen App Store link uses `https://apps.apple.com/` as the store
root and SummerJob shows "בקרוב" — these are real, intended states (no live SummerJob
listing yet), not plan gaps. All code blocks are complete files.

**Consistency:** Class names (`.product`, `.mark.sun`, `.mark.shield`, `.reveal`, `.legal`,
`.disclaimer`, `.section-soft`) defined in Task 1 are used exactly in Tasks 3–5. Asset paths
(`assets/sun.svg`, `assets/shield.svg`) and relative `../` paths from `summerjob/` match.
Footer links (`summerjob/privacy.html`, `summerjob/terms.html`) match the files created in
Tasks 4–5. ✓
```
