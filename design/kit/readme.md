# design/kit — upstream Claude Design material (not the design source)

This directory is the unmodified export of the **Briza Design System** produced
by Claude Design on 2026-08-21 (`Briza_Design_System.zip`, with OS junk
stripped). It is committed as reference material only.

## What is adopted (per `docs/PRD.md` §5.1)

Only the kit's **tokens** are harvested:

- the color palette (navy/ice + cream/wood, WhatsApp green for its button only),
- the type stack (Secular One / Assistant / Frank Ruhl Libre),
- the sizing tokens (19px body baseline, 56–64px tap targets, glow token,
  spacing/shape/motion scales).

Entry point: `styles.css`, which imports `tokens/*.css`.

## What is rejected

The kit's **page compositions, components, templates, UI kits and example
copy** (`components/`, `templates/`, `ui_kits/`, `guidelines/*.card.html`,
`readme.md` prose, `uploads/` screenshots) are **not adopted and must not be
reproduced**. In particular the kit's icon-card grids, feature cards, quote
blocks and its example Hebrew copy (which contains claims such as "מתחדש כל
שבוע" and "התאמה במקום" that violate the PRD facts register, §3.4) are rejected.

## Binding design source

`docs/DESIGN.md`, authored by `/yoyo-design`, is the binding design source for
this site. Where this kit and `docs/DESIGN.md` disagree, `docs/DESIGN.md` wins.
