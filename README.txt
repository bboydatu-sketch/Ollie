MY WORDS AAC v0.4 — INSTALLABLE PWA

1. Upload ALL files in this folder together to a static HTTPS website (e.g. GitHub Pages, Netlify, Cloudflare Pages).
2. Open the HTTPS URL on the phone. Opening index.html from Files will NOT enable PWA installation/offline caching.
3. Android Chrome: tap Install when offered, or browser menu > Add to Home screen / Install app.
4. iPhone Safari: Share > Add to Home Screen > Add.
5. Launch from the home-screen icon. Landscape is requested by the web app manifest but iOS and some browsers may ignore it. Rotate device if needed.

Offline: after the first successful online visit and service worker installation, the app shell is cached for offline use. Speech depends on the device/browser's available installed voices and may not be reliable offline on all devices.

Privacy: cards and settings are stored locally in browser storage; clearing website data can erase customizations.
