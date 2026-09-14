# Nightfall — Tank Duel

A complete browser-based, turn-based artillery duel inspired by classic tank games. Choose a battlefield, account for changing wind, move within a limited per-turn allowance, deform the terrain, and destroy the opposing tank.

## Play

Open the deployed GitHub Pages site, select **VS AI** or **LOCAL PVP**, choose one of three battlefields, and start the battle.

## Controls

- Hold **A / D** or use the on-screen buttons to move. Each tank has 60 m of movement per turn.
- Use **← / →** to change angle and **↑ / ↓** to change power.
- Press **1–4** to select a weapon.
- Press **Space** or use **FIRE** to shoot.
- Press **P**, the menu button, or the portal to pause.
- Use the fullscreen button to enter or leave fullscreen.

## Modes and maps

- **VS AI:** Player 1 controls the red tank; the computer controls blue.
- **LOCAL PVP:** Two players share one device and take alternating turns.
- **Night Valley:** Elevated starts with moderate wind.
- **Broken Ridge:** A central obstacle encourages high arcs or terrain destruction.
- **Rolling Hills:** More open terrain with stronger wind.

## Features

- Responsive Canvas rendering without stretching.
- Portrait auto-camera, minimap, and overview toggle.
- Shared muzzle transform for barrel, aim guide, and projectile origin.
- Destructible heightmap terrain and blast damage, including self-damage.
- Four weapons with distinct damage, ammunition, drift, and crater behavior.
- Local CC0 firing, engine, ground-impact, and armor-hit sound samples.
- Intro, field manual, battle setup, pause, confirmation, result, and rematch flow.

## Local development

No build step or external runtime dependencies are required.

```sh
python3 -m http.server 8765
```

Then open `http://localhost:8765`.

Run physics and gameplay-model checks with:

```sh
node tests/physics.test.js
```

## Project structure

- `index.html` — entry, onboarding, setup, game HUD, and dialogs.
- `assets/game.js` — match flow, controls, AI, and state updates.
- `assets/physics.js` — projectile, terrain, movement, and damage model.
- `assets/night-scene.js` — responsive Canvas renderer.
- `assets/audio.js` — local sample playback.
- `design.html` — concise design documentation.
- `process.html` — implementation notes.
- `tests/physics.test.js` — deterministic model checks.

Sound attribution and licensing are documented in `assets/audio/CREDITS.md`. Generated visual asset provenance is documented in `assets/ASSETS.md`.
