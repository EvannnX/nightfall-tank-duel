# Aim, responsive view and complete flow revision

## Changes

- Artillery.pose is the single source of truth for body slope, turret pivot and muzzle coordinates. Barrel drawing, aim direction and projectile spawning use that transform. Cluster projectiles share a muzzle and then diverge by ±5 degrees.
- Canvas backing size follows CSS size and pixel density; world rendering uses a single uniform scale. Background images use proportional cover cropping.
- Portrait view follows the active tank/projectile and provides a minimap and Overview / Follow tank toggle. Landscape shows the full world.
- Added landing, intro, mode selection, three selectable maps and mission briefing. No battle runs before Start Battle.
- Separate VS AI and LOCAL PVP choices, per-map terrain and wind settings, detailed field manual, pause/resume, restart/leave confirmation, rematch and new-battle return.
- All interface content remains English.

## Verification

- Physics regression tests pass, including muzzle/velocity alignment at 18 slope/angle combinations and common cluster origin.
- Both sides can hit across each of the three maps at minimum, zero and maximum configured wind.
- Browser walkthrough: landing → intro → setup → AI on Broken Ridge; local PVP on Rolling Hills.
- Browser layouts checked at desktop, 390 × 844 portrait and 844 × 390 landscape. Canvas/CSS aspect ratios match; no horizontal page overflow.
- Browser walkthrough: fire → pause → leave confirmation → cancel retains pause; confirm returns to setup with previous choices retained.
- No browser warnings or errors reported during the walkthrough.

Native fullscreen remains subject to browser user-gesture support. PVP is local shared-device play, not network multiplayer.
