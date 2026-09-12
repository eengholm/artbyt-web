# Decap CMS Setup Guide

The site uses **Decap CMS** for content management. Content is stored as Markdown files in the Git repository and images in `public/assets/uploads/`. Changes are published through Git commits — no database.

## How It Works

- Decap CMS runs in the browser at `/admin` and talks to the **GitHub API** to read/write content files.
- Authentication uses **GitHub OAuth**, handled by the site's own proxy routes:
  - `GET /api/auth` — redirects to GitHub's OAuth authorize screen
  - `GET /api/auth/callback` — exchanges the code for a token and posts it back to the CMS window
- Configuration lives in `public/admin/config.yml`.

## Requirements

- A GitHub repo with the content files (repo: `eengholm/artbyt-web`, branch: `main`).
- The project lives in the `artbyt-web/` subfolder of the repo (`base_path: artbyt-web` in the config).
- A GitHub **OAuth App** and the two environment variables below.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `OAUTH_CLIENT_ID` | GitHub OAuth App client ID |
| `OAUTH_CLIENT_SECRET` | GitHub OAuth App client secret |

### 1. Create a GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Homepage URL: your site URL (e.g. `https://www.timbylander.com`)
3. Authorization callback URL: `https://www.timbylander.com/api/auth/callback`
4. Copy the Client ID and generate a Client Secret.
5. Add them to your hosting platform's environment variables:
   ```
   OAUTH_CLIENT_ID=your_client_id
   OAUTH_CLIENT_SECRET=your_client_secret
   ```

### 2. Configure the Backend

`public/admin/config.yml` already points at the GitHub backend:

```yaml
backend:
  name: github
  repo: eengholm/artbyt-web
  branch: main
  base_url: https://www.timbylander.com/
  auth_endpoint: /api/auth
  base_path: artbyt-web
```

### 3. Access the Admin Interface

```
https://www.timbylander.com/admin
```

or locally:

```
http://localhost:3000/admin
```

### 4. Local Development

For local testing, uncomment this line in `public/admin/config.yml`:

```yaml
local_backend: true
```

Then run in a separate terminal:

```bash
npx decap-server
```

## Content Structure

```
content/
  ├── settings/             # Page & site settings
  │   ├── general.md        # Site title, contact info, logo
  │   ├── homepage.md       # Homepage slideshow
  │   ├── about.md          # About page
  │   └── portfolio.md      # Portfolio gallery
  └── projects/             # Project assignments (one file each)
      └── <slug>.md

public/
  ├── admin/
  │   ├── index.html        # CMS admin interface
  │   └── config.yml        # CMS configuration
  └── assets/
      └── uploads/          # Media uploaded via the CMS
```

## Collections

Defined in `public/admin/config.yml`:

- **Uppdrag (Projects)** — folder collection, one Markdown file per project in `content/projects/`. Fields: title, slug, draft, date, excerpt, description, cover image, markdown body, gallery images.
- **Sidor (Pages)** — homepage slideshow, about page, and portfolio gallery.
- **Inställningar (Settings)** — general site settings.
- **Butik (Shop)** — ⚠️ **not managed in the CMS.** Products come from Stripe; see `SHOP_SETUP.md`.

## Publishing a Change

1. Sign in at `/admin`.
2. Edit or create content.
3. Click **Publish** — Decap commits the change to GitHub (branch `main`).
4. Deploy triggers automatically on the hosting platform.
   - Pages are static/SSG: `/shop`, `/shop/[slug]` and projects revalidate every hour (`revalidate = 3600`), while most pages build at deploy time.

## Image Handling

- Uploaded images go to `public/assets/uploads/` and are referenced from content files.
- Use the **Uploads** media library in the CMS to add images to files.
- If the repo grows large, consider Git LFS or an external CDN (see troubleshooting below).

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| "OAUTH_CLIENT_ID not configured" | `OAUTH_CLIENT_ID` missing on the server |
| Callback returns an error | `OAUTH_CLIENT_SECRET` missing or OAuth App callback URL doesn't match |
| CMS shows "Not Found" for the backend | `base_path`/`media_folder` paths don't match repo layout (project is in `artbyt-web/`) |
| Can't load images | `media_folder`/`public_folder` mismatch in `config.yml` |

## Key Files

- `public/admin/config.yml` — backend, collections, and widget definitions
- `src/app/api/auth/route.ts` — GitHub OAuth redirect
- `src/app/api/auth/callback/route.ts` — token exchange + postMessage back to CMS
- `src/app/(site)/admin/page.tsx` — CMS page wrapper

For more on Decap CMS, see https://decapcms.org/docs/intro/