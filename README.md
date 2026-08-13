# TVRD

A training tracker I built for myself and use every session.

**Live:** [tvrd.app](https://tvrd.app) — a single-file web app, installable to the home screen.

> *tvrd* — Bosnian for "hard / tough."

<img src="docs/home.png" width="280" alt="TVRD home screen: the next suggested training day, a rolling 7-day activity strip, and the day's exercises">

**n=1 by design.** I'm the only user. This isn't a product case study with a user base and dashboards — it's the tool I wanted, built and iterated in the open. What's worth showing is the thinking and the way it was built, so that's what this README covers. The full feature map lives in [`story-map.md`](story-map.md).

---

## Why it exists

I tracked my workouts in a Google Sheet. Entry was tedious. I tried the fitness apps — same problem every time: none of them focus on the one thing I actually want to do, which is log a set as fast as possible without being pulled out of the workout.

So I built the focus mode I wanted. During training there is exactly one job: enter reps and weight, and move on. Everything else — planning, comparing, analysing — lives in a separate mode where thinking is welcome. Logging is a cost, not the goal, so it should hurt as little as possible.

---

## How I built it with AI

I didn't write the code. I directed it.

I set the direction, made the product decisions, and reviewed every change. Claude Code (Anthropic's CLI) did the implementation. The split is deliberate and it isn't hidden — **every recent commit in this repo is co-authored by Claude.** The git history is the honest record of how this was built.

The judgment was mine — and the most useful thing I brought wasn't code, it was using the app for real.

**A bug only daily use would catch.** The home screen told me I'd trained back "yesterday" when I'd actually trained it two days earlier. I reported exactly that. It turned out the app measured "last trained" in elapsed 24-hour blocks instead of calendar days — so a Saturday-evening session read as "yesterday" on Monday morning. The same flaw was sitting in two other places, the week dots and the consistency heatmap, where it would have drifted by a day too. Precise direction from real use turned a one-line symptom into a fix for a whole class of bug, instead of a patch on the surface.

That's the loop: I bring the ground truth and the judgment, the AI brings the implementation, and reviewing the output critically — not accepting it — is the actual job.

---

## Product decisions

A few worth calling out (the rest are in [`story-map.md`](story-map.md)):

**Two modes, opposite goals.** Execution mode (Start → Log → Finish) is tuned for zero friction and minimal decisions. Plan mode (build the plan, track progress) is the opposite — room to think and compare. One app, two deliberately different design targets.

**Input is commitment.** Sets used to have an explicit "done" checkmark. I removed it — entering a value commits the set. One less tap, every set, every workout.

**Built "All Out mode", then killed it.** I added a special input mode for all-out sets, used it, and removed it later. It special-cased the input path for very little gain. One standard input for every exercise is simpler, and I don't miss it.

**Per-day records, not all-time.** A personal record is measured against the best session for *that* training day, not one global number. A global all-time record gets beaten once and then never again — it stops motivating. Per-day, there's almost always something to beat.

**The suggested next day heals itself.** The app proposes what to train next by rotating through the plan — but it recomputes from whichever day I actually trained last. Skip a day or train out of order and it simply picks up from there. No manual reset.

---

## What I deliberately did not build

At n=1, knowing what to leave out is most of the work.

- **Cloud sync** — it's `localStorage` only. A backend would let data survive a new phone, but for a single-device personal tool the complexity isn't worth it yet.
- **Multiple plans / plan switching** — one active plan at a time.
- **Reminders / notifications** — the app doesn't nag. I open it when I train.
- **Per-muscle-group analytics** — interesting, not needed for how I actually use it.

---

## Known limitations

Stated plainly, because a tool you use daily has real edges:

- **Data is device-bound.** `localStorage` lives in one browser on one device. A custom domain fixed the "bookmark changes → looks like data loss" problem, but it does **not** sync across devices. Backup and restore are manual JSON export/import.
- **Cross-plan history mixes silently.** Each session stores its `planId`, but nothing filters on it yet — activate a new plan and old sessions still count toward the stats.
- **Migration scaffold, no migrations yet.** There's versioned-schema plumbing for zero-downtime data upgrades, but the app is still on v1, so it's untested in practice.

---

## Tech

- **One HTML file.** ~2,300 lines, HTML + CSS + JS inline. No framework, no build step, no dependencies. The Inter font is embedded as base64, so there isn't even a network request for it.
- **Persistence:** `localStorage`, versioned schema with a migration scaffold.
- **Charts:** hand-rolled inline SVG, no charting library.
- **Platform APIs:** Wake Lock (screen stays on mid-workout), Vibration (rest-timer alert), installable PWA (standalone, custom home-screen icon).
- **Deploy:** GitHub Pages with a custom domain.

---

## Screens

<p>
  <img src="docs/overview.png" width="270" alt="Overview: all training days with last volume, trend, and a four-week activity trail">
</p>
