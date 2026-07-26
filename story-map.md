# TVRD — User Story Map
Status quo · Jul 2026

**Design principle:** Execution mode (Start Training → Log Training → Finish & Review) is optimized for zero friction and minimal decisions — tracking is a necessary cost, not the goal, so it should hurt as little as possible. Plan mode (Set Up Plan, Track Progress, Manage Data) is the opposite — space to think, compare, and adjust.

---

## 1. Set Up Plan
*Configure days & exercises before training*

**Tasks**
- Manage training days
- Configure exercises
- Activate a new plan

**Built**
- Add training day (name only — emoji field removed)
- Rename a training day
- Delete day (with confirm)
- Add exercise (name, sets, target reps, weight step, rest duration)
- Edit exercise
- Delete exercise
- Drag to reorder exercises within a day
- Activate new plan (stamps new plan ID, preserves history)

**Partial / Gaps**
- 💡 Copy / duplicate a training day
- 💡 Save & switch between multiple plans

---

## 2. Start Training
*Know what's next & get moving with zero decisions*

**Tasks**
- Know what to train next without having to choose
- See all days at a glance (when deliberately browsing)
- Preview a session before manually picking a different day
- Resume an interrupted workout
- Log a rest day when not training

**Built**
- Focus View (Home): shows the next suggested training day directly — no picking required, just Start
- Suggested next day: round-robin by plan order, self-healing (recomputes from whichever day was actually last trained — no manual reset needed if you deviate)
- Direct "Training starten" from Focus View — skips the preview screen, jumps straight into the workout
- Draft-resume takes priority on Focus View whenever an interrupted workout exists
- Overview screen ("Alle Tage"): full day grid — last volume + trend badge, relative date, 4-week activity dots, "Empfohlen" tag on the suggested day
- Day preview screen (exercise list + last session weights) — shown when manually picking a day from Overview
- Resume / Discard draft
- Active Rest: log today as a recovery day from Focus View (counts for streak/heatmap, excluded from PR/progression math)

**Partial / Gaps**
- 💡 Training reminders / push notifications

---

## 3. Log Training
*Track every set in real time, safely, with as little friction as possible*

**Tasks**
- Log reps & weight per set
- See progress within the session
- Catch PRs live
- Rest between sets without losing the phone or the plot

**Built**
- Self-correcting timer (derives from absolute startTime, survives backgrounding)
- Set progress counter in header
- Per-exercise progress bar (fills in real time)
- Last session reference line per exercise
- Reps ±1 stepper (standard input for every exercise — no special-cased modes)
- Weight stepper (exercise-defined step, e.g. 2.5 kg)
- Direct numeric input for reps and weight
- Auto-commit on value entry (no explicit checkmark)
- Auto-save draft on every value change
- Abandon workout confirmation (warns if sets have been logged)
- Set weight PR badge (⚡ debounced 600ms, self-removes after 2.7s)
- Set volume PR badge (⚡ debounced)
- Exercise session PR glow (once per exercise per session)
- Manual rest timer per set (⏱ button, per-exercise configurable duration, vibration + visual alert at zero, tap-to-cancel)
- Screen stays awake during an active workout (Wake Lock API, re-engages automatically if the tab was backgrounded)

**Partial / Gaps**
- 💡 Notes per session or per exercise
- ⚠️ **Cosmetic** — exercises with legacy non-numeric target reps (e.g. an old "all out" label) show that text literally in the target/placeholder now that special-case handling is gone; fix per-exercise via the edit modal

---

## 4. Finish & Review
*End the session & see what was achieved*

**Tasks**
- End session cleanly
- See session summary
- Celebrate a PR

**Built**
- Finish workout flow (stops timer, saves session to history)
- Uncommitted sets filtered out on save (empty rows never pollute history)
- Summary card: sets, duration, exercises, total volume
- Per-day PR detection (best session ever for this specific training day — replaces the old global all-time comparison)
- 🏆 icon + pulsing badge naming the day if it's a per-day PR
- Return to home screen

**Partial / Gaps**
- 💡 Share / screenshot session summary

---

## 5. Track Progress
*Understand trends & stay motivated*

**Tasks**
- Browse session history
- Find personal records
- See exercise progression
- Check training consistency, broken down by training day

**Built**
- Full session history list (collapsible cards, set pills per exercise)
- Filter history by training day tab
- PRs tab: max weight ever + best single-set volume per exercise
- Progression tab: SVG line charts (weight over time + volume over time)
- Progression exercise selector dropdown
- Konsistenz: 16-week heatmap, color-coded by training day type with a legend (plus a distinct neutral color for Aktive Erholung)
- Konsistenz: avg sessions/week, current streak, total sessions (Active Rest entries count toward these)

**Partial / Gaps**
- ⚠️ **Partial** — `planId` saved per session but never used in queries — cross-plan history mixing is silent
- 💡 Weekly volume per muscle group / per training day
- 💡 Export chart as image

---

## 6. Manage Data
*Keep data safe & portable*

**Tasks**
- Persist data reliably across sessions
- Backup & restore after incidents

**Built**
- localStorage (stable key: `tvrd_db`, never to change)
- DB version field + sequential migration scaffold
- JSON export (dated filename: `tvrd_backup_YYYY-MM-DD.json`)
- JSON import (validates structure + runs migrations + reloads)
- Import error handling + toast feedback
- Reusable confirm modal (used by delete / exit flows)
- Toast notification system

**Partial / Gaps**
- ⚠️ **Partial** — Migration scaffold exists but no real migrations yet (app is still at v1)
- ⚠️ **Bug** — Data tied to browser origin → URL/bookmark change = data loss. Fix in progress: custom domain `tvrd.app` (Porkbun verification pending)
- 💡 Auto-backup reminder after N sessions
- 💡 Cloud sync (Supabase, would survive device changes)
