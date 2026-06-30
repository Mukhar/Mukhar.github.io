# mukhar.github.io

Personal portfolio of **Mukhar Jain** — Senior Software Engineer (SDE 3) at Walmart Labs, IIT Delhi ’21.

Live: <https://mukhar.github.io>

## Stack

Plain HTML, CSS, and a sprinkle of vanilla JS — zero build, deploys natively on GitHub Pages.

```
.
├── index.html        # all sections (hero, about, experience, work, skills, education, contact)
├── styles.css        # design system + layout
├── script.js         # nav, scroll-spy, mobile menu
├── 404.html          # custom not-found page
└── Mukhar_Jain.pdf   # downloadable CV (linked from header & contact)
```

## Local preview

Any static server works. Easiest:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Updating content

- **Experience / skills / awards** — edit `index.html` directly; sections are clearly delimited with comment dividers.
- **Resume PDF** — drop a new `Mukhar_Jain.pdf` at the project root.
- **Colors / typography** — see the `:root` block at the top of `styles.css`.

## Deployment

GitHub Pages serves the `main` branch root automatically — every push to `main` goes live.