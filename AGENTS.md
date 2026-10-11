# Agent guide — Rule34 Everforest userstyle

How to extend per-page styles in this repo. Read together with [`snapshots/INDEX.md`](snapshots/INDEX.md).

## Architecture

| Layer | File | Scope |
| --- | --- | --- |
| Palette | `src/_palette.scss` | Everforest CSS variables (`--bg0`, `--blue`, …) |
| Global | `src/base.scss` | Every Rule34 page: body, links, forms, nav, tags, tables, pagination, notices, buttons |
| Shared partials | `src/_*.scss` | Mixins included once from `base.scss` (e.g. `_highlightable-table.scss`, `_sticky-paginator.scss`) |
| Page bundle | `src/pages/<id>.scss` | One SCSS file per URL match in `style.config.mjs` |
| Export | `rule34.user.css`, `rule34.min.user.css` | All bundles wrapped in `@-moz-document` rules |

**Rule of thumb:** cross-page patterns live in `base.scss`. Page files own layout, active submenu tab, and page-only DOM. Do **not** `@include` shared mixins from page files — they are compiled once in `base.scss`.

Rule34 uses a **single chrome stack**: `desktop.css` / `mobile.css` + `#header` / `#navbar` / `#subnavbar` / `#content`. There are no Gelbooru-style `chromeFamilies` or bootstrap/grid/message shells.

## Catppuccin → Everforest token map

When reading [gelbooru-catppuccin](https://github.com/audiogooner/gelbooru-catppuccin) for patterns, map tokens — never copy hex from Catppuccin.

| Catppuccin (Mocha) | Everforest (this repo) | Typical use |
| --- | --- | --- |
| `--base` | `--bg_dim` | Page background |
| `--mantle` | `--bg0` | Raised panels, mail notices |
| `--surface0` | `--bg1` | Inputs, cards |
| `--surface1` | `--bg2` | Submenu, table borders, secondary buttons |
| `--surface2` | `--bg3` | Hover surfaces |
| `--text` | `--fg` | Body copy |
| `--subtext0` | `--grey1` | Help text, metadata |
| `--subtext1` / `--subtext2` | `--grey0` / `--grey2` | Muted labels |
| `--crust` | `--bg_dim` | Text on saturated fills |
| `--sapphire` | `--aqua` | Primary button hover |
| `--pink` | `--purple` | Copyright tags |
| `--peach` | `--orange` | Warn accents (e.g. sticky labels) |

Semantic colors (`--blue`, `--green`, `--red`, `--yellow`, …) share names; values come from `src/_palette.scss`.

## Snapshot workflow

1. **Find the page** in [`snapshots/INDEX.md`](snapshots/INDEX.md).
2. **Read structure first:** `snapshots/pages/<id>.outline.txt`, then `.html` for attributes and inline styles. Site CSS is under `snapshots/css/` (usually `desktop.css`).
3. **Do not copy Gelbooru selectors.** Gelbooru SCSS is a *pattern* reference only; selectors must exist in the Rule34 snapshot.
4. **Edit only** `src/pages/<id>.scss` (page agents). Foundation gaps → report for `base.scss` follow-up.
5. **Register** new pages in `style.config.mjs` (`url-prefix` when query params vary).
6. **Develop:** `npm run dev` + live inject; enable the bundle under **THIS PAGE**.
7. **Export:** `npm run export` when testing Stylus.
8. **Recapture:** `npm run snapshot:fetch -- --only <id>` or **Alt+Shift+S** on a live tab (logged-in / JS-heavy).

## Recurring UI patterns (foundation in `base.scss`)

| Pattern | Where |
| --- | --- |
| Primary submit (`input.searchList`) | `base.scss` — blue fill, `--aqua` hover |
| Secondary (`input[type="button"]`, `reset`) | `base.scss` — `--bg2` / `--bg3` |
| Mail banner (`.has-mail`) | `base.scss` — green border panel |
| Error / site notices (`.notice`, `#notice`) | `base.scss` |
| Global blue `th` + `table.form` reset | `base.scss` |
| Rounded `table.highlightable` shell + column dividers | `_highlightable-table.scss` + `base.scss` |
| Submenu Create/Help green, Delete red (href-based) | `#header #subnavbar` in `base.scss` |
| Sticky paginator | `div#paginator` + `@include sticky-paginator.bar` |
| Paginator inset on a page | Set `--paginator-inset-x` and/or `@include sticky-paginator.compact` in the page file (see `post-list.scss`) |

### Border radius

| Size | Use |
| --- | --- |
| `7px` | Inputs, small buttons, thumbnails, quotes |
| `10px` | Panels, alerts, pagination pills, data tables |
| `999px` | Toggle switches (account options — copy from gelbooru when styling) |

### Thumbnails (page-level, copy from `post-list.scss`)

- Hover: `scale`, radius `7px` → `0`, shadow using `--bg_dim` / `--bg1`
- Video/webm: blue or red outline via `:has(img.webm)` / title / alt tokens

### Layout cleanup

- Hide spacer `<br>` in containers you flex/grid: `> br { display: none; }`
- Beat `width="100%"` form tables with `width: max-content !important` + CSS grid (page-specific row wiring)
- Override inline `#006ffa` headers with `tr[style*="006ffa"]` (already in `base.scss`)

## Submenu semantic colors

| Item | Color | Notes |
| --- | --- | --- |
| Current section tab | `--blue` | Usually set in the **page** file with `[href*="s=list"]` etc. |
| Create / New / Upload / Add | `--green` | Global `#subnavbar` href `s=add`, `s=create`, `addVideo` |
| Help | `--green` | `#navbar` Help + `#subnavbar` `page=help` / `topic=` |
| Delete | `--red` | Global for `remove.php`, `action=delete`, `removeartist` — **`href="#"` Delete** (pools) needs page-level rules |

## Selector rules

1. Prefer ids/classes from the snapshot (`#post-list`, `.highlightable`, `div#paginator`).
2. Use attribute selectors for state: `[href*="s=options"]`, `[style*="006ffa"]`.
3. Avoid `:nth-child` except where snapshots guarantee stable trees; never across `<!-- omitted -->` gaps.
4. Use `:has()` for rows tied to field names or child types.
5. Expect `!important` — site CSS and inline styles are aggressive.
6. Ads / blocked content → `src/content-blocking.scss`, not page files.

## Page agent brief (parallel waves)

```
Repo: rule34-everforest
Page: <id>
Own file only: src/pages/<id>.scss
Read: snapshots/pages/<id>.{outline.txt,html,json}, snapshots/css/desktop.css
Reference (patterns only): gelbooru-catppuccin/src/pages/<mapped>.scss + gelbooru docs/PAGE_STYLE_GUIDE.md
Tokens: Everforest from src/_palette.scss (mapping above)
Do not edit base.scss, style.config.mjs, or other pages.
Done when: stub replaced; selectors validated against snapshot; no new hex outside palette / asset filters.
```

## Reference pages in this repo

| Page | File | Notable patterns |
| --- | --- | --- |
| Homepage | `homepage.scss` | Minimal chrome |
| Post list | `post-list.scss` | Tag sidebar, thumb grid, paginator inset, sticky paginator |

## Checks before merge

- [ ] Snapshot exists or was recaptured after markup change
- [ ] Bundle URL matches styled page(s); prefer `url-prefix` when params vary
- [ ] Active nav/submenu tab highlighted; no hardcoded hex outside palette
- [ ] Form tables inherit `table.form` reset; list tables use global `table.highlightable`
- [ ] `npm run doctor` and `npm run lint:styles` clean
- [ ] `npm run export` when validating Stylus output
