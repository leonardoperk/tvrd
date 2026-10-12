# TVRD · User Story Map
Status quo · Oct 2026 · interactive version: [docs/story-map.html](docs/story-map.html)

**Design principle:** Execution mode (Start Training → Log Training → Finish & Review) is optimized for zero friction and minimal decisions. Tracking is a cost, not the goal. Plan mode (Set Up Plan, Track Progress, Manage Data) is deliberately rougher: I rarely reconfigure, so it gets built out only as real needs surface.

Legend: ✅ solved · ⚠️ partially solved / bug · 💡 not yet · 🚫 by design: not built

---

## 1. Set Up Plan
*Deliberately rough: expert-tier planning lives here as gaps*

As a user, I want to **set up a training plan** in order to structure my workouts.

**"I want to configure a day: add exercises, name it, tweak the details."**
- ✅ Create / rename / delete training day
- ✅ Add exercise with sets, target reps, weight step & rest duration
- ✅ Edit or remove any exercise. Removing it from a day keeps its history
- ✅ Drag to reorder exercises within a day (a superset moves as one block, its exercises reorder only inside it)

**"I want to reuse an exercise in another day without typing it in again."**
- ✅ Exercises are modules: a searchable picker adds an existing one to another day, history stays shared
- ✅ ↔ marks a module used in several days. Changing its sets, reps, step or rest asks: everywhere, or its own exercise here
- ✅ A pure rename applies everywhere and never splits the history

**"I want to pair exercises I do back to back, without rest in between."**
- ✅ Create a superset: long-press an exercise's drag handle, pick 2 or more. Differing sets or rest are asked once, bundled
- ✅ Superset is its own module: reusable across days (↔), fork question when edited while shared
- ✅ Superset shows as a box in the plan: tap to edit, add/remove exercises, dissolve

**"I want to activate a new plan when my focus changes, without losing old history."**
- ✅ Activate new plan (stamps new ID, history stays intact)
- 💡 Multiple active-swappable plans + long-term periodization: how plans build on each other over months. Expert-tier feature that assumes the user plans across cycles, not week to week.

**"I want to duplicate or template a day instead of re-entering everything."**
- 💡 Copy / duplicate a training day

---

## 2. Start Training

As a user, I want to **know what's next and get moving with zero decisions** in order to not lose time or momentum.

**"I don't want to pick a day every time. Just tell me what's next and let me start."**
- ✅ Focus View (Home): shows the next suggested day directly, no picking required
- ✅ Suggestion is self-healing: recomputed from whichever day was actually last trained, no manual reset
- ✅ Direct "Training starten" from Focus View, skips the preview screen entirely
- ✅ Day's exercises on home: first three visible, the rest behind a toggle. A superset is one line
- ✅ Rolling 7-day activity strip, colored by training day type, always filled (never blank at week start)
- ✅ Today's status on home: "trained" or "active rest logged" chip when applicable
- ✅ Nudge on home after 3 or more days without training

**"If I want to see everything or train something different, that should be one tap away."**
- ✅ Overview screen ("Alle Tage"): last volume, trend, 4-week activity dots, "Empfohlen" tag
- ✅ Day preview (exercise list + last weights) shown when manually picking a day
- 💡 Training reminders / push notifications

**"I forgot to log a day and want to add it afterwards."**
- ✅ Tap an empty day in the week strip: log a past training (no live timer, saved to that date) or Active Rest
- ✅ One entry per day: a day that already has one can't be backfilled twice

**"I want to pick up where I left off if I had to stop mid-session."**
- ✅ Draft-resume takes priority on Focus View whenever an interrupted workout exists
- ✅ Resume restores timer + all entered values
- ✅ Discard option to start fresh

**"Some days I'm not training. I still want that to count without pretending it was a workout."**
- ✅ Active Rest: log today as recovery from Focus View. Counts for streak/heatmap, excluded from PR/progression

---

## 3. Log Training

As a user, I want to **log every set quickly and accurately, with minimal friction** in order to have a reliable record without it feeling like a chore.

**"I want to know what I lifted last time. No separate reference line, just already in the field."**
- ✅ Inputs pre-filled with last session's values on start: reference and starting point in one

**"I want to enter reps and weight fast. Tapping +/- is easier than typing during a workout."**
- ✅ Reps ±1 stepper: standard input for every exercise, no special-cased modes
- ✅ Weight stepper (exercise-defined increment, e.g. 2.5 kg for dumbbells, 5 kg for cables)
- ✅ Direct numeric input also available
- ✅ Entering a value commits the set. The ✓ only starts the rest, it logs nothing.

**"I want to rest between sets without losing my phone or my train of thought."**
- ✅ ✓ per set confirms it with a short animation and starts the rest timer, inline under that set. Duration configurable per exercise.
- ✅ Vibration + visual alert at zero, tap the ✓ again to stop early
- ✅ No rest timer when backfilling a past day
- ✅ Screen stays awake during the workout (Wake Lock, re-engages after backgrounding)

**"I want to run a superset as one flow."**
- ✅ One block, rounds alternate the exercises, one ✓ per round, rest only after the round
- ✅ Superset exercises keep their own history, labelled "· Superset" in PRs and progression

**"I want to know instantly when I hit a personal record."**
- ✅ ⚡ Weight PR badge on set (debounced, auto-removes)
- ✅ ⚡ Volume PR badge on set
- ✅ 🏆 Exercise session PR glow on the whole block

**"I don't want to lose everything if I accidentally close the app mid-workout."**
- ✅ Auto-save draft on every value change
- ✅ Self-correcting timer (survives backgrounding)
- ✅ Abandon confirmation if sets have been logged
- 💡 Notes per session or per exercise
- 🚫 RPE (Rate of Perceived Exertion): standard in strength apps, not needed for how I train. Might add later.

---

## 4. Finish & Review

As a user, I want to **end my session and see a summary** in order to feel the satisfaction of what I just did.

**"I want to see the key numbers (time, volume, sets) in one clean view."**
- ✅ Summary card: sets, duration, exercises, total volume
- ✅ Uncommitted sets filtered out, only real work is counted

**"I want to know if today was my best session ever for THIS training day, not some global number."**
- ✅ Per-day PR detection (best session ever for this day, replaces the old global all-time comparison)
- ✅ 🏆 icon + pulsing badge naming the day if it's a per-day PR

**"I want to share my session or save a screenshot to show progress."**
- 💡 Share / export session summary

---

## 5. Track Progress

As a user, I want to **see if I'm getting stronger over time** in order to stay motivated and train with purpose.

**"I want to look back at past sessions to remember what I did."**
- ✅ Full session history under Statistik → Verlauf (collapsible, set pills per exercise)
- ✅ Tap a trained day in the home week strip to jump straight to that session
- ⚠️ Filter by training day exists in code, but the old history screen with the day tabs isn't reachable since the tab bar came in. Verlauf shows all sessions.

**"I want to know my all-time best weight and volume per exercise."**
- ✅ PRs tab: max weight + best set volume per exercise

**"I want a chart that shows whether my lifts are going up over time."**
- ✅ Progression tab: weight over time + volume over time (hand-rolled SVG charts)
- ✅ Exercise selector to switch between movements

**"I want to see how consistently I'm training, broken down by day, so I stay accountable."**
- ✅ Konsistenz: 16-week heatmap, color-coded by training day type with a legend
- ✅ Distinct neutral color for Aktive Erholung entries
- ✅ Avg sessions/week · current streak · total sessions
- ⚠️ `planId` saved per session but never used in queries, so cross-plan history mixing is silent

---

## 6. Manage Data

As a user, I want my **training history to always be there** in order to never lose months of logged workouts.

**"I want the app to save everything automatically. I shouldn't have to think about it."**
- ✅ Auto-save to localStorage on every change (stable key: `tvrd_db`, never changes)
- ✅ Versioned schema with sequential migrations. v2 moved exercises out of the days into a shared module catalog, old backups get migrated on import
- ✅ Custom domain `tvrd.app`: bookmark / URL changes no longer look like data loss
- ✅ Works offline (service worker: fresh page when online, last cached version when not)

**"I want to back up my data and restore it if something goes wrong."**
- ✅ JSON export (dated backup file), tucked away under Plan → Erweitert
- ✅ JSON import with validation + migration
- 💡 Auto-backup reminder after N sessions

**"I want my data to follow me if I get a new phone."**
- 💡 Cloud sync: data tied to account, not device (e.g. Supabase)
- 🚫 User management & accounts: I'm the only user. Would add if a friend wants to try it.
