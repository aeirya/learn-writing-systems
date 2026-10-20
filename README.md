# Script Atlas · learn writing systems

A small, static, browser-based study panel inspired by [esponyol-inator](https://github.com/aeirya/esponyol-inator). It helps you learn unfamiliar letters using **Latin phonetic hints, sample words, and optional Persian-script comparisons**.

## Alphabets

| Tab | Content |
| --- | --- |
| **Cyrillic** | 33 Russian letters, plus 10 optional Ukrainian / Belarusian / Serbian letters |
| **Urdu / Nastaliq** | 39 main entries + 3 useful hamza / alif variants |
| **Sorani Kurdish** | 34-entry Central Kurdish chart, including the digraph وو |
| **Kurmanji Kurdish** | 31 Hawar Latin letters |
| **Czech** | 42 alphabet entries, including **Ch** |
| **Hebrew** | 22 letters, their final shapes, and 7 niqqud examples |

The letter counts follow the conventions used in this tool; inventory conventions can vary, especially for Urdu and Sorani.

## Features

- One tab per script, plus a **Compare** view grouping approximate sounds across all six.
- Search by letter, romanization, letter name, sound, Persian cue, or sample word.
- Filter by vowels, consonants, and tricky characters.
- Switch between **cards** and **compact tables**.
- Toggle **Persian comparisons**, hide and reveal reading hints, and save letters to a local study pile.
- **Quick practice** reveals the name, romanization, and sound guide of a randomly selected visible character.
- Optional schematic **isolated / initial / medial / final** previews for dual-joining Urdu and Sorani letters (actual shape depends on font and joining context).
- Copy characters, and hear example words *if* a suitable speech-synthesis voice is installed in your browser.
- Dark mode, mobile-responsive layouts, and Unicode-aware right-to-left displays.
- LocalStorage saves your study preferences and saved characters. No account, analytics, backend, package manager, or build process.

## Run locally

Open `index.html` in a modern browser, or serve the folder with:

```sh
python3 -m http.server 8000
```

Then go to `http://localhost:8000`. A network connection is useful for Google Fonts; local font fallbacks are provided.

## GitHub Pages

The project is ready to deploy from the repository root at:

`https://aeirya.github.io/learn-writing-systems/`

If the link is not live yet, enable **Settings → Pages → Build and deployment → Deploy from a branch**, with branch **master** and directory **/(root)**. No build command is required.

## Files

- `index.html`: page structure
- `styles.css`: responsive UI and script typography
- `data.js`: script inventories, phonetic notes, words and Persian comparisons
- `app.js`: tabs, search, filters, practice, comparison and local progress

To add or fix an entry, edit the corresponding `raw` table in `data.js`. Each row is separated by a newline; fields use `|`:

```text
glyph | romanization | name | sound guide | Persian cue | kind | example | English gloss | note | extra (1)
```

The `kind` column should be `vowel`, `consonant`, or `special`. An extra value of `1` marks a supplemental entry.

## Important language notes

These are beginner-friendly approximations, not exact cross-language transcriptions. In particular, Kurdish Sorani and Kurmanji are not simply interchangeable spellings of the same spoken variety; Persian cues show a familiar **shape or rough sound**, not a guaranteed transliteration. Urdu Nastaliq is a typographic/handwriting style of the Urdu Arabic-derived script, and browsers require a Nastaliq-capable font for the traditional appearance. Hebrew pronunciation here is Modern Israeli Hebrew; niqqud marks are normally not written in everyday text.

Schematic joining-form displays use tatweel to illustrate shape changes; they are **not** meant as copyable spellings. Speech playback is disabled with an explanatory message when the required language voice is unavailable.

## Background references

- [Czech orthography — Czech alphabet](https://en.wikipedia.org/wiki/Czech_orthography)
- [Kurdish alphabets — Kurdo-Arabic (Sorani)](https://en.wikipedia.org/wiki/Kurdish_alphabets)
- [Hawar / Kurmanji alphabet](https://openkurd.com/en/alphabet)
- [Urdu alphabet and letter forms](https://en.wikipedia.org/wiki/Urdu_alphabet)
- [Zer o Zabar — The Urdu Alphabet (Northwestern University)](https://openbooks.library.northwestern.edu/zerozabar/chapter/the-urdu-alphabet/)
- [Hebrew alphabet, final letters and niqqud](https://hebrewmastery.com/hebrew-alphabet)

Suggestions and corrections to examples or pronunciations are welcome.

## License

GPL-3.0-or-later. See [LICENSE](LICENSE).
