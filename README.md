# viewbymia — static site

Static export of the View by Mia site originally published from Atoms
(`…-3-v7.app.atoms.dev`). Everything needed to serve it is in this repository;
there is no build step and no server-side code.

## Publishing on GitHub Pages

1. Push this repository to GitHub.
2. Repository **Settings → Pages**.
3. **Source:** *Deploy from a branch*, **Branch:** `main`, **Folder:** `/ (root)`.
4. Save. The site appears at `https://<user>.github.io/<repo>/` after a minute or two.

For a custom domain or a `<user>.github.io` repository, the same files work
unchanged — see *Paths* below.

## Layout

```
index.html                     home page
projekter/<slug>/index.html    one directory per project page (9 pages total)
assets/                        stylesheets, images, logo
assets/site.js                 mobile menu, inquiry form, package pre-selection
.nojekyll                      tells GitHub Pages to serve files as-is
```

## Paths

All links and asset references are **relative** (`assets/…`, `../assets/…`,
`../index.html#priser`), so the site works both under a project path
(`user.github.io/repo/`) and at a domain root. Project pages use directory URLs
(`projekter/stue/`), which GitHub Pages serves from the `index.html` inside that
directory — no 404 fallback or redirect trick is involved.

## Behaviour

- The pages are plain HTML/CSS. The only JavaScript is `assets/site.js`, which
  replaces the small amount of interactivity the React app provided: the mobile
  menu toggle, the inquiry form (opens a pre-filled message in the visitor's
  mail app), and "Book denne pakke" pre-selecting the package in that form.
- Fonts (Jost, Quattrocento) are loaded from Google Fonts by the `@import` at the
  top of `assets/original.css`. Self-hosting them would remove that third-party
  request.
- Metadata in `<head>` (title, description, Open Graph/Twitter tags, `lang`) is
  unchanged from the Atoms template and still carries its placeholder text.
