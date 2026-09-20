# Nightfall — Tank Duel

Nightfall is a complete browser-based, turn-based artillery duel and a three-session **Game Design from Everyday Life** submission. Players observe wind, terrain, opponent position, and earlier shot trails; then move, choose a weapon, set angle and power, fire, and adjust from the result.

- Exhibition: https://evannnx.github.io/nightfall-tank-duel/
- Source: https://github.com/EvannnX/nightfall-tank-duel
- Play locally or from the exhibition's **Play Game** link.

## Dependency track

**Track A — no build step.** The game uses HTML, CSS, plain JavaScript, Canvas 2D, and local media. A 2D side view keeps projectile evidence and deformable heightmap terrain readable; Three.js/WebGL would add complexity without improving the designed learning loop.

There are no runtime packages, remote CDNs, API keys, or server components.

## Run and test

```sh
python3 -m http.server 8765
```

Open `http://localhost:8765/`. Run the deterministic gameplay-model checks with:

```sh
node tests/physics.test.js
```

## Controls

- Hold **A / D** or use the on-screen buttons to move. Each tank has 60 m per turn.
- Use **← / →** for angle and **↑ / ↓** for power.
- Press **1–4** to select Shell, Heavy, Cluster, or Digger.
- Press **Space** or **FIRE** to shoot.
- Press **P**, the menu button, or the portal to pause.
- Use the fullscreen button to enter or leave fullscreen.

## Modes and challenge progression

- **VS AI:** red player against a computer-controlled blue tank.
- **LOCAL PVP:** two players share one device and take alternating turns.
- **Night Valley:** moderate wind establishes basic range calibration.
- **Broken Ridge:** central obstruction asks for high arcs, movement, or terrain alteration.
- **Rolling Hills:** open terrain and stronger wind emphasize flight time and drift.

## Main variables

| Category | Variables | Role |
| --- | --- | --- |
| Environment data | gravity, wind, terrain heightmap, both tank positions/health, inventories | establishes the current problem |
| Player-controlled data | movement, angle, power, weapon, fire | creates the player's hypothesis and commitment |
| Calculated results | shell path, collision, blast falloff, damage, crater, win/loss | changes the battle state |
| Perceivable feedback | barrel/guide, shell trail, wind display, sound, explosion, health, crater | makes the next correction possible |

## Repository structure

- `index.html` — project exhibition and three-session navigation.
- `game.html` — full-screen playable game and complete onboarding/setup flow.
- `session-1-analysis.html` — original INSIDE reflection plus structured learning analysis.
- `design.html` — Session 2 system design, variables, challenges, feedback, and drift.
- `process.html` — Session 3 development timeline, failures, tests, and AI influence.
- `brief.md` — original workbook export.
- `system-graph.png` / `assets/system-graph.svg` — required system artifact and accessible source.
- `ratings.csv` — workbook-exported question ratings; empty rating cells are preserved rather than invented.
- `development-log/agent-development-log.md` — chronological raw interactions and milestone reflections.
- `assets/game.js` — match flow, controls, AI, and state updates.
- `assets/physics.js` — projectile, terrain, movement, and damage model.
- `assets/night-scene.js` — responsive Canvas renderer.
- `assets/audio.js` — local sample playback.
- `tests/physics.test.js` — deterministic gameplay-model checks.

## Current features

- Responsive Canvas rendering without stretching; portrait follow camera, minimap, and overview toggle.
- Shared muzzle transform for barrel, initial-direction guide, and projectile origin.
- 2160 × 670 world, bounded movement, destructible terrain, blast falloff, and self-damage.
- Four weapons with distinct damage, inventory, drift, projectile count, and crater behavior.
- Local CC0 firing, engine, ground-impact, and armor-hit samples.
- Landing, intro, mode/map setup, field manual, pause, confirmation, result, and rematch flow.

## Known limits

- Multiplayer is local shared-screen, not networked.
- Heightmap terrain supports craters but not suspended caves or overhangs.
- Browser-native fullscreen and audio require a user interaction.
- The course requires first-person student reflection; any unconfirmed subjective text remains explicitly marked instead of being fabricated.
- Instructor collaborator access still requires the instructor's GitHub username.

Sound licensing is documented in `assets/audio/CREDITS.md`. Generated visual provenance is documented in `assets/ASSETS.md`.
