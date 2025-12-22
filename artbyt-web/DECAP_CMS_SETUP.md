# Decap CMS Setup Guide

## ✅ Migration Complete!

Your project has been successfully migrated from Vercel Postgres to Decap CMS. This eliminates database costs and simplifies content management.

## What Changed

### Removed

- ❌ Vercel Postgres database
- ❌ Vercel Blob storage
- ❌ NextAuth authentication
- ❌ Custom admin page
- ❌ Database tables and ORM code

### Added

- ✅ Decap CMS for content management
- ✅ File-based content storage in `_assignments/`
- ✅ Images stored in `public/assets/assignments/`
- ✅ Git-based workflow for all content

## How to Use Decap CMS

### 1. Set Up Git Backend

To use Decap CMS, you need to configure a Git backend. The most common options are:

#### Option A: GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to GitHub Settings → Developer Settings → OAuth Apps → New OAuth App
3. Set Homepage URL to your site URL (e.g., `https://yourdomain.com`)
4. Set Authorization callback URL to `https://yourdomain.com/api/auth/callback`
5. Copy the Client ID and generate a Client Secret
6. Add to your hosting platform's environment variables:
   ```
   OAUTH_GITHUB_CLIENT_ID=your_client_id
   OAUTH_GITHUB_CLIENT_SECRET=your_client_secret
   ```

#### Option B: Local Development Mode

For testing locally, uncomment this line in `public/admin/config.yml`:

```yaml
local_backend: true
```

Then run in a separate terminal:

```bash
npx decap-server
```

### 2. Access the Admin Interface

Once configured, visit:

```
http://localhost:3000/admin
```

Or on your deployed site:

```
https://yourdomain.com/admin
```

### 3. Creating New Assignments

1. Go to `/admin`
2. Click "Assignments" in the sidebar
3. Click "New Assignment"
4. Fill in:
   - Title
   - Publish Date
   - Description
   - Cover Image (main image)
   - Gallery Images (optional additional images)
5. Click "Publish"

Your assignment will be saved as a markdown file in `_assignments/` and images will be stored in `public/assets/assignments/`.

### 4. Editing Existing Assignments

1. Go to `/admin`
2. Click "Assignments"
3. Click on the assignment you want to edit
4. Make changes
5. Click "Publish"

## File Structure

```
_assignments/               # Assignment markdown files
  └── 2024-12-29-title.md   # Each assignment as markdown

public/
  └── assets/
      └── assignments/      # Assignment images
          └── image.jpg
  └── admin/
      ├── index.html        # CMS admin interface
      └── config.yml        # CMS configuration
```

## Deployment

### Vercel

Decap CMS works great with Vercel. Just push to your GitHub repo and Vercel will auto-deploy.

### Netlify

Netlify has built-in support for Decap CMS (formerly Netlify CMS). Just:

1. Connect your Git repository
2. Deploy
3. Use Netlify Identity for authentication (no OAuth setup needed!)

## Cost Savings

**Before:**

- Vercel Postgres: ~$20+/month
- Vercel Blob: ~$5+/month
- **Total: $25+/month**

**After:**

- Git storage: Free (included with GitHub/GitLab)
- Hosting images in repo: Free
- **Total: $0/month**

## Backup & Version Control

All your content is now stored in Git, which means:

- ✅ Full version history for all assignments
- ✅ Automatic backups (git commits)
- ✅ Easy rollback if needed
- ✅ Collaboration through pull requests

## Managing Large Images

If your repository grows too large with images, consider:

1. **Git LFS** - Large File Storage for binary files
2. **External CDN** - Use a free service like Cloudinary
3. **Image optimization** - Compress images before upload

## Support

For Decap CMS documentation, visit:

- https://decapcms.org/docs/intro/

For issues with this setup, check the configuration in:

- `public/admin/config.yml`
