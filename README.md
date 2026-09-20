# Getting Clearing live — a guide for non-developers

You will not write a single line of code. You will upload files by dragging them
into a web page, and click a few buttons. Total time: about 40 minutes.

At the end you will have:

- a real website address anyone in the world can open
- an app that installs on any Android phone, with its own icon, that works offline
- automatic thought analysis running on a free AI model
- zero monthly cost

---

## What you have in this folder

| File | What it is | Do you touch it? |
|---|---|---|
| `index.html` | The entire app | Only if you add a proxy (Step 6) |
| `manifest.webmanifest` | Tells Android it's an installable app | No |
| `sw.js` | Makes the app work offline | Only when updating (Step 7) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | The app icon | Replace if you want your own |
| `worker.js` | Optional server (Step 6) | Not yet |

Upload **all of them together**, in the same place. They only work as a set.

---

## Step 1 — Get a free AI key (5 minutes)

1. Go to **console.groq.com** and sign in with Google.
2. Click **API Keys** in the left menu, then **Create API Key**.
3. Name it `clearing`. Click create.
4. **Copy the key now** — it starts with `gsk_` and it is shown only once.
   Paste it into a note on your phone or computer.

This is free. Groq gives a generous daily allowance and asks for no card.

> **Do not put this key inside any file yet.** Anyone who views your website
> could read it and spend your allowance. Step 6 explains the safe way to share
> it with users. Until then, each user pastes their own key, which costs you
> nothing and is perfectly normal for a free tool.

---

## Step 2 — Create your GitHub account (5 minutes)

GitHub will store your files and serve your website, free, forever.

1. Go to **github.com** and click **Sign up**. Use your email, pick a username.
   Your username becomes part of your web address, so choose something you're
   happy to show people — `shoaibkhan` is better than `user99281`.
2. Verify your email when they send the link.

---

## Step 3 — Upload the app (10 minutes)

1. Logged in to GitHub, click the **+** at the top right → **New repository**.
2. Fill in:
   - **Repository name**: `clearing`
   - **Public** (must be public — the free website hosting requires it)
   - Tick **Add a README file**
3. Click **Create repository**.
4. On the page that appears, click **Add file** → **Upload files**.
5. Open this folder on your computer. Select **all seven files** (Ctrl+A, or
   click the first and Shift-click the last) and **drag them onto the GitHub
   page**. Do not drag the folder itself — drag the files inside it.
6. Wait for every file to finish uploading, then click the green
   **Commit changes** button at the bottom.

You should now see all seven files listed.

---

## Step 4 — Switch the website on (3 minutes)

1. In your repository, click **Settings** (top right of the repo, not your
   profile settings).
2. In the left menu, click **Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**. Click **Save**.
5. Wait two or three minutes, then refresh the page. A green box will show your
   address:

   ```
   https://YOURUSERNAME.github.io/clearing/
   ```

**Open that link. Your app is live on the internet.**

If you see a plain file list instead of the app, add `index.html` to the end of
the address.

---

## Step 5 — Install it on your phone (2 minutes)

1. Open your new address in **Chrome on Android**.
2. Tap the **⋮** menu → **Add to Home screen** (or **Install app**).
3. Confirm.

It now sits on your home screen with its own icon, opens without a browser bar,
and works with no internet connection. Send the link to anyone — they install it
the same way, with nothing to download and no store involved.

To turn on analysis: open **Settings** inside the app, paste your `gsk_` key,
tap **Save key**. Then write a thought and tap **Find what's distorted**.

**For many projects, you can stop here.** A link that installs on any phone,
costs nothing, and needs no approval from Google is a completely legitimate way
to ship. The steps below are optional improvements.

---

## Step 6 — Optional: remove the key step for your users

Right now every user must get their own Groq key. Most won't bother. A tiny free
server fixes this — your key stays hidden on the server and users just use the app.

1. Go to **dash.cloudflare.com**, sign up free.
2. Left menu → **Workers & Pages** → **Create** → **Create Worker**.
3. Name it `clearing-api`. Click **Deploy** (ignore the sample code).
4. Click **Edit code**. Delete everything in the editor. Open `worker.js` from
   this folder in Notepad, copy all of it, paste it in. Click **Deploy**.
5. Go back to the Worker's page → **Settings** → **Variables and Secrets** →
   **Add** → type **Secret**:
   - Name: `GROQ_KEY`
   - Value: your `gsk_…` key
   - Click **Save and deploy**.
6. Copy the Worker's address at the top of the page. It looks like
   `https://clearing-api.yourname.workers.dev`
7. Back in GitHub, open `index.html`, click the **pencil icon** to edit. Press
   Ctrl+F and search for `const PROXY_URL`. Change this one line:

   ```js
   const PROXY_URL = "";
   ```
   to
   ```js
   const PROXY_URL = "https://clearing-api.yourname.workers.dev";
   ```
8. Also change `const CACHE = "clearing-v1"` in `sw.js` to `"clearing-v2"`.
9. Commit both changes.

Analysis now works for everyone, instantly, with no setup. Cloudflare's free tier
allows 100,000 requests a day — far more than you will need.

⚠️ Watch your Groq usage for the first week. If the app gets popular, your free
allowance is shared by all users. If it runs out, the app degrades gracefully —
users just label thoughts manually.

---

## Step 7 — Updating the app later

Every time you change `index.html`:

1. In GitHub, click the file → **pencil icon** → edit → **Commit changes**.
2. **Open `sw.js` and change the version number** — `clearing-v2` becomes
   `clearing-v3`, and so on.

That second part is not optional. The app stores itself on people's phones for
offline use, and without a new version number their phones will keep showing the
old one. This catches out nearly everyone the first time.

---

## Step 8 — Optional: getting onto the Play Store

Be clear-eyed about this one.

**The unavoidable cost: Google charges $25, once, forever, for a developer
account.** Nothing gets into the Play Store without it. Everything else is free.

If you're willing to pay it:

1. Go to **pwabuilder.com**. Paste your GitHub Pages address. Click **Start**.
2. It scores your app — it should pass, because the manifest and offline support
   are already in place.
3. Click **Package for stores** → **Android** → **Generate Package**.
4. Download the zip. Inside is an `.aab` file (that's your app) and a
   `signing key` folder — **back that key up somewhere safe.** Lose it and you
   can never update your app again; you'd have to publish it as a new listing.
5. Sign up at **play.google.com/console**, pay the $25, create an app, and
   upload the `.aab`.

**What Google will ask you for**, and you must have ready:

- A **privacy policy** at a public web address. Yours is simple and true: data is
  stored on the device, nothing is collected. You can write it as a second page
  in the same GitHub repo.
- A **health app declaration**. Mental health apps get extra scrutiny. Do not
  claim to treat, diagnose, or cure anything. Describe it as a self-help tool
  based on cognitive behavioural techniques. The wording already in the app's
  Library and Settings screens is deliberately written to be defensible.
- **Crisis resources visible in the app.** Already built in — don't remove them.
- A feature graphic, screenshots, and a short description.

Review takes a few days to a couple of weeks for a first-time developer.

**Free alternatives to the Play Store:**

- **Just share the link.** Installs in two taps, no store, no fee, no review, and
  you can update it instantly. For a free tool given away to help people, this is
  genuinely the better route.
- **Amazon Appstore** — free to publish, no developer fee.
- **F-Droid** — free, well-respected among privacy-minded users, which suits this
  app's local-only design.

---

## Step 9 — Before you send it to real people

- Complete one full thought record yourself, end to end. Check the belief number
  actually moves.
- Test on a real Android phone, not just a computer.
- Check the crisis helpline numbers are current for your region.
- **Get a licensed clinician to read the Library screen and the crisis wording.**
  The techniques are standard and safe, but a psychologist's sign-off on your
  specific wording is what separates a credible free tool from a liability. In
  Pakistan, a clinical psychologist at a teaching hospital or a university
  psychology department is usually willing to review something like this.

---

## If something goes wrong

**Page shows a file list, not the app** — add `index.html` to the end of the URL.

**Page is blank** — the files probably got uploaded inside a folder. In GitHub,
`index.html` must sit at the top level of the repository, not inside
`clearing-app/`.

**"Add to Home screen" doesn't appear** — GitHub Pages hasn't finished, or
`manifest.webmanifest` didn't upload. Wait five minutes and check the file list.

**Analysis says the key isn't switched on** — the key was pasted with a space, or
wasn't saved. Re-copy it from Groq and paste again.

**Changes don't appear on your phone** — you forgot to bump the version in
`sw.js` (Step 7). Or uninstall and reinstall the app to force a refresh.
