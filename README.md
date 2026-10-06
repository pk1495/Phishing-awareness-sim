# Phishing Awareness Simulator

A safe, static phishing-awareness training site. Users browse a fictional
Gmail-style inbox ("wic.gmail", made for the WIC club), judge
each email as phishing or legitimate, optionally click through to a
simulated fake login page, and get an explanation of the red flags.

Everything runs client-side — there is no backend. Progress/scoring is
stored in the browser's `localStorage`, which makes this a perfect fit
for GitHub Pages (static hosting only, no server-side code).

## Structure

```
index.html          Inbox view (list of emails)
email.html           Email detail view + judgment buttons + reveal
login.html            Simulated fake login landing page
results.html         Score summary + per-email explanations
assets/css/styles.css  All styling
assets/js/emails.js     Email scenario data (content + explanations)
assets/js/app.js        Shared app logic (localStorage, tooltips)
assets/js/theme.js      Light/dark toggle switch (saved in localStorage)
```

## Editing the scenarios

All email content lives in `assets/js/emails.js` as a single array,
`EMAIL_SCENARIOS`. Each entry has:

- `isPhishing` — ground truth used for scoring
- `sender`, `senderEmail`, `subject`, `time`, `preview`, `body` — what's shown
- `linkHref` — the "real" destination shown on link hover (the point being
  taught: hovering reveals a mismatched domain)
- `redFlags` — bullet list shown in the reveal panel
- `explanation` — paragraph explaining the verdict

Add, remove, or edit entries here to customize the training set — no other
file needs to change.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one) and push this
   folder's contents to it:

   ```bash
   git init
   git add .
   git commit -m "Initial phishing awareness simulator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch".
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. GitHub will publish the site at:
   `https://<your-username>.github.io/<repo-name>/`
   (takes a minute or two on first deploy).

No build step, no dependencies, no server — it's plain HTML/CSS/JS.

## Notes on the design choices

- The inbox borrows Gmail's layout and colors but is branded "wic.gmail" and
  uses its own envelope icon rather than Google's logo. The sign-in page is
  deliberately generic (not a Google sign-in lookalike) so the tool can't be
  repurposed as a real phishing kit.
- The "fake login" page is clearly labeled as part of the simulation and
  never transmits or stores entered credentials anywhere — the form handler
  only flips a local flag used for scoring.
- Link hovering shows the real destination URL, mirroring the real-world
  habit of checking a link's target before clicking — one of the core
  skills the simulation is meant to build.