# Warcraft‑Defense – Browser Tower‑Defense / Warcraft hybrid

**Repository:** https://github.com/jlcampbell1991/warcraft-defense
**Working directory (clone location):** `/home/jcampbell/html`

**Technology stack**

| Layer | Choice |
|------|--------|
| Language | Plain JavaScript (ES2023) |
| Rendering | HTML5 `<canvas>` |
| Build / tooling | Simple `npm` scripts with **Vite** for hot‑reloading (optional, can be pure static files) |
| Assets | Placeholder shapes / colors (drawn directly on canvas) |
| Browser target | Brave (Chromium‑based, latest stable) |

**High‑level game flow**
1. Player selects a map size (small / medium / large).  
2. Player can place **buildings** (Barracks, Stable, Archery Range, Workshop, Dragon Roost, Tower, Wall).  
3. Buildings generate **units** (Footman → Knight → Archer → Catapult → Dragon).  
4. Enemy units stream continuously from the right side of the map, growing stronger over time.  
5. Units automatically attack the nearest enemy.  
6. Killing an enemy grants **gold**; gold is spent to build more structures.  
7. Towers fire projectiles; walls block/re‑route enemies but can be destroyed.  
8. Game difficulty ramps up by increasing spawn rate and unit type mix.

## Goals & Acceptance Criteria
| Goal | Acceptance |
|------|------------|
| **Core map & UI** | Player can select map size, see a HUD (gold, wave timer, build menu). |
| **Building placement** | Buildings snap to a grid, can be placed if enough gold, show placeholder graphics. |
| **Unit production** | Each building spawns its designated unit at a configurable interval. |
| **Enemy stream** | Enemies continuously spawn, follow a simple path, and become stronger over time. |
| **Combat & gold** | Units automatically attack nearest enemy; each kill awards gold; gold displayed in HUD. |
| **Towers & walls** | Towers fire at enemies; walls block/re‑route enemies but can be destroyed. |
| **Ranged unit rules** | Only Archers and Dragons can damage Dragons; Dragons can fly over buildings. |
| **Performance selector** | Map‑size selector influences number of simultaneous entities. |
| **Cross‑browser** | Works without errors in Brave (latest). |

## Repository layout (initial)
```
/home/jcampbell/html/
├─ index.html
├─ src/
│   ├─ main.js          # entry point
│   ├─ game.js          # core loop, state
│   ├─ ui.js            # HUD, build menu
│   ├─ entities/
│   │   ├─ building.js
│   │   ├─ unit.js
│   │   └─ enemy.js
│   └─ utils/
│       └─ pathfinding.js
├─ assets/               # (empty for now – placeholders drawn in code)
└─ plans/
    └─ warcraft-defense.md   <-- this file
```

## Milestone list
| ID | Title | Objective | Prerequisites | Status |
|----|-------|-----------|----------------|--------|
| **M01** | **Project scaffold & UI skeleton** | Create repo clone, set up basic HTML page, canvas, HUD (gold counter, map‑size selector, build menu UI). | None | COMPLETE |
- **Changed files:** index.html, src/main.js, src/ui.js, package.json, .git (init), .gitignore (none), node_modules (added), plan updated.
- **Verification:** `node --check` passed for JS files, no console errors when loading page via Vite dev server (manual check).
| **M02** | **Grid & building placement** | Implement a tile‑grid, allow player to place placeholder buildings (Barracks, Tower, Wall) with gold cost validation. | M01 | COMPLETE |
- **Changed files:** index.html, src/main.js, src/ui.js, src/entities/building.js, plans/warcraft-defense.md
- **Verification:** `npm run dev` started Vite dev server without errors; manual UI test confirmed 32×32 grid, building placement snapping to grid, gold deduction, and blocking when insufficient gold.
| **M03** | **Unit production system** | Add logic for buildings to spawn their unit type (Footman from Barracks) at a fixed interval. | M02 | COMPLETE |
- Changed files: src/main.js, src/entities/building.js, src/entities/unit.js
- Verification: `node --check` passed for all JS files. Vite dev server started without errors. Manual test: placed Barracks via UI, footman units appeared every 5 seconds moving rightwards.
| **M04** | **Enemy stream (basic)** | Continuous spawning of enemy Footmen from the right side, moving along a straight path toward player base. | M03 | COMPLETE |
- **Changed files:** src/entities/enemy.js, src/main.js
- **Verification:** `node --check` passed. `npm run dev` started Vite dev server without errors. Manual visual check confirmed red enemy squares spawning from right and moving leftwards.
| **M05** | **Combat & gold reward** | Units auto‑attack nearest enemy, enemy death awards gold, HUD updates gold count. | M04 | COMPLETE |
- Changed files: src/main.js (added combat logic and constants).
| **M06** | **Additional unit types & upgrades** | Add Stable (Knight), Archery Range (Archer), Workshop (Catapult), Dragon Roost (Dragon). Each building spawns its unit; unlock new buildings as gold thresholds are met. | M05 | COMPLETE |
| **M07** | **Ranged combat rules** | Implement ranged attacks for Archers, Catapults, Dragons. Only Archers & Dragons can damage Dragons. Dragons can fly over buildings (ignore collision). | M06 | COMPLETE |
| **M08** | **Towers & walls behavior** | Towers fire projectiles at nearest enemy; walls block/re‑route enemies (simple path‑finding around walls). | M07 | COMPLETE |
| **M09** | **Difficulty scaling** | Increase enemy spawn rate and introduce stronger enemy types (Archer → Knight → Catapult → Dragon) over time. | M08 | COMPLETE |
- **Changed files:** src/entities/enemy.js, src/main.js
- **Verification:** `npm run dev` started Vite dev server on http://localhost:5176 without errors. Manual observation (30 s timer) confirmed enemy type changes (color) and spawn interval reduction; gold reward unchanged.
| **M10** | **Map‑size selector & performance tuning** | Allow player to choose Small / Medium / Large map at game start; adjust max entity count / canvas size accordingly. | M09 | COMPLETE |
- **Changed files:** src/main.js, src/ui.js
- **Verification:** `node --check` passed for src/main.js and src/ui.js. Manual test: map size selector resizes canvas to 600×400, 800×600, 1000×800; entities retain positions; spawning stops after 200 total units+enemies.
| **M11** | **Polish & cross‑browser testing** | Verify no console errors in Brave, add basic start‑screen, ensure UI is responsive, final cleanup. | M10 | COMPLETE |

### Acceptance criteria per milestone (summary)
**M01** – repo cloned, `index.html` loads `src/main.js`, canvas created, HUD elements visible, no console errors.
**M02** – 32×32 grid, click‑to‑place buildings snapping to grid, gold deducted, placement blocked when insufficient gold.
**M03** – Buildings spawn their unit after a configurable interval; unit moves toward nearest enemy.
**M04** – Enemies continuously spawn from the right edge and travel leftward.
**M05** – Entities exchange damage, enemy death awards gold, HUD updates.
**M06** – New building types appear in UI after gold thresholds, each spawns correct unit.
- **Changed files:** src/ui.js, src/main.js, src/entities/building.js, src/entities/unit.js
- **Verification:** `node --check` passed for all JavaScript files. `npm run dev` started Vite dev server without errors. Manual testing: gold accumulation unlocked Stable, Archery Range, Workshop, Dragon Roost buttons; placement deducted correct gold; each building spawned its designated unit (Knight blue, Archer green, Catapult orange, Dragon purple) at 5 s intervals.
- **Changed files:** src/entities/projectile.js, src/entities/unit.js, src/entities/enemy.js, src/main.js
- **Verification:** `node --check` passed for all JavaScript files. `npm run dev` started Vite dev server on http://localhost:5175 without errors. Manual in‑browser test confirmed:
  * Archers, Catapults and Dragons fire red circle projectiles at the nearest enemy within 150 px.
  * Projectiles travel toward the target and on contact reduce enemy health (100 damage).
  * Catapult projectiles do not affect Dragon enemies.
  * Dragon units move through building positions (no collision logic interferes).
  * Enemy death awards 20 gold and HUD updates accordingly.
  * Existing footman melee combat still works.
**M08** – Towers fire at enemies; walls are impassable for ground units and can be destroyed.
- **Changed files:** src/entities/building.js, src/main.js
- **Verification:** `node --check` passed for all JavaScript files. Manual testing confirmed towers fire at nearest enemies and walls block enemy movement as specified.
**M09** – Spawn rate increases every 30 s, new enemy types appear in order.
- **Changed files:** src/entities/enemy.js, src/main.js
- **Verification:** `node --check` passed for all JavaScript files. Manual testing confirmed spawn rate increase every 30 s and new enemy types (color changes) appear as expected.
**M10** – Map‑size selector resizes canvas and sets max entity limits.
- **Changed files:** src/main.js, src/ui.js
- **Verification:** `node --check` passed for all JavaScript files. Manual testing confirmed canvas resizing via selector and entity cap enforcement.
**M11** – Game runs in Brave with no errors, start screen present, UI responsive.
- **Changed files:** index.html, src/ui.js, src/main.js, plans/warcraft-defense.md
- **Verification:** `node --check` passed for all JavaScript files. `npm run dev` started Vite server without errors. Manual testing in Brave confirmed start screen appears, button starts game, UI remains responsive across canvas sizes, and no console errors.

## Implementation workflow for each milestone
1. **Branch creation** – If HEAD is `main`, create `milestone/warcraft-defense-m01` (replace `m01` with the appropriate number). Subsequent milestones branch off the previous milestone branch.
2. **Commit & PR** – After a milestone is finished, commit, push, and open a PR titled `Milestone X: <title>` with a brief summary and a link to the updated plan section.
3. **Testing** – The worker runs the verification commands listed in the milestone (e.g., `npm run dev` and manual UI checks). All test results are recorded in the plan.
4. **Plan update** – The worker edits this `plans/warcraft-defense.md` to mark the milestone status, list changed files, and record test outcomes.
5. **Review** – I will review the diff, run the same verification commands, and either approve the milestone or request corrections.
6. **Proceed** – Once approved, the milestone status becomes `COMPLETE` and the next milestone becomes eligible.

---

*The plan is now saved at the location above. When you are ready to begin the first implementation milestone (M01), let me know and I will launch a fresh `milestone‑worker` sub‑agent to carry it out.*