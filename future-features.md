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

**In zwei Stufen denkbar — die erste löst schon das Wichtigste:**

**Stufe 1 — Backup gegen Datenverlust (klein).** Reines Absichern, kein Multi-Device.
Heute lebt alles nur im `localStorage` (`tvrd_db`) — Handy weg, oder Homescreen-Kachel
gelöscht = History weg. Es gibt zwar einen manuellen Export/Import (`exportData` /
`importData`, Plan → Erweitert), aber das muss man dran denken. Ziel: automatisches
Cloud-Backup im Hintergrund, damit ein Gerätewechsel nicht mehr schmerzt. Braucht ein
Backend + irgendeine Kennung, gegen die gesichert wird (siehe User Management unten).

**Stufe 2 — echter Multi-Device-Sync (groß).** Auf mehreren Geräten dieselben Daten,
bidirektional.
- Sync-Layer: lokal-first schreiben, im Hintergrund pushen/pullen
- Konfliktauflösung, wenn zwei Geräte offline dieselbe Session ändern
  (simpel: last-write-wins pro Session; sauberer: pro Feld / Merge)

**Was beide brauchen:** Backend mit DB (z.B. Supabase Free-Tier) + Auth (siehe unten).

**Aufwand:** eigenes Projekt, kein Tweak (Stufe 1 ~Wochenende, Stufe 2 mehr). Bricht das
reine Lokal-Modell — vorher entscheiden, ob's das wert ist.

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

---

## User Management (für n > 1)

**Idee:** Sobald tvrd mehr als einen Nutzer haben soll (n > 1) — Leo + andere —
braucht es Accounts: wissen, *wessen* Daten das sind, und sie voneinander trennen.

**Aktuell:** n = 1, keine Accounts. Alle Daten sind anonym-lokal pro Gerät.

**Was es braucht:**
- Auth (Login/Registrierung — Magic-Link o.ä., damit's nicht nervt)
- Pro-User-Datentrennung im Backend (jede Session/History hängt an einer User-ID)
- Rollen/Sichtbarkeit erst wenn wirklich gebraucht — nicht vorbauen

**Zusammenhang:** ist die **Voraussetzung** für Cloud-Backup/Sync oben (ohne Identität
kein „meine Daten" gegen die gesichert/gesynct wird). Reihenfolge, falls beides kommt:
Auth/User Management zuerst, dann Backup (Stufe 1), dann Multi-Device-Sync (Stufe 2).

**Vorsicht Scope:** ändert tvrd vom persönlichen Tool zum Produkt. Nur angehen, wenn's
wirklich mehr als einen Nutzer geben soll — sonst reine Komplexität ohne Gegenwert.
