# Future Features — PPL Tracker

---

## Entry Gamification

**Idea:** Give the user positive and engaging feedback when entering sets and kg values during a workout.

**Examples:**
- Confetti effect when a new PR (personal record) is hit on weight or reps
- Subtle haptic + visual flash when a set is marked done
- "All sets done" celebration animation when an exercise is completed
- End-of-workout summary highlights PRs ("3 neue Bestleistungen heute 🏆")

**Implementation notes:**
- PR detection: compare current set's weight/reps against all-time max for that exercise from history
- Confetti: lightweight canvas-based library (e.g. canvas-confetti, ~3KB) or CSS-only particle burst
- Keep it subtle — fires max once per exercise per session, not on every set
- Must not interfere with the core input UX (no blocking overlays)

---

## Multi-Device Sync / Cloud Backup

**Idea:** Daten über mehrere Geräte synchronisieren und gegen Geräteverlust absichern.
Aktuell liegt alles nur lokal in `localStorage` — Handy weg = Daten weg.

**Nicht zu verwechseln mit Offline-Mode:** Die App läuft dank Service Worker bereits
offline (Stand: Aug 2026). Das hier ist der *große* Schritt und bewusst separat geparkt.

**Was es braucht:**
- Backend mit Auth + DB (z.B. Supabase Free-Tier)
- Sync-Layer: lokal-first schreiben, im Hintergrund pushen/pullen
- Konfliktauflösung, wenn zwei Geräte offline dieselbe Session ändern
  (simpel: last-write-wins pro Session; sauberer: pro Feld / Merge)
- Login-Flow (Magic-Link o.ä.), damit's nicht nervt

**Aufwand:** eigenes Projekt, kein Tweak (Wochenende+). Bricht das reine
Lokal-Modell — vorher entscheiden, ob's das wert ist.

---

## Eigenes App-Icon designen

**Status:** Aktuell ist eine **Platzhalter-Hantel** verbaut (generiert 2026-08-23,
`icon-180/192/512.png` + `icon.svg`). Reicht, damit die Homescreen-Kachel nicht mehr
der alte „P"-Buchstabe ist — aber es ist bewusst nur eine Probe.

**Idee:** Ein eigenes, gscheites App-Icon entwerfen (Wortmarke „TVRD" vs. Symbol,
Farbe, Form). Danach die vier Icon-Dateien ersetzen und in `sw.js` `CACHE` hochzählen
(tvrd-v2), damit die neue Kachel bei bestehenden Installs durchkommt.

**Nicht vergessen:** iOS nimmt `apple-touch-icon` (PNG 180×180), Android/Chrome das
Manifest (PNG 192/512), Browser-Tab die `icon.svg` — alle vier konsistent halten.
