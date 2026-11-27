Thread — Home Screen web app
=============================

What's in this folder
- index.html             The whole app.
- sw.js                  Lets Thread open without internet.
- manifest.webmanifest   App name, colours and icons for "Add to Home Screen".
- *.png, logo.svg        The red-thread icon at every size.

Put it online (one time)
1. On your Mac, go to app.netlify.com/drop.
2. Drag this folder (or the zip) onto the page.
3. Sign up or log in (free) to claim the site. Until you do, it sits behind a temporary password.
   If the site is set to private, make it public. Only the empty app lives there;
   your writing never leaves your devices.

Install on iPhone or iPad
1. Open the site's address in Safari.
2. Tap Share, then Add to Home Screen, then Add.
3. Always open Thread from the Home Screen icon. It keeps its own notebook,
   separate from Safari.

Back up and restore
- Projects menu > Back up > Save > Save to Files > iCloud Drive.
- On another device: Projects menu > Restore, then pick the backup file.
  Restoring replaces what's in Thread on that device.
- Thread reminds you if your last backup is more than two weeks old.

Updating the app later
1. Replace the files in this folder with the new ones.
2. In sw.js, change VERSION (for example thread-v6 to thread-v7).
3. In Netlify, open the site and drag the folder onto Production deploys.
   Phones pick up the new version the next time Thread opens.
