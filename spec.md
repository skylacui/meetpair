# PAIR Website — Build Spec (v2, full redesign)

Build a static website for PAIR, a service project pairing middle/high school girls
(mentees) with professional women (mentors) for an annual career event.
Domain: meetpair.org. Hosting: GitHub Pages. Plain HTML/CSS/JS — no frameworks needed.

## Palette (STRICT — only these 4 colors, no exceptions)
- Background: `#eef5eb`
- Cards / surfaces: `#f9f9f7`
- Brown accent: `#A69278` (darkens to `#8a7660` only in the rare case of a solid-brown
  hover state if ever needed — otherwise `#A69278` is used at full strength as the
  accent color itself)
- Text: `#2b4128`

Brown (`#A69278`) is the ONLY accent color and must be used sparingly but consistently
as a recurring signature across the whole site — never as a large solid block/background
for hero sections or full panels. Use it for:
- Small-caps section labels (e.g. "FOR MENTORS", "WHAT IS PAIR") — text color `#A69278`
- Agenda timeline dots
- FAQ item left-borders (2px solid)
- Testimonial card oversized quotation marks
- LinkedIn icon color on bio cards
- Mission-statement funding blockquote left-border
- Button hover state: background flips from `#f9f9f7` to `#A69278`, text flips from
  `#2b4128` to `#f9f9f7`

Do NOT introduce any other colors (no muted greens, no faded opacity grays as a
separate "secondary" hue). Secondary/tertiary text is differentiated by `opacity`
applied to `#2b4128` (e.g. `opacity: 0.7–0.85`) or by font-size/weight — never by
swapping in a different hex value. The only exception is the tiny decorative flower
SVG (see below), which uses its own small internal palette since it's a one-off
illustration, not a system color.

## Typography
- **Poppins** — used for everything: nav, body, buttons, labels, FAQ. Use weight
  (300/400/500/600) and italic for emphasis, not new colors.
- **Noto Serif Display, font-stretch: condensed** — used sparingly for: hero taglines/
  statements, page H1s, the "PAIRs" callouts, big quotation marks. Apply
  `letter-spacing: -0.015em`. Always sentence case, never all-lowercase or all-caps.
- Section labels (the small brown text like "FOR MENTORS") use Poppins, 11px,
  weight 600, `letter-spacing: 0.12em`, `text-transform: uppercase`, color `#A69278`.
  This label appears at the top of every page's main content as a consistent wayfinding
  device.

## Global Nav
Left: real PAIR pear-dog logo image (34x34px) + "PAIR '26" wordmark in Poppins 600,
with a dropdown (hover/click) revealing "For Mentees" and "For Mentors" links.
Right: "About" and "Archive" links.
Sticky on scroll, bottom border `1px solid rgba(43,65,40,0.14)`, background `#eef5eb`.
Use semantic `<nav>`, `aria-current="page"` on the active link.

## Button styling (default, used for ALL standard buttons site-wide except the
## signature mentor/mentee CTAs described below)
- Background `#f9f9f7`, text `#2b4128`, border-radius 9px, padding `13px 28px`,
  font-weight 600, font-size 13px.
- Hover: background → `#A69278`, text → `#f9f9f7`, `transform: translateY(-1px)`,
  transition `0.18s ease`.

## Signature flower-hover button (used ONLY for "I'm a mentee" / "I'm a mentor" /
## "Sign up as a mentor" / "Sign up as a mentee" buttons — i.e. every button whose
## job is to send someone to a signup form. NOT used on secondary buttons like
## "Read the story →".)
Same base button styling as above, PLUS a flower grows from the top on hover:
- A wrapper positioned absolutely above the button: `width: 26px`, `height: 0` at
  rest (fully invisible, `overflow: hidden`), transitioning to `height: 22px` on
  hover over `0.4s cubic-bezier(0.16, 1, 0.3, 1)`.
- Inside, an inner element offset `bottom: -6px`, sized `26px x 28px`, holding the
  flower SVG, with `opacity: 0` at rest fading to `opacity: 1` on hover
  (`0.25s ease`, slight delay `0.05s`).
- The SVG itself has `transform-origin: 13px 24px` and starts at
  `scale(0.7) translateY(4px)`, animating to `scale(1) translateY(0)` on hover
  over `0.4s cubic-bezier(0.34, 1.2, 0.4, 1)` — a soft bloom/settle motion, NOT a
  spinning or unspinning rotation.
- This produces a smooth, natural "growing into place" motion rather than a
  mechanical spin — prioritize this easing/motion combination exactly.
- `aria-hidden="true"` on the whole flower wrapper — it's purely decorative; the
  button's visible text is the accessible label.

Exact SVG (26x28 viewBox):
```html
<svg width="26" height="28" viewBox="0 0 26 28" fill="none" aria-hidden="true">
  <path d="M13 28 C11.5 25 9.8 23.6 10.3 21.2 C10.8 18.8 14 18.8 13 16 C12.4 14.2 10.7 13.8 11.3 11.5"
        stroke="#5C8A4A" stroke-width="1.3" stroke-linecap="round" fill="none"/>
  <path d="M11.6 19.8 C9.2 18.4 8.2 16.4 9.6 15.6 C10.4 17.1 11.3 18.4 11.6 19.8Z" fill="#5C8A4A"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#c0392b" transform="translate(11.5,10.5) rotate(0)"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#a52a1a" transform="translate(11.5,10.5) rotate(60)"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#c0392b" transform="translate(11.5,10.5) rotate(120)"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#a52a1a" transform="translate(11.5,10.5) rotate(180)"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#c0392b" transform="translate(11.5,10.5) rotate(240)"/>
  <ellipse cx="0" cy="-4.3" rx="2" ry="3.4" fill="#a52a1a" transform="translate(11.5,10.5) rotate(300)"/>
  <circle cx="11.5" cy="10.5" r="2.4" fill="#f9c74f"/>
</svg>
```

## Page: Home
1. **Hero** (light, on the page background — NOT a boxed/colored card): centered,
   max-width ~580px. Serif H1 "Where young ambition meets experience" (40px, weight
   600). Below it, a one-sentence Poppins subline: "An annual event pairing middle
   and high school girls with women across industries — because there's no single
   right way forward." (14px, opacity 0.8). Below that, two buttons side by side,
   both using the signature flower-hover style: "I'm a mentee" and "I'm a mentor"
   (both link to their respective pages).
2. **Concept section**: section label "WHAT IS PAIR". Below it, a horizontal
   "sentence" layout — NOT an equation with + and = symbols. Two pill-shaped chips
   (`background: #f9f9f7`, `border-radius: 100px`) each containing a small circular
   icon placeholder (pear-dog variation, TBD) + bold label + smaller description
   line: chip 1 "Mentors" / "Women in various industries", chip 2 "Mentees" /
   "Girls in middle and high school". Between the two chips, plain text "paired with"
   (not a math symbol). Wrap on mobile.
3. **Agenda**: section label "THE AGENDA · SATURDAY, AUGUST 15". A single
   `#f9f9f7` card containing a vertical timeline — NOT a solid dark/colored block.
   Each row: a small brown (`#A69278`) dot, a time label, a bold activity title,
   and a description, connected by a thin vertical line (`rgba(166,146,120,0.4)`)
   between rows. All three rows visually equal weight — do not highlight or
   emphasize any single row.
   - 10 AM — Munch & learn — Enjoy a catered breakfast while mentors share their
     professional journeys.
   - 11 AM — Ice cream social — Help mentees develop and practice networking
     skills in real time.
   - 12 PM — PAIR activity — In small groups, bond with mentees and share career
     and life advice.
4. **Event details**: a borderless strip of 4 equal cells (each `background:
   #f9f9f7`, joined by 1px gaps showing the page background through, all wrapped
   in one rounded container) — Date "Aug 15" / Time "10–1 PM" / Location
   "Newport/Irvine" / Includes "Food & drink". Each cell has a small brown
   uppercase label above the bold value.
5. **Closing CTA**: centered serif "Ready to join?" + the same two signature
   flower-hover buttons as the hero ("I'm a mentee", "I'm a mentor").
6. **PAIR '25 footnote** (very bottom of the page, below a thin top border
   divider, with extra margin-top to separate it clearly from the CTA above):
   small and modest — a small square photo thumbnail, one line of text ("PAIR '25
   was our inaugural year — twelve pairs, one morning, a lot of real conversation."
   with "PAIR '25" in bold), and a "Read the story →" link on the right, all in a
   single row, max-width ~520px, centered. This should read as a quiet aside, not
   a featured section — small font sizes (~12px), low visual weight.

## Page: For Mentors
- Section label "FOR MENTORS" (brown, small-caps, top of page).
- One serif statement line directly below it (26px, weight 600): "Help girls in
  the shoes you were once in."
- Signature flower-hover button: "Sign up as a mentor", linking to:
  `https://docs.google.com/forms/d/e/1FAIpQLSdsJbba8YOaGoeM9iwAkGeZ_4mJGVToBrxV6z1mdgjlyEhnNA/viewform?usp=header`
- No additional hero paragraph — go straight from the statement to the button.
- FAQ section below: each item has a 2px solid brown left-border with padding,
  bold question, regular-weight answer below:
  - "As a mentor, what will be asked of me?" — "Simply show up and share your
    story! You will be paired with a mentee or two and will guide them through
    the various mini-events. Advise them on fine-tuning their elevator pitches,
    interview skills, and all the small things in between — e.g. practicing
    handshakes and decoding 'business casual'!"
  - "Why should I be a mentor?" — "When girls help girls, there's no limit to
    what can be achieved. PAIR is a fun and low-stakes opportunity to share your
    wisdom and help girls in the shoes you were once in. You will become a part
    of a community of women and girls who support each other and grow together.
    Mentor the next generation of ambitious girls — you might just be mentoring
    the next Steve Jobs."

## Page: For Mentees
- Section label "FOR MENTEES".
- One serif statement line: "See your limitless potential in the women who've
  already lived it."
- Signature flower-hover button: "Sign up as a mentee", linking to:
  `https://docs.google.com/forms/d/e/1FAIpQLSf_a1tTwG7FcwCWKr8a_-msuS-ekd-Y8W12owoVgFpa-GSmgA/viewform?usp=header`
- FAQ section, same left-border style as For Mentors. ALL questions and answers
  wrapped in literal square brackets to mark them placeholder text:
  - [Who can attend PAIR?] — [PAIR is open to all girls in middle and high school.
    You don't need any prior experience or knowledge — just curiosity and a
    willingness to show up.]
  - [What should I expect on the day?] — [You'll spend the morning with a mentor
    in your field of interest, practice real-world skills like networking and
    elevator pitches, and end with an ice cream social. It's fun, low-pressure,
    and totally free.]
  - [Do I need to prepare anything?] — [No formal preparation needed! You might
    want to think about what you're curious about — your interests, dream
    careers, or questions you've always wanted to ask a professional woman.]
  - [Is there a cost to attend?] — [PAIR is completely free to attend. Food and
    drinks are included.]
  - [What if I'm shy or don't know what to say?] — [That's completely okay — our
    mentors are warm, approachable, and great at making conversation easy. You'll
    be surprised how quickly the nerves go away.]

## Page: About
- Mission block: section label "ABOUT PAIR", serif H1 "What we do" (36px), then
  body paragraph directly on the page background (NOT inside a card) — editorial,
  max-width ~620px: "PAIR is a service project that plants seeds of ambition in
  young girls by connecting them with inspirational women. Each year, we bring
  together middle and high school girls with women mentors across industries —
  and through the diversity of their career journeys, we show every mentee that
  there is no single right way forward." Below it, a funding line with a 2px
  brown left-border, italic, smaller: "PAIR is proudly sponsored by St. Margaret's
  Episcopal School's Venture to Serve Fund."
- Thin full-width divider line.
- **Equal-weight bios** — this is important: both bios must use IDENTICAL layout,
  side by side, centered text, same circular photo size (100px), same structure.
  Do NOT stack them vertically and do NOT alternate/reverse one of them — any
  asymmetry creates a false hierarchy between the two co-founders. Section label
  "THE TEAM" centered above both.
  - **Skyla Cui** — circular headshot placeholder, name (17px bold), role line
    "SMES '22 · CS @ Barnard Columbia '28" + inline brown LinkedIn icon (links to
    placeholder URL), then short bio: "Skyla co-founded PAIR with a belief that
    access to real role models changes everything."
  - **Vanessa Liu** — same structure — "SMES '23 · Premed @ WashU '27" + LinkedIn
    icon, bio: "Vanessa co-founded PAIR to create the kind of event she wished
    had existed in high school."

## Page: Archive
- Header: section label "ARCHIVE", serif H1 "Our inaugural event, PAIR '25"
  (34px), subline "Newport/Irvine · Summer 2025" (13px, opacity 0.7). All directly
  on the page background, no card.
- 5 alternating sections (text + 1-2 photos), each photo has descriptive alt text
  to be added later. Alternate: section 1 text-left/photo-right, section 2
  photo-left/text-right, section 3 text-left/photo-right, section 4
  photo-left/text-right, section 5 text-left/photo-right. Use this placeholder
  copy (split roughly evenly across the 5 sections, can be refined later):
  "Our inaugural PAIR event in 2025 was a huge success. Twelve mentors and twelve
  mentees came together for a morning that none of us expected to feel so
  significant... The Munch & Learn set the tone early — mentors sharing their
  unfiltered career stories over breakfast, mentees realizing these accomplished
  women once felt just as uncertain as they did... By the PAIR Activity, the room
  had shifted. Small groups huddled together, trading questions about interviews,
  handshakes, and the parts of 'adulting' no one teaches you... The Ice Cream
  Social wound things down, but the conversations kept going. Several mentors
  stayed long after the scheduled end time... Looking back, PAIR '25 was never
  really about the agenda. It was about twelve girls leaving with a slightly
  wider sense of what's possible — and twelve women reminded of how far a single
  afternoon can go..."
- Short italic transition line before testimonials: "What follows are a few words
  from the families who joined us."
- **Testimonials** (3 cards, side by side, `background: #f9f9f7`, `border-radius:
  14px`): each card has a large serif quotation mark at the top in brown
  (`font-size: 48px`, color `#A69278`) as a visual anchor — this replaces any
  generic card styling and makes the testimonials feel distinct from other
  content cards on the site. Redact names, attribute as shown:
  - "Thank you so much for organizing the PAIR mentorship. I loved learning about
    how to write different kinds of emails, networking, and how to be prepared
    for an interview." — Mentee, PAIR '25
  - "She has never said 'I want to do it again' like she has about your PAIR
    event with such excitement and admiration." — Parent of mentee, PAIR '25
  - "She felt at ease and comfortable interacting with the mentors. She said
    everything was outstanding." — Parent of mentee, PAIR '25
- Short italic closing line after testimonials: "If PAIR '25 was the first step,
  PAIR '26 is where we keep walking. We can't wait to see who walks with us."
- Build this page to currently hold only PAIR '25 — don't build a multi-year
  switcher yet, but keep the structure reasonably easy to extend later.

## Design principles to maintain throughout (don't violate these when building)
- NEVER make brown a large background/block — it is always a small, precise
  accent (text, dots, borders, icons, quote marks, hover states only).
- NEVER default to "everything in a centered, identically-styled card" — vary
  layout per section (editorial text directly on background, pill chips,
  timelines, asymmetric/equal-weight rows) so the site doesn't feel templated.
- The flower-hover animation is reserved ONLY for the four primary signup CTAs
  across the whole site (mentee/mentor, on Home hero, Home closing CTA, For
  Mentors page, For Mentees page) — all other buttons use the plain hover style
  with no flower, so the flower stays a special, recognizable signature instead
  of becoming visual noise.
- A consistent brown small-caps "section label" appears at the top of the main
  content on every inner page (About, Archive, For Mentors, For Mentees) and
  above each major section on Home, acting as a wayfinding device site-wide.

## Accessibility checklist (must satisfy all)
- WCAG AA contrast maintained for all text/background pairings using only the
  4 locked colors (verify `#2b4128` on `#eef5eb`/`#f9f9f7`, opacity-reduced
  `#2b4128` text still meets 4.5:1 at the opacity levels used).
- All images have descriptive, specific alt text (not generic "photo").
- All interactive elements (nav links, dropdown, buttons, FAQ items) are
  keyboard accessible with visible focus states.
- The decorative flower SVG and its wrapper are `aria-hidden="true"` on every
  instance — button visible text is the accessible label.
- Semantic HTML throughout: `<nav>`, `<main>`, `<header>`, `<footer>`, one
  `<h1>` per page, proper heading hierarchy.
- Noto Serif Display Condensed used sparingly (headlines/statements only),
  never for paragraph-length body text.

## File/asset notes
- Logo: real pear-dog PNG asset, swap into nav.
- Photos: 2 real PAIR '25 photos provided so far; rest are placeholders to swap
  in later (7–10 total expected eventually).
- Google Form links (final, real — see For Mentors / For Mentees sections above).
- Bios, LinkedIn URLs, venue name, and Archive paragraph copy are placeholder —
  structure code so these are easy to find and replace later.
