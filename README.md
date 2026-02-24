# Olivia's Portfolio

This is a Vite + React project for Olivia Lee's multimedia portfolio, deployed to GitHub Pages.

## Common Terminal Commands

### Development

- `npm install`
  - Installs all dependencies listed in `package.json`.
- `npm run dev`
  - Starts the local development server (usually at http://localhost:5173 or similar).
  - Hot-reloads on file changes.

### Building

- `npm run build`
  - Builds the project for production.
  - Output is placed in the `dist/` folder.

### Previewing Production Build

- `npm run preview`
  - Serves the built `dist/` folder locally to preview the production build.

### Deploying to GitHub Pages

- `npm run deploy`
  - Builds the project and publishes the `dist/` folder to the `gh-pages` branch.
  - Your site will be live at `https://<your-github-username>.github.io/<repo-name>/`.

### Git Commands

- `git add .`
  - Stages all changes for commit.
- `git commit -m "Your message"`
  - Commits staged changes with a message.
- `git push`
  - Pushes your commits to GitHub.

## Notes

- The `vite.config.js` is set up for GitHub Pages deployment (check `base` option if you change repo name).
- Images and static assets are in the `public/` folder.
- Project pages and routing are managed in `src/App.jsx`.

---

For more, see the comments in the code or ask for help!
