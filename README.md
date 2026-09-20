# osmanzain.com

Personal portfolio: plain HTML, CSS and JavaScript, no build step, no framework. One page: hero, projects,
skills, about, contact. The GarageBot card embeds a recorded demo call with a synced transcript and job card.

```
PORT=8812 python3 serve.py        # http://localhost:8812  (serve.py supports HTTP Range so the audio can be seeked)
```

## Change things
- **Links and names:** `site.config.js` (email, GitHub, LinkedIn, the agency's live URL, GarageBot's public name).
  An empty value hides that link, so nothing points nowhere.
- **Text:** `index.html`. Colours and fonts are the variables at the top of `styles.css`.
- **The demo call:** `assets/demo-call.m4a` plus `assets/demo.js` (turn timestamps and job-card fields). To replace
  it with another recording, use the importer in the GarageBot site project (`tools/import_call.py`) and copy the two files here.

## Deploy to osmanzain.com (GitHub Pages, free)
1. Push this folder to a public GitHub repo (`gh repo create osmanzain-site --public --source=. --push`).
2. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`. The `CNAME` file already
   says `osmanzain.com`.
3. At the registrar (Spaceship → the domain → Advanced DNS), remove the existing parking A records for `@` and add:
   - `A` `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (four records)
   - `CNAME` `www` → `<your-github-username>.github.io`
4. Wait for DNS (minutes to a few hours). In Pages settings tick "Enforce HTTPS" once the certificate is issued.
5. Check https://osmanzain.com, then paste the link into a LinkedIn post to confirm the preview card (`og.png`) shows.

## Files
`index.html` `styles.css` `app.js` · `site.config.js` · `assets/` · `og.png` (link-preview image) · `404.html` ·
`robots.txt` `sitemap.xml` `CNAME` `.nojekyll` (GitHub Pages) · `serve.py` (local preview)
