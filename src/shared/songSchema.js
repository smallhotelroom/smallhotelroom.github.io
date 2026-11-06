/**
 * @file src/shared/songSchema.js (in smallhotelroom.github.io)
 * @version 2.4.0
 * Single Source of Truth for Frontmatter Schema, Inline Chord Notation Grammar,
 * and Syntax Highlighting Color Palettes (shared by VS Code Linter, Acordismo App, Web, and PDFs).
 */

export const __version__ = '2.4.0';

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
  "init",
  "initNote",
  "isrc",
  "key",
  "lang",
  "license",
  "musicians",
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
