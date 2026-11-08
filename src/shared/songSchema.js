/**
 * @file src/shared/songSchema.js (in smallhotelroom.github.io)
 * @version 2.6.0
 * Single Source of Truth for Frontmatter Schema, Inline Chord Notation Grammar,
 * Markdown `##` Section & Fingering Postures Schema, and Syntax Highlighting Color Palettes.
 */

export const __version__ = '2.6.0';

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
 * Parses a single plain-text chord fingering definition line inside `## Chords` / `## Fingerings`.
 * Supported plain-text formats:
 *   Cmaj7: x32000
 *   Bm7b5: x2323x "Half-diminished"
 *   D5/A: x 0 0 2 3 5
 *   G7 (uke): 0212
 *   C#7 (ukulele): 1,1,1,4
 *
 * Returns `{ valid: true, chordName, instrument, frets, label }` or `{ valid: false, error }`.
 */
export const parseFingeringDefinitionLine = (rawLine = '') => {
  const trimmed = String(rawLine || '').replace(/#.*$/, '').trim();
  if (!trimmed) {
    return null; // Blank or comment line
  }

  const colonIdx = trimmed.indexOf(':');
  if (colonIdx === -1) {
    return {
      valid: false,
      error: `Missing ':' separator in chord fingering line (expected e.g. 'Cmaj7: x32000' or 'G7 (uke): 0212').`,
    };
  }

  const leftSide = trimmed.slice(0, colonIdx).trim();
  let rightSide = trimmed.slice(colonIdx + 1).trim();

  // Extract optional instrument tag on left side: e.g. "G7 (uke)" or "Cmaj7 (guitar)"
  let explicitInstrument = null;
  let chordName = leftSide;
  const instMatch = /^(\S+)\s+\((guitar|gtr|uke|ukulele)\)$/i.exec(leftSide);
  if (instMatch) {
    chordName = instMatch[1].trim();
    const tag = instMatch[2].toLowerCase();
    explicitInstrument = tag.startsWith('uk') ? 'ukulele' : 'guitar';
  }

  // Validate chord token syntax (Root + Quality + optional /Bass)
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

  // Extract optional quoted label on right side: e.g. x32000 "Thumb on 6th"
  let label = null;
  const quoteMatch = /^(.*?)\s+["'](.+)["']\s*$/.exec(rightSide);
  if (quoteMatch) {
    rightSide = quoteMatch[1].trim();
    label = quoteMatch[2].trim();
  }

  // Parse fret tokens:
  // Case A: Compact 6-char ("x32000") or 4-char ("0212") string of single digits / 'x'
  // Case B: Space-, comma-, or hyphen-delimited fret numbers ("x 10 12 12 11 10" or "x-5-7-7-x-x")
  let rawFretTokens = [];
  if (/^[xX0-9]{4}$/.test(rightSide) || /^[xX0-9]{6}$/.test(rightSide)) {
    rawFretTokens = rightSide.split('');
  } else {
    rawFretTokens = rightSide.split(/[\s,-]+/).filter(Boolean);
  }

  if (rawFretTokens.length !== 6 && rawFretTokens.length !== 4) {
    return {
      valid: false,
      error: `Fret pattern '${rightSide}' for '${chordName}' must have 6 strings (Guitar, e.g. 'x32000') or 4 strings (Ukulele, e.g. '0212'); found ${rawFretTokens.length}.`,
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

  return {
    valid: true,
    chordName,
    instrument,
    frets,
    label,
  };
};

/**
 * Validates `##` sections in a song body (ensuring non-empty headers and valid fingering definitions
 * inside `## Chords` / `## Fingerings`).
 * Returns an array of `{ line: number, message: string }` (1-indexed relative to body start).
 */
export const validateMarkdownSections = (bodyContent = '', bodyStartLine = 1) => {
  const diagnostics = [];
  const lines = String(bodyContent || '').replace(/\r\n/g, '\n').split('\n');
  let currentSectionType = 'main'; // 'main' | 'fingerings' | 'translation' | 'notes'
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
    parenSymbol: '#b392f0', // Soft lavender/purple for '(' and ')' symbols
    chord: '#79c0ff',       // Dark 2026 cool sky-blue for chord tokens
    modifier: '#b392f0',    // Soft lavender/purple for '!', '_', 'riff', 'palm mute', etc.
    directive: '#d29922',   // Warm gold for '(capo ...)', '(drop ...)', '(bpm ...)'
    choir: '#7ee787',       // Soft sage green for '[choir]'
  },
  light: {
    parenBg: 'rgba(9, 105, 218, 0.06)',
    parenSymbol: '#6e40c9', // Crisp purple for '(' and ')' on light background
    chord: '#0969da',       // Crisp royal blue for chord tokens on light background
    modifier: '#6e40c9',    // Crisp purple for modifiers
    directive: '#b45309',   // Crisp warm amber/gold for directives
    choir: '#1a7f37',       // Deep forest green for '[choir]'
  },
  pdfBw: {
    parenBg: 'transparent',
    parenSymbol: '#6e6e6e', // Charcoal grey for '(' and ')' so black chords pop on B/W paper
    chord: '#000000',       // Pure pitch black for chords
    modifier: '#6e6e6e',    // Charcoal grey for '!', '_', 'riff', 'palm mute', etc.
    directive: '#4b5563',   // Slate grey for '(capo ...)', '(drop ...)', '(bpm ...)'
    choir: '#525252',       // Medium-dark grey for italic '[choir]'
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
  const bodyStartLine = lines.length + 3;
  const content = normalized.slice(endIdx + 5).replace(/^\n/, '');
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
    const fileLineNumber = idx + 2; // Line 1 is opening '---'
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
