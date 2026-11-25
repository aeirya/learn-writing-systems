# Script Atlas — learning resources and development notes

Reviewed 2026-11-25. Keep these references in mind when extending the project to other scripts. The project is a lightweight static browser application; link useful external tools rather than duplicating them without a clear benefit.

## Meshk (handwriting and calligraphy)
- [Main site](https://trymeshk.com/): cross-script handwriting practice, animated models, stroke feedback, and progression per character. The iPhone/iPad app is free to start; don't assume all app features are free.
- [Armenian alphabet](https://trymeshk.com/writing-systems/armenian): animated letter chart, numbered stroke starts, printable worksheet. The page states that Armenian paths are traced from Noto Sans Armenian and divided into strokes by rule (OFL-1.1 source attribution); it explicitly cautions that the order is a guide rather than a school standard.
- [Free worksheet generator](https://trymeshk.com/handwriting-worksheet-generator): custom text, trace/write modes, stroke numbering, ruling options and PDF export in the browser, including Armenian sentence practice. The site also links other free tools, including handwriting paper, calligraphy guidelines and Arabic letter forms.
- Use these tools directly when they already satisfy a learner's need. Treat Meshk as design inspiration, not as permission to copy its assets, code or stroke dataset. Verify the license for each asset before reuse.

## Hrant Dink Foundation — Western Armenian Programme
- [How to Write the Armenian Alphabet](https://hrantdink.org/en/bolis/activities/projects/western-armenian-program/2669-ayppenaraneng): teaching videos for each of the 38 traditional letters, made using templates from the Turkish Armenian Minority Schools Teachers Foundation. This is a stronger reference for authentic pen direction, order and lifts than an inferred SVG path sequence.
- Individual public video IDs are mapped in `armenian/tutorials.js`; digraphs link to component-letter videos rather than implying the foundation published a separate combined tutorial.
- Video destinations were collected from the foundation's embedded links. Playback and individual stroke sequences have not been independently verified. Link rather than redistribute the videos.

## Ideas for later iterations (not implemented)
1. Prioritize numbered stroke starts, direction arrows, pen-lift markers and replayable animations for difficult letters. Verify each stroke against teaching demonstrations; annotate source, variant and confidence. Do not infer authoritative order solely from SVG path order.
2. Offer a simple printable trace-then-write worksheet for a user-entered phrase if the external generator proves insufficient.
3. Add an optional lightweight drawing practice surface with a model and fading guide before considering scoring or handwriting recognition.
4. Reuse the same approach for other scripts, distinguishing real handwriting/cursive, printed forms and generated stroke paths. Avoid building a new app or backend unless needed.

## Current decisions
- Use local Wikimedia Commons illustrations for static forms, and the foundation's tutorials for pen movement; keep their attribution and licenses separate.
- Keep links to Meshk and the worksheet generator visible on the Armenian pages.
- Keep the current minimal HTML/CSS/JS architecture.
