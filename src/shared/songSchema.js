/**
 * @file src/shared/songSchema.js (in smallhotelroom.github.io)
 * @version 2.7.2
 * Single Source of Truth for Frontmatter Schema, Inline Chord Notation Grammar,
 * Markdown `##` Section & Harmonic Fingering Postures Schema, and Syntax Highlighting Color Palettes.
 */

export const __version__ = '2.7.2';

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
 * Computes the allowed and required pitch classes (0..11) for a chord's root, quality, and optional slash bass.
 * Used to harmonically validate custom chord fingerings in `## Chords` / `## Fingerings`.
 */
export const getChordExpectedPitchClasses = (rootSemitone, rawQuality = '', bassSemitone = null) => {
  const q = String(rawQuality || '').trim().replace(/^\(|\)$/g, '');

  let allowedIntervals = [0, 4, 7];
  let requiredIntervals = [0, 4];

  if (!q || q === 'M' || /^maj$/i.test(q)) {
    allowedIntervals = [0, 4, 7];
    requiredIntervals = [0, 4];
  } else if (q === '5') {
    allowedIntervals = [0, 7];
    requiredIntervals = [0, 7];
  } else if (q === 'm' || /^min$/i.test(q) || q === '-') {
    allowedIntervals = [0, 3, 7];
    requiredIntervals = [0, 3];
  } else if (q === '7' || /^dom7$/i.test(q)) {
    allowedIntervals = [0, 4, 7, 10];
    requiredIntervals = [0, 4, 10];
  } else if (q === 'M7' || /^maj7$/i.test(q)) {
    allowedIntervals = [0, 4, 7, 11];
    requiredIntervals = [0, 4, 11];
  } else if (/^m(in)?7$/i.test(q) || q === '-7') {
    allowedIntervals = [0, 3, 7, 10];
    requiredIntervals = [0, 3, 10];
  } else if (/^m(in)?(M7|maj7)$/i.test(q)) {
    allowedIntervals = [0, 3, 7, 11];
    requiredIntervals = [0, 3, 11];
  } else if (/^sus2$/i.test(q) || q === '2') {
    allowedIntervals = [0, 2, 7];
    requiredIntervals = [0, 2];
  } else if (/^sus4?$/i.test(q)) {
    allowedIntervals = [0, 5, 7];
    requiredIntervals = [0, 5];
  } else if (/^(7sus4|7sus)$/i.test(q)) {
    allowedIntervals = [0, 5, 7, 10];
    requiredIntervals = [0, 5, 10];
  } else if (/^9sus4$/i.test(q)) {
    allowedIntervals = [0, 2, 5, 7, 10];
    requiredIntervals = [0, 2, 5, 10];
  } else if (/^(dim|o)$/i.test(q)) {
    allowedIntervals = [0, 3, 6];
    requiredIntervals = [0, 3, 6];
  } else if (/^(dim7|o7)$/i.test(q)) {
    allowedIntervals = [0, 3, 6, 9];
    requiredIntervals = [0, 3, 6, 9];
  } else if (/^(m7b5|m7-5|ø)$/i.test(q)) {
    allowedIntervals = [0, 3, 6, 10];
    requiredIntervals = [0, 3, 6, 10];
  } else if (/^(aug|\+|\+5)$/i.test(q)) {
    allowedIntervals = [0, 4, 8];
    requiredIntervals = [0, 4, 8];
  } else if (/^(7#5|7\+5|7\+|aug7)$/i.test(q)) {
    allowedIntervals = [0, 4, 8, 10];
    requiredIntervals = [0, 4, 8, 10];
  } else if (/^(7b5|7-5)$/i.test(q)) {
    allowedIntervals = [0, 4, 6, 10];
    requiredIntervals = [0, 4, 6, 10];
  } else if (/^(7b9|7-9)$/i.test(q)) {
    allowedIntervals = [0, 1, 4, 7, 10];
    requiredIntervals = [0, 1, 4, 10];
  } else if (q === '6' || /^maj6$/i.test(q)) {
    allowedIntervals = [0, 4, 7, 9];
    requiredIntervals = [0, 4, 9];
  } else if (/^m(in)?6$/i.test(q)) {
    allowedIntervals = [0, 3, 7, 9];
    requiredIntervals = [0, 3, 9];
  } else if (/^(add9|add2)$/i.test(q)) {
    allowedIntervals = [0, 2, 4, 7];
    requiredIntervals = [0, 2, 4];
  } else if (/^m(in)?(add9|add2)$/i.test(q)) {
    allowedIntervals = [0, 2, 3, 7];
    requiredIntervals = [0, 2, 3];
  } else if (q === '9') {
    allowedIntervals = [0, 2, 4, 7, 10];
    requiredIntervals = [0, 2, 4, 10];
  } else if (/^m(in)?9$/i.test(q)) {
    allowedIntervals = [0, 2, 3, 7, 10];
    requiredIntervals = [0, 2, 3, 10];
  } else if (/^(M9|maj9)$/i.test(q)) {
    allowedIntervals = [0, 2, 4, 7, 11];
    requiredIntervals = [0, 2, 4, 11];
  } else {
    return null;
  }

  const allowedPcs = new Set(allowedIntervals.map((iv) => (rootSemitone + iv) % 12));
  const requiredPcs = new Set(requiredIntervals.map((iv) => (rootSemitone + iv) % 12));
  if (bassSemitone !== null && bassSemitone !== undefined) {
    allowedPcs.add(bassSemitone);
    requiredPcs.add(bassSemitone);
  }

  return { allowedPcs, requiredPcs };
};

/**
 * Validates that the notes sounded by `frets` on `instrument` harmonically match `chordName`.
 */
export const validateVoicingHarmony = (
  chordName,
  rootSemitone,
  quality,
  bassSemitone,
  frets,
  instrument = 'guitar'
) => {
  const expected = getChordExpectedPitchClasses(rootSemitone, quality, bassSemitone);
  if (!expected) {
    return { valid: true };
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
    return {
      valid: false,
      error: `Harmonic mismatch in '${chordName}': ${issues.join('; ')}.`,
    };
  }

  return { valid: true };
};

/**
 * Parses and harmonically validates a single plain-text chord fingering definition line
 * inside `## Chords` / `## Fingerings`.
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
  let rightSide = trimmed.slice(colonIdx + 1).trim();

  let explicitInstrument = null;
  let chordName = leftSide;
  const instMatch = /^(\S+)\s+\((guitar|gtr|uke|ukulele)\)$/i.exec(leftSide);
  if (instMatch) {
    chordName = instMatch[1].trim();
    const tag = instMatch[2].toLowerCase();
    explicitInstrument = tag.startsWith('uk') ? 'ukulele' : 'guitar';
  }

  const chordMatch = /^([A-G][#b]?)([^/]*?)(?:\/([A-G][#b]?))?$/.exec(chordName);
  if (
    !chordMatch ||
    NOTE_TO_SEMITONE[chordMatch[1]] === undefined ||
    !CHORD_QUALITY_REGEX.test(chordMatch[2] || '') ||
    (chordMatch[3] && NOTE_TO_SEMITONE[chordMatch[3]] === undefined)
  ) {
    return {
      valid: false,
      error: `Invalid chord name '${chordName}' in fingering definition.`,
    };
  }

  const rootSemitone = NOTE_TO_SEMITONE[chordMatch[1]];
  const quality = chordMatch[2] || '';
  const bassSemitone = chordMatch[3] ? NOTE_TO_SEMITONE[chordMatch[3]] : null;

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
      error: `Fret pattern '${rightSide}' for '${chordName}' must have 6 strings (Guitar, e.g. '022030') or 4 strings (Ukulele, e.g. '0212'); found ${rawFretTokens.length}.`,
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
          error: `Fret number '${fNum}' out of range (0..24) in '${chordName}: ${rightSide}'.`,
        };
      }
      frets.push(fNum);
    } else {
      return {
        valid: false,
        error: `Invalid fret token '${tok}' in '${chordName}: ${rightSide}' (use digits 0-24 or 'x').`,
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

  const harmonyCheck = validateVoicingHarmony(
    chordName,
    rootSemitone,
    quality,
    bassSemitone,
    frets,
    instrument
  );
  if (!harmonyCheck.valid) {
    return {
      valid: false,
      error: harmonyCheck.error,
    };
  }

  return {
    valid: true,
    chordName,
    instrument,
    frets,
    label,
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
  // Line 1 is opening '---' (1) + yamlBlock lines (lines.length) + closing '---' (1) + first body line (1) + optional stripped '\n'
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
