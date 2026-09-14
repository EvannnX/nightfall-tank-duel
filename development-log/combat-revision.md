# Combat revision — 2026-09-14

- Combat-only: local two-player duel (default) and computer opponent.
- World width 1440 → 2160 (1.5×); height remains 670.
- Each side receives 60 m of horizontal movement per turn. Forward and reverse consume the same allowance. Hold A/D or the onscreen buttons; a tap moves 6 m.
- Movement checks world edges, terrain walls and the opposing tank. CPU uses the same movement rules.
- Four locally bundled CC0 samples: firing, engine, terrain impact and armor impact. See assets/audio/CREDITS.md.
- All three HTML pages and runtime text are English. Removed obsolete challenge modes and promotional copy from the auxiliary pages.

Verification:

- Physics tests passed: movement cap, reversal, reset, walls, bounds, tank collision, wind, craters, direct/radial/self damage, all weapon termination and 18 expanded-map reachability cases.
- Browser: 10 alternating move taps consumed exactly 60 m; both move controls disabled at 0 m.
- Browser: firing disabled movement; a hit reduced Player 2 to 90 HP; Turn 2 reset movement to 60 m.
- Browser DOM confirmed canvas width 2160, no Chinese text, all four audio samples decoded successfully.
- Portal displays only VS COMPUTER and LOCAL DUEL; computer mode initializes correctly.
- JavaScript syntax checks passed. Audio formats and durations verified with ffprobe.

Known boundaries: local shared-screen play, not online multiplayer. Native fullscreen and audio require browser-permitted user interaction. Sounds are designed samples, not verified field recordings of a specific tank.
