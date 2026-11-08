/**
 * @file src/shared/songSchema.js (in smallhotelroom.github.io)
 * @version 2.8.0
 * Single Source of Truth for Frontmatter Schema, Inline Chord Notation Grammar,
 * Markdown `##` Section & Harmonic Fingering Postures Schema, Reverse Chord Voicing
 * Identification (`suggestChordsForVoicing`), and Syntax Highlighting Color Palettes.
 */

export const __version__ = '2.8.0';

export const BASE_REQUIRED_KEYS = [];

export const STRICT_PROJECT_NAMES = [
  "Small Hotel Room", 
  "cancionesdejuan"
];

export const STRICT_PROJECT_KEYS = [
  "album", 
  "author",
  "bpm",
  "isrc",
  "lang",
  "license",
  "musicians", 
  "spotify",
  "track",
  "url"
];

export const TREATED_KEYS = [
  "album",
  "artist",
  "author",
  "bpm",
  "capo",
  "downloads",
  "drop",
  "falsetto",
  "featuring",
  "highest",
  "initNote",
  "isrc",
  "key",
  "lang",
  "license",
  "musicians",
  "scores",
  "spotify",
  "time_signature",
  "title",
  "track",
  "url",
  "writer",
  "youtube"
];

// --- INLINE CHORD NOTATION GRAMMAR ---
export const SHARP_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const NOTE_TO_SEMITONE = {
  C: 0,
  'B#': 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  'E#': 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

// Standard open-string pitch classes (0=C .. 11=B)
export const GUITAR_OPEN_PITCH_CLASSES = [4, 9, 2, 7, 11, 4]; // 6E, 5A, 4D, 3G, 2B, 1e
export const GUITAR_STRING_LABELS = ['6 (E)', '5 (A)', '4 (D)', '3 (G)', '2 (B)', '1 (e)'];
export const UKULELE_OPEN_PITCH_CLASSES = [7, 0, 4, 9]; // 4G, 3C, 2E, 1A
export const UKULELE_STRING_LABELS = ['4 (G)', '3 (C)', '2 (E)', '1 (A)'];

// Parenthetical metadata/directives that should never be transposed as chords
export const SKIP_PAREN_PREFIXES = [
  '(bpm',
  '(tempo',
  '(key',
  '(highest',
  '(falsetto',
  '(all',
  '(chords for',
];

// Unified regex for parenthetical directives (used across SongScreen, chordTransposer, Linter, and PDF)
export const DIRECTIVE_PAREN_REGEX =
  /bpm|tempo|key|highest|falsetto|all|chords for|capo|drop/i;

// Delimiters & playing annotations allowed inside (...) chord blocks
export const CHORD_GROUP_DELIMITER_REGEX =
  /  |_|!|\.\.\.|\.\.|: |\*|high|open|bass|riff|palm mute|notes/;

// Allowed chord quality/modifier suffixes after the root note (e.g. m, maj7, dim, add9, 9sus4, 7b5)
export const CHORD_QUALITY_REGEX =
  /^(?:m|maj|min|dim|aug|sus|add|[0-9]|[#b+-]|M|\(|\))*$/i;

// --- MARKDOWN `##` SECTIONS & PLAIN-TEXT CHORD FINGERING SCHEMA ---
export const SECTION_HEADER_REGEX = /^##\s+(.+?)\s*$/;
export const FINGERING_SECTION_HEADER_REGEX =
  /^(?:chords?|fingerings?|voicings?|postures?|acordes?|posiciones?)$/i;
export const NOTES_SECTION_HEADER_REGEX =
  /^(?:notes?|notas?|comments?|tabs?|tablature)$/i;

/**
 * Canonical chord interval definitions (in semitones above root) for harmonic validation
 * and reverse chord-name identification (`suggestChordsForVoicing`).
 */
export const CHORD_FORMULAS = [
  { suffix: '', aliases: ['M', 'maj'], allowed: [0, 4, 7], required: [0, 4], priority: 10 },
  { suffix: 'm', aliases: ['min', '-'], allowed: [0, 3, 7], required: [0, 3], priority: 10 },
  { suffix: '5', aliases: [], allowed: [0, 7], required: [0, 7], priority: 9 },
  { suffix: '7', aliases: ['dom7'], allowed: [0, 4, 7, 10], required: [0, 4, 10], priority: 9 },
  { suffix: 'maj7', aliases: ['M7'], allowed: [0, 4, 7, 11], required: [0, 4, 11], priority: 9 },
  { suffix: 'm7', aliases: ['min7', '-7'], allowed: [0, 3, 7, 10], required: [0, 3, 10], priority: 9 },
  { suffix: 'sus2', aliases: ['2'], allowed: [0, 2, 7], required: [0, 2], priority: 8 },
  { suffix: 'sus4', aliases: ['sus'], allowed: [0, 5, 7], required: [0, 5], priority: 8 },
  { suffix: '7sus4', aliases: ['7sus'], allowed: [0, 5, 7, 10], required: [0, 5, 10], priority: 8 },
  { suffix: 'add9', aliases: ['add2'], allowed: [0, 2, 4, 7], required: [0, 2, 4], priority: 8 },
  { suffix: 'm(add9)', aliases: ['madd9', 'madd2'], allowed: [0, 2, 3, 7], required: [0, 2, 3], priority: 7 },
  { suffix: '6', aliases: ['maj6'], allowed: [0, 4, 7, 9], required: [0, 4, 9], priority: 7 },
  { suffix: 'm6', aliases: ['min6'], allowed: [0, 3, 7, 9], required: [0, 3, 9], priority: 7 },
  { suffix: 'dim', aliases: ['o'], allowed: [0, 3, 6], required: [0, 3, 6], priority: 7 },
  { suffix: 'dim7', aliases: ['o7'], allowed: [0, 3, 6, 9], required: [0, 3, 6, 9], priority: 7 },
  { suffix: 'm7b5', aliases: ['m7-5', 'ø'], allowed: [0, 3, 6, 10], required: [0, 3, 6, 10], priority: 7 },
  { suffix: 'aug', aliases: ['+', '+5'], allowed: [0, 4, 8], required: [0, 4, 8], priority: 7 },
  { suffix: '7#5', aliases: ['7+5', '7+', 'aug7'], allowed: [0, 4, 8, 10], required: [0, 4, 8, 10], priority: 6 },
  { suffix: '7b5', aliases: ['7-5'], allowed: [0, 4, 6, 10], required: [0, 4, 6, 10], priority: 6 },
  { suffix: '7b9', aliases: ['7-9'], allowed: [0, 1, 4, 7, 10], required: [0, 1, 4, 10], priority: 6 },
  { suffix: '9', aliases: [], allowed: [0, 2, 4, 7, 10], required: [0, 2, 4, 10], priority: 7 },
  { suffix: 'm9', aliases: ['min9'], allowed: [0, 2, 3, 7, 10], required: [0, 2, 3, 10], priority: 7 },
  { suffix: 'maj9', aliases: ['M9'], allowed: [0, 2, 4, 7, 11], required: [0, 2, 4, 11], priority: 7 },
  { suffix: '9sus4', aliases: [], allowed: [0, 2, 5, 7, 10], required: [0, 2, 5, 10], priority: 6 },
  { suffix: 'm(maj7)', aliases: ['mmaj7', 'mM7', 'minmaj7'], allowed: [0, 3, 7, 11], required: [0, 3, 11], priority: 6 },
];

/**
 * Finds the matching formula entry for a raw quality string (e.g. '', 'm', 'M7', 'add9').
 */
export const findChordFormula = (rawQuality = '') => {
  const q = String(rawQuality || '').trim().replace(/^\(|\)$/g, '');
  for (const f of CHORD_FORMULAS) {
    if (f.suffix === q) return f;
    if (f.aliases.some((a) => a.toLowerCase() === q.toLowerCase())) return f;
    if (f.suffix.toLowerCase() === q.toLowerCase() && q !== 'M' && q !== 'm') return f;
  }
  return null;
};

/**
 * Computes the allowed and required pitch classes (0..11) for a chord's root, quality, and optional slash bass.
 */
export const getChordExpectedPitchClasses = (rootSemitone, rawQuality = '', bassSemitone = null) => {
  const formula = findChordFormula(rawQuality);
  if (!formula) {
    return null;
  }

  const allowedPcs = new Set(formula.allowed.map((iv) => (rootSemitone + iv) % 12));
  const requiredPcs = new Set(formula.required.map((iv) => (rootSemitone + iv) % 12));
  if (bassSemitone !== null && bassSemitone !== undefined) {
    allowedPcs.add(bassSemitone);
    requiredPcs.add(bassSemitone);
  }

  return { allowedPcs, requiredPcs };
};

/**
 * Reverse-identifies the most likely chord names (with confidence %) for a given fret array.
 * Reusable in the Linter, DB build diagnostics, and any future in-app Chord Editor!
 *
 * @param {number[]} frets - Array of 6 (guitar) or 4 (ukulele) fret integers (-1 for muted 'x')
 * @param {'guitar'|'ukulele'} instrument
 * @param {object} options - { targetRootSemitone: number|null, targetRootStr: string|null, maxResults: number }
 * @returns {Array<{ chord: string, confidence: number }>}
 */
export const suggestChordsForVoicing = (
  frets,
  instrument = 'guitar',
  { targetRootSemitone = null, targetRootStr = null, maxResults = 3 } = {}
) => {
  if (!Array.isArray(frets) || (frets.length !== 6 && frets.length !== 4)) {
    return [];
  }

  const openPcs =
    instrument === 'ukulele' ? UKULELE_OPEN_PITCH_CLASSES : GUITAR_OPEN_PITCH_CLASSES;
  const soundedPcs = new Set();
  let lowestSoundedPc = null;

  for (let i = 0; i < frets.length; i++) {
    const f = frets[i];
    if (f < 0) continue;
    const pc = (openPcs[i] + f) % 12;
    if (lowestSoundedPc === null) {
      lowestSoundedPc = pc;
    }
    soundedPcs.add(pc);
  }

  if (soundedPcs.size === 0) {
    return [];
  }

  const soundedArr = [...soundedPcs];
  const candidateRoots =
    targetRootSemitone !== null && targetRootSemitone !== undefined
      ? [targetRootSemitone]
      : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const scoredCandidates = [];

  for (const rootPc of candidateRoots) {
    const rootName =
      targetRootSemitone === rootPc && targetRootStr
        ? targetRootStr
        : SHARP_NOTES[rootPc];

    for (const formula of CHORD_FORMULAS) {
      const allowedSet = new Set(formula.allowed.map((iv) => (rootPc + iv) % 12));
      const requiredArr = formula.required.map((iv) => (rootPc + iv) % 12);

      const matchingCount = soundedArr.filter((pc) => allowedSet.has(pc)).length;
      const wrongCount = soundedArr.length - matchingCount;
      const presentReqCount = requiredArr.filter((pc) => soundedPcs.has(pc)).length;
      const missingReqCount = requiredArr.length - presentReqCount;

      // Skip completely unrelated chords
      if (matchingCount === 0 || wrongCount > 1) continue;
      if (targetRootSemitone === null && !soundedPcs.has(rootPc)) continue;

      const bassMatchesRoot = lowestSoundedPc === rootPc;
      let chordLabel = `${rootName}${formula.suffix}`;
      let confidence = 0;

      if (wrongCount === 0 && missingReqCount === 0) {
        // Every played note belongs to the chord AND all required tones are present!
        const coverageRatio = soundedArr.length / formula.allowed.length;
        if (instrument === 'guitar' && !bassMatchesRoot && lowestSoundedPc !== null) {
          // It's an inversion / slash chord (e.g. D/F# or Cadd9/E)
          if (targetRootSemitone === rootPc) {
            chordLabel = `${rootName}${formula.suffix}/${SHARP_NOTES[lowestSoundedPc]}`;
            confidence = Math.round(92 + Math.min(6, coverageRatio * 6));
          } else {
            // In global search ("X: ..."), offer both the root-position interpretation and slash chord
            chordLabel = `${rootName}${formula.suffix}/${SHARP_NOTES[lowestSoundedPc]}`;
            confidence = Math.round(78 + Math.min(10, coverageRatio * 8) + formula.priority * 0.4);
          }
        } else {
          // Exact root-position match!
          confidence = Math.min(
            100,
            Math.round(94 + Math.min(6, coverageRatio * 6))
          );
        }
      } else {
        // Partial / near match (e.g. missing 1 chord tone or 1 wrong finger)
        const noteAccuracy = matchingCount / soundedArr.length;
        const reqCoverage = presentReqCount / requiredArr.length;
        const bassBonus = bassMatchesRoot ? 10 : 0;
        confidence = Math.round(
          noteAccuracy * 45 + reqCoverage * 38 + bassBonus + formula.priority * 0.5
        );
        confidence = Math.max(20, Math.min(89, confidence));
      }

      scoredCandidates.push({
        chord: chordLabel,
        confidence,
        exact: wrongCount === 0 && missingReqCount === 0 && bassMatchesRoot,
        priority: formula.priority,
      });
    }
  }

  scoredCandidates.sort((a, b) => {
    if (b.exact !== a.exact) return (b.exact ? 1 : 0) - (a.exact ? 1 : 0);
    if (b.confidence !== a.confidence) return b.confidence - a.confidence;
    return b.priority - a.priority;
  });

  // Deduplicate by chord label and return top N
  const unique = [];
  const seen = new Set();
  for (const item of scoredCandidates) {
    if (seen.has(item.chord)) continue;
    seen.add(item.chord);
    unique.push({ chord: item.chord, confidence: item.confidence });
    if (unique.length >= maxResults) break;
  }

  return unique;
};

/**
 * Formats an array of `{ chord, confidence }` into `"Did you mean: G5 (100%), G (79%)?"`.
 */
export const formatChordSuggestionsText = (suggestions = []) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return '';
  }
  const listStr = suggestions
    .map((s) => `${s.chord} (${s.confidence}%)`)
    .join(', ');
  return ` Did you mean: ${listStr}?`;
};

/**
 * Validates that the notes sounded by `frets` on `instrument` harmonically match `chordName`.
 * When a mismatch occurs, automatically computes "Did you mean: ...?" suggestions for that root
 * (or across all roots if no close variation on the same root exists).
 */
export const validateVoicingHarmony = (
  chordName,
  rootSemitone,
  quality,
  bassSemitone,
  frets,
  instrument = 'guitar',
  rootStr = null
) => {
  const expected = getChordExpectedPitchClasses(rootSemitone, quality, bassSemitone);
  if (!expected) {
    return { valid: true, suggestions: [] };
  }

  const { allowedPcs, requiredPcs } = expected;
  const openPcs =
    instrument === 'ukulele' ? UKULELE_OPEN_PITCH_CLASSES : GUITAR_OPEN_PITCH_CLASSES;
  const strLabels =
    instrument === 'ukulele' ? UKULELE_STRING_LABELS : GUITAR_STRING_LABELS;

  const soundedPcs = new Set();
  const wrongNotes = [];
  let lowestSoundedPc = null;

  for (let i = 0; i < frets.length; i++) {
    const f = frets[i];
    if (f < 0) continue;
    const pc = (openPcs[i] + f) % 12;
    if (lowestSoundedPc === null) {
      lowestSoundedPc = pc;
    }
    soundedPcs.add(pc);
    if (!allowedPcs.has(pc)) {
      wrongNotes.push(`String ${strLabels[i]} fret ${f} plays ${SHARP_NOTES[pc]}`);
    }
  }

  if (soundedPcs.size === 0) {
    return {
      valid: false,
      suggestions: [],
      error: `Fingering for '${chordName}' mutes all strings.`,
    };
  }

  const expectedNoteNames = [...allowedPcs].map((pc) => SHARP_NOTES[pc]).join(', ');
  const issues = [];

  if (wrongNotes.length > 0) {
    issues.push(
      `${wrongNotes.join(', ')} (not in ${chordName} [${expectedNoteNames}])`
    );
  }

  const missingReq = [...requiredPcs]
    .filter((pc) => !soundedPcs.has(pc))
    .map((pc) => SHARP_NOTES[pc]);
  if (missingReq.length > 0) {
    issues.push(`missing required chord tone(s): ${missingReq.join(', ')}`);
  }

  if (
    instrument === 'guitar' &&
    bassSemitone !== null &&
    bassSemitone !== undefined &&
    lowestSoundedPc !== null &&
    lowestSoundedPc !== bassSemitone
  ) {
    issues.push(
      `slash bass '/${SHARP_NOTES[bassSemitone]}' requires lowest sounded string to be ${SHARP_NOTES[bassSemitone]} (found ${SHARP_NOTES[lowestSoundedPc]})`
    );
  }

  if (issues.length > 0) {
    // 1. Check variations of the user's intended root first (e.g. G -> G5, Gsus4, G7)
    let suggestions = suggestChordsForVoicing(frets, instrument, {
      targetRootSemitone: rootSemitone,
      targetRootStr: rootStr || SHARP_NOTES[rootSemitone],
      maxResults: 3,
    }).filter((s) => s.chord !== chordName && s.confidence >= 70);

    // 2. Also include top global matches if no high-confidence same-root match was found
    if (suggestions.length === 0 || suggestions[0].confidence < 90) {
      const globalSuggs = suggestChordsForVoicing(frets, instrument, {
        maxResults: 3,
      }).filter((s) => s.chord !== chordName);
      const seen = new Set(suggestions.map((s) => s.chord));
      for (const gs of globalSuggs) {
        if (!seen.has(gs.chord)) {
          suggestions.push(gs);
          seen.add(gs.chord);
        }
        if (suggestions.length >= 3) break;
      }
    }

    return {
      valid: false,
      suggestions,
      error: `Harmonic mismatch in '${chordName}': ${issues.join('; ')}.${formatChordSuggestionsText(suggestions)}`,
    };
  }

  return { valid: true, suggestions: [] };
};

/**
 * Helper to parse the right-hand fret pattern (`3x003x` or `0212`) before/independent of chord name validation,
 * so even an unknown chord name like `X: 3x003x` can receive fret-based chord recommendations!
 */
const parseFretPatternRightSide = (rawRightSide = '', explicitInstrument = null, chordNameForMsg = '') => {
  let rightSide = String(rawRightSide || '').trim();
  let label = null;
  const quoteMatch = /^(.*?)\s+["'](.+)["']\s*$/.exec(rightSide);
  if (quoteMatch) {
    rightSide = quoteMatch[1].trim();
    label = quoteMatch[2].trim();
  }

  let rawFretTokens = [];
  if (/^[xX0-9]{4}$/.test(rightSide) || /^[xX0-9]{6}$/.test(rightSide)) {
    rawFretTokens = rightSide.split('');
  } else {
    rawFretTokens = rightSide.split(/[\s,-]+/).filter(Boolean);
  }

  if (rawFretTokens.length !== 6 && rawFretTokens.length !== 4) {
    return {
      valid: false,
      error: `Fret pattern '${rightSide}' for '${chordNameForMsg}' must have 6 strings (Guitar, e.g. '022030') or 4 strings (Ukulele, e.g. '0212'); found ${rawFretTokens.length}.`,
    };
  }

  const frets = [];
  for (const tok of rawFretTokens) {
    if (/^[xX]$/.test(tok)) {
      frets.push(-1);
    } else if (/^\d+$/.test(tok)) {
      const fNum = parseInt(tok, 10);
      if (fNum < 0 || fNum > 24) {
        return {
          valid: false,
          error: `Fret number '${fNum}' out of range (0..24) in '${chordNameForMsg}: ${rightSide}'.`,
        };
      }
      frets.push(fNum);
    } else {
      return {
        valid: false,
        error: `Invalid fret token '${tok}' in '${chordNameForMsg}: ${rightSide}' (use digits 0-24 or 'x').`,
      };
    }
  }

  const inferredInstrument = frets.length === 4 ? 'ukulele' : 'guitar';
  const instrument = explicitInstrument || inferredInstrument;

  if (
    (instrument === 'guitar' && frets.length !== 6) ||
    (instrument === 'ukulele' && frets.length !== 4)
  ) {
    return {
      valid: false,
      error: `Instrument '${instrument}' does not match ${frets.length}-string fret pattern '${rightSide}'.`,
    };
  }

  return {
    valid: true,
    frets,
    instrument,
    label,
  };
};

/**
 * Parses and harmonically validates a single plain-text chord fingering definition line
 * inside `## Chords` / `## Fingerings`.
 * Supports recommendations for both invalid chord names (`X: 3x003x`) and harmonic mismatches (`G: 3x003x`).
 */
export const parseFingeringDefinitionLine = (rawLine = '') => {
  const trimmed = String(rawLine || '').replace(/\s+#.*$/, '').trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const colonIdx = trimmed.indexOf(':');
  if (colonIdx === -1) {
    return {
      valid: false,
      error: `Missing ':' separator in chord fingering line (expected e.g. 'Em7: 022030' or 'G7 (uke): 0212').`,
    };
  }

  const leftSide = trimmed.slice(0, colonIdx).trim();
  const rightSide = trimmed.slice(colonIdx + 1).trim();

  let explicitInstrument = null;
  let chordName = leftSide;
  const instMatch = /^(\S+)\s+\((guitar|gtr|uke|ukulele)\)$/i.exec(leftSide);
  if (instMatch) {
    chordName = instMatch[1].trim();
    const tag = instMatch[2].toLowerCase();
    explicitInstrument = tag.startsWith('uk') ? 'ukulele' : 'guitar';
  }

  // Parse fret pattern first so we can suggest chords even when `chordName` is invalid (e.g. `X: 3x003x`)
  const fretParse = parseFretPatternRightSide(rightSide, explicitInstrument, chordName);

  const chordMatch = /^([A-G][#b]?)([^/]*?)(?:\/([A-G][#b]?))?$/.exec(chordName);
  const isChordSyntaxValid =
    Boolean(chordMatch) &&
    NOTE_TO_SEMITONE[chordMatch[1]] !== undefined &&
    CHORD_QUALITY_REGEX.test(chordMatch[2] || '') &&
    (!chordMatch[3] || NOTE_TO_SEMITONE[chordMatch[3]] !== undefined);

  if (!isChordSyntaxValid) {
    let suggestionSuffix = '';
    let suggestions = [];
    if (fretParse.valid) {
      // If the user typed a valid root note with a typo in the quality (e.g. `Gmaj77: ...`), prioritize that root
      const rootPrefixMatch = /^([A-G][#b]?)/.exec(chordName);
      const rootHintSemitone =
        rootPrefixMatch && NOTE_TO_SEMITONE[rootPrefixMatch[1]] !== undefined
          ? NOTE_TO_SEMITONE[rootPrefixMatch[1]]
          : null;
      suggestions = suggestChordsForVoicing(fretParse.frets, fretParse.instrument, {
        targetRootSemitone: rootHintSemitone,
        targetRootStr: rootPrefixMatch ? rootPrefixMatch[1] : null,
        maxResults: 3,
      });
      if (suggestions.length === 0 && rootHintSemitone !== null) {
        suggestions = suggestChordsForVoicing(fretParse.frets, fretParse.instrument, {
          maxResults: 3,
        });
      }
      suggestionSuffix = formatChordSuggestionsText(suggestions);
    }
    return {
      valid: false,
      suggestions,
      error: `Invalid chord name '${chordName}' in fingering definition.${suggestionSuffix}`,
    };
  }

  if (!fretParse.valid) {
    return {
      valid: false,
      suggestions: [],
      error: fretParse.error,
    };
  }

  const rootStr = chordMatch[1];
  const rootSemitone = NOTE_TO_SEMITONE[rootStr];
  const quality = chordMatch[2] || '';
  const bassSemitone = chordMatch[3] ? NOTE_TO_SEMITONE[chordMatch[3]] : null;

  const harmonyCheck = validateVoicingHarmony(
    chordName,
    rootSemitone,
    quality,
    bassSemitone,
    fretParse.frets,
    fretParse.instrument,
    rootStr
  );
  if (!harmonyCheck.valid) {
    return {
      valid: false,
      suggestions: harmonyCheck.suggestions || [],
      error: harmonyCheck.error,
    };
  }

  return {
    valid: true,
    chordName,
    instrument: fretParse.instrument,
    frets: fretParse.frets,
    label: fretParse.label,
    suggestions: [],
  };
};

/**
 * Validates `##` sections in a song body (ensuring non-empty headers and valid, harmonically accurate
 * fingering definitions inside `## Chords` / `## Fingerings`).
 */
export const validateMarkdownSections = (bodyContent = '', bodyStartLine = 1) => {
  const diagnostics = [];
  const lines = String(bodyContent || '').replace(/\r\n/g, '\n').split('\n');
  let currentSectionType = 'main';
  const seenHeaders = new Set();

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const fileLine = bodyStartLine + i;

    if (rawLine.startsWith('##')) {
      const match = SECTION_HEADER_REGEX.exec(rawLine);
      if (!match) {
        diagnostics.push({
          line: fileLine,
          message: `Malformed section header '${rawLine}'. Expected '## Section Name'.`,
        });
        continue;
      }
      const title = match[1].trim();
      const normTitle = title.toLowerCase();
      if (seenHeaders.has(normTitle)) {
        diagnostics.push({
          line: fileLine,
          message: `Duplicate section header '## ${title}'.`,
        });
      }
      seenHeaders.add(normTitle);

      if (FINGERING_SECTION_HEADER_REGEX.test(title)) {
        currentSectionType = 'fingerings';
      } else if (NOTES_SECTION_HEADER_REGEX.test(title)) {
        currentSectionType = 'notes';
      } else {
        currentSectionType = 'translation';
      }
      continue;
    }

    if (currentSectionType === 'fingerings') {
      const parsed = parseFingeringDefinitionLine(rawLine);
      if (parsed && !parsed.valid) {
        diagnostics.push({
          line: fileLine,
          message: parsed.error,
        });
      }
    }
  }

  return diagnostics;
};

// --- SHARED SYNTAX HIGHLIGHTING PALETTE (Linter + SongScreen + PDF) ---
export const SYNTAX_PALETTE = {
  dark: {
    parenBg: 'rgba(121, 192, 255, 0.06)',
    parenSymbol: '#b392f0',
    chord: '#79c0ff',
    modifier: '#b392f0',
    directive: '#d29922',
    choir: '#7ee787',
  },
  light: {
    parenBg: 'rgba(9, 105, 218, 0.06)',
    parenSymbol: '#6e40c9',
    chord: '#0969da',
    modifier: '#6e40c9',
    directive: '#b45309',
    choir: '#1a7f37',
  },
  pdfBw: {
    parenBg: 'transparent',
    parenSymbol: '#6e6e6e',
    chord: '#000000',
    modifier: '#6e6e6e',
    directive: '#4b5563',
    choir: '#525252',
  },
};

export const validateAlphabeticalOrder = (keys) => {
  const sortedKeys = [...keys].sort();
  const isValid = keys.every((key, index) => key === sortedKeys[index]);
  
  return {
    isValid,
    expected: sortedKeys
  };
};

export const getMissingKeys = (frontmatterData, rawFileName = "") => {
  let requiredForThisFile = [...BASE_REQUIRED_KEYS];
  let derivedArtist = frontmatterData.artist;
  
  if (!derivedArtist && rawFileName.includes(' - ')) {
    derivedArtist = rawFileName.split(' - ')[0].trim();
  }

  if (STRICT_PROJECT_NAMES.includes(derivedArtist)) {
    requiredForThisFile = [...requiredForThisFile, ...STRICT_PROJECT_KEYS];
  }

  return requiredForThisFile.filter(reqKey => 
    frontmatterData[reqKey] === undefined || frontmatterData[reqKey] === null
  );
};

export const validateFrontmatter = (frontmatterData, rawFileName = "") => {
  const errors = [];
  const keys = Object.keys(frontmatterData);

  const missing = getMissingKeys(frontmatterData, rawFileName);
  if (missing.length > 0) {
    errors.push(`Missing required keys: ${missing.join(', ')}`);
  }

  const { isValid, expected } = validateAlphabeticalOrder(keys);
  if (!isValid) {
    errors.push(`Keys are not in alphabetical order. Expected: \n${expected.join('\n')}`);
  }

  return errors;
};

export const parseFrontmatterFile = (rawText) => {
  const normalized = String(rawText || '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return {
      hasFrontmatter: false,
      data: {},
      keyLines: {},
      bodyStartLine: 1,
      content: normalized,
    };
  }
  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return {
      hasFrontmatter: false,
      data: {},
      keyLines: {},
      bodyStartLine: 1,
      content: normalized,
    };
  }

  const yamlBlock = normalized.slice(4, endIdx);
  const lines = yamlBlock.split('\n');
  const rawAfterClose = normalized.slice(endIdx + 5);
  const strippedLeadingNewline = rawAfterClose.startsWith('\n');
  const bodyStartLine = lines.length + 3 + (strippedLeadingNewline ? 1 : 0);
  const content = strippedLeadingNewline ? rawAfterClose.slice(1) : rawAfterClose;
  const data = {};
  const keyLines = {};

  const parseScalar = (rawVal) => {
    const val = rawVal.trim();
    if (val === '') return '';
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      return val.slice(1, -1);
    }
    if (/^-?\d+$/.test(val)) return parseInt(val, 10);
    if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val, 10);
    return val;
  };

  let currentTopKey = null;
  let currentListObj = null;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const fileLineNumber = idx + 2;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const isIndented = /^\s/.test(line);
    const isListItem = trimmed.startsWith('- ') || trimmed === '-';

    if (!isIndented && !isListItem) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const rawVal = line.slice(colonIdx + 1).trim();
        currentTopKey = key;
        currentListObj = null;
        keyLines[key] = fileLineNumber;

        if (rawVal === '') {
          data[key] = [];
        } else {
          data[key] = parseScalar(rawVal);
        }
      }
    } else if (currentTopKey) {
      if (isListItem) {
        if (!Array.isArray(data[currentTopKey])) {
          data[currentTopKey] = [];
        }
        const afterDash = trimmed.slice(1).trim();
        const colonIdx = afterDash.indexOf(':');
        if (
          colonIdx !== -1 &&
          !afterDash.startsWith('"') &&
          !afterDash.startsWith("'")
        ) {
          const subKey = afterDash.slice(0, colonIdx).trim();
          const subVal = parseScalar(afterDash.slice(colonIdx + 1));
          currentListObj = { [subKey]: subVal };
          data[currentTopKey].push(currentListObj);
        } else if (afterDash !== '') {
          currentListObj = null;
          data[currentTopKey].push(parseScalar(afterDash));
        } else {
          currentListObj = {};
          data[currentTopKey].push(currentListObj);
        }
      } else if (currentListObj && trimmed.includes(':')) {
        const colonIdx = trimmed.indexOf(':');
        const subKey = trimmed.slice(0, colonIdx).trim();
        const subVal = parseScalar(trimmed.slice(colonIdx + 1));
        currentListObj[subKey] = subVal;
      }
    }
  }

  return {
    hasFrontmatter: true,
    data,
    keyLines,
    bodyStartLine,
    content,
  };
};
