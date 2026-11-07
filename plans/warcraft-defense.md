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
4. Enemy units stream continuously from any side of the map (top, bottom, left, or right), growing stronger over time, and move toward the nearest player unit or building to attack.  
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
| **Enemy stream** | Enemies continuously spawn, move toward the nearest player unit or building to attack, and become stronger over time. |
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
| **M02** | **Grid & building placement** | Implement a tile‑grid, allow player to place placeholder buildings (Barracks, Tower, Wall) with gold cost validation. | M01 | COMPLETE |
| **M03** | **Unit production system** | Add logic for buildings to spawn their unit type (Footman from Barracks) at a fixed interval. | M02 | COMPLETE |
| **M04** | **Enemy stream (basic)** | Continuous spawning of enemy Footmen from any side of the map (top, bottom, left, or right), moving toward the nearest player unit or building to attack. | M03 | COMPLETE |
| **M05** | **Combat & gold reward** | Units auto‑attack nearest enemy, enemy death awards gold, HUD updates gold count. | M04 | COMPLETE |
| **M06** | **Additional unit types & upgrades** | Add Stable (Knight), Archery Range (Archer), Workshop (Catapult), Dragon Roost (Dragon). Each building spawns its unit; unlock new buildings as gold thresholds are met. | M05 | COMPLETE |
| **M07** | **Ranged combat rules** | Implement ranged attacks for Archers, Catapults, Dragons. Only Archers & Dragons can damage Dragons. Dragons can fly over buildings (ignore collision). | M06 | COMPLETE |
| **M08** | **Towers & walls behavior** | Towers fire projectiles at nearest enemy; walls block/re‑route enemies (simple path‑finding around walls). | M07 | COMPLETE |
| **M09** | **Difficulty scaling** | Increase enemy spawn rate and introduce stronger enemy types (Archer → Knight → Catapult → Dragon) over time. | M08 | COMPLETE |
| **M10** | **Map‑size selector & performance tuning** | Allow player to choose Small / Medium / Large map at game start; adjust max entity count / canvas size accordingly. | M09 | COMPLETE |
| **M11** | **Polish & cross‑browser testing** | Verify no console errors in Brave, add basic start‑screen, ensure UI is responsive, final cleanup. | M10 | COMPLETE |
| **M12** | **Dynamic movement for units** | Update movement logic so that enemy units move toward the nearest player unit or building to attack, and player units move toward the nearest enemy unit to attack, instead of moving in a straight line. | M11 | COMPLETE |
| **M13** | **Four‑side enemy spawning** | Modify enemy spawning logic to spawn from a random side (top, bottom, left, right) with random edge coordinate. | M12 | COMPLETE |
| **M14** | **Health & damage system** | Add health properties and health bars to all units and buildings; enable enemy units to damage player units and buildings when in combat range; destroy entities when health reaches zero. | M13 | COMPLETE |
| **M15** | **Enemy footman stats** | Enemy footman units have 60 HP, deal 6 damage per attack, and attack once per second. | M14 | COMPLETE |
| **M16** | **Collision handling for placement** | Ensure buildings cannot be placed on occupied tiles; units cannot occupy same tile; implement collision detection and prevent overlapping. | M15 | COMPLETE |
- **Changed files:** src/main.js, src/utils/movement.js, test/occupancy.test.js, plans/warcraft-defense.md
- **Verification:** `npm test` passed (including new health tests). Manual playtest confirmed health bars displayed below units/buildings and enemies reduce health when in range, destroying entities at zero health.

| **M17** | **Units should not flee** | Units must stand their ground while attacking and not move away from enemies during combat. | M16 | COMPLETE |
| **M18** | **Update unit stats** | Adjust health and damage values for Archers, Knights, Catapults, and Dragons (both player units and enemies) per spec: Archers 40 HP/3 dmg, Knights 90 HP/8 dmg, Catapots 110 HP/15 dmg, Dragons 100 HP/10 dmg. | M17 | COMPLETE |
| **M19** | **Prevent enemy units from occupying building tiles** | Ensure enemy ground units cannot move onto building tiles; they must stand adjacent to attack buildings. Dragons may still fly over. | M18 | COMPLETE |
- **Changed files:** src/main.js, test/enemyBuildingCollision.test.js, package.json, plans/warcraft-defense.md

| **M20** | **Add speed stat to units and enemies** | Introduce speed values for each unit type (Footman 10, Archer 10, Knight 13, Catapult 5, Dragon 16) and adjust movement logic accordingly. Update tests to verify correct speed assignment and proportional movement. | M19 | COMPLETE |
| **M21** | **Building production timers and intervals** | Update building spawn intervals (Barracks 6 s, Archery Range 7 s, Stable 9 s, Workshop 25 s, Dragon Roost 25 s) and display a timer UI on each building showing time until next unit. | M20 | COMPLETE |
| **M22** | **Tower damage update** | Towers should deal 12 damage per projectile hit. | M21 | COMPLETE |
| **M23** | **Building HP and cost update** | Add HP values for each building type and update gold costs; set starting gold to 3000. | M22 | COMPLETE |
- **Changed files:** test/tower-damage.test.js, package.json, plans/warcraft-defense.md
- **Verification:** `npm test` passed (all existing tests plus new tower‑damage.test.js). Manual playtest confirms towers fire projectiles dealing 12 damage.

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
| **M04** | **Enemy stream (basic)** | Continuous spawning of enemy Footmen from any side of the map (top, bottom, left, or right), moving toward the nearest player unit or building to attack. | M03 | COMPLETE |
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

- Enemy footman units have **60 HP**, deal **6 damage** per attack, and attack **once per second**.

**Additional requirement:**
- Enemy units must deal high damage to player units and buildings when in combat range, they attack before player units, **and they display health bars just like player units and buildings**.
- Buildings and units cannot occupy the same grid cell; placement and movement must respect occupied tiles.
- Footman units have **60 HP**, deal **6 damage** per attack, and attack **once per second**.
- All units (enemy and player) and buildings should display a health bar below the sprite.
- Units and buildings must have health values and be destroyed when health reaches zero.

**M01** – repo cloned, `index.html` loads `src/main.js`, canvas created, HUD elements visible, no console errors.
**M02** – 32×32 grid, click‑to‑place buildings snapping to grid, gold deducted, placement blocked when insufficient gold.
**M03** – Buildings spawn their unit after a configurable interval; unit moves toward nearest enemy.
**M04** – Enemies continuously spawn from any side of the map (top, bottom, left, or right) and move toward the nearest player unit or building to attack.
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

- **Verification:** `npm test` passed (all existing tests plus new spawnEdge.test.js).

## Implementation workflow for each milestone
1. **Branch creation** – If HEAD is `main`, create `milestone/warcraft-defense-m01` (replace `m01` with the appropriate number). Subsequent milestones branch off the previous milestone branch.
2. **Commit & PR** – After a milestone is finished, commit, push, and open a PR titled `Milestone X: <title>` with a brief summary and a link to the updated plan section.
3. **Testing** – The worker runs the verification commands listed in the milestone (e.g., `npm run dev` and manual UI checks). All test results are recorded in the plan.
4. **Plan update** – The worker edits this `plans/warcraft-defense.md` to mark the milestone status, list changed files, and record test outcomes.
5. **Review** – I will review the diff, run the same verification commands, and either approve the milestone or request corrections.
6. **Proceed** – Once approved, the milestone status becomes `COMPLETE` and the next milestone becomes eligible.

---

*The plan is now saved at the location above. When you are ready to begin the first implementation milestone (M01), let me know and I will launch a fresh `milestone‑worker` sub‑agent to carry it out.*