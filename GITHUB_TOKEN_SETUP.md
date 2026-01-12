# How to Create and Use a GitHub Personal Access Token

## Step 1: Create a Personal Access Token on GitHub

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Fill in the form:
   - **Token name:** `HackAryaVerse2.0-Deploy`
   - **Expiration:** 90 days (or as needed)
   - **Scopes:** Check `repo` (full control of private repositories)
4. Click "Generate token" and **copy the token immediately** (you won't see it again!)
5. Save it somewhere safe - you'll need it in the next step

## Step 2: Configure Git with Your Token

Replace `YOUR_TOKEN_HERE` with your actual token:

```bash
git remote set-url origin https://hackaryaverse:YOUR_TOKEN_HERE@github.com/hackaryaverse/HackAryaVerse2.0.git
```

**Example (with fake token):**
```bash
git remote set-url origin https://hackaryaverse:ghp_abcd1234efgh5678ijkl9012mnopqrst@github.com/hackaryaverse/HackAryaVerse2.0.git
```

## Step 3: Verify the Setup

```bash
git remote -v
```

You should see:
```
origin  https://hackaryaverse:ghp_xxxx...@github.com/hackaryaverse/HackAryaVerse2.0.git (fetch)
origin  https://hackaryaverse:ghp_xxxx...@github.com/hackaryaverse/HackAryaVerse2.0.git (push)
```

## Step 4: Push to GitHub

```bash
git push origin main
```

---

## Important Security Notes

⚠️ **DO NOT** commit or share your token in any files
- Never push `.git/config` to a public repository
- If you accidentally exposed the token, delete it immediately on GitHub
- Git credentials can also be stored securely using credential managers

## Alternative: Use Git Credential Manager (Recommended for Security)

Instead of embedding the token in the URL, use Windows Credential Manager:

1. **Generate a Personal Access Token** (same as Step 1 above)
2. **First push attempt:**
   ```bash
   git push origin main
   ```
3. **When prompted for credentials:**
   - Username: `hackaryaverse`
   - Password: Paste your Personal Access Token
4. **Check "Save credentials"** in Windows Credential Manager
5. **Future pushes won't require authentication**

This is safer because your token isn't stored in `.git/config`
