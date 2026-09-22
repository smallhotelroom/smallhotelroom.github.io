/* v1.2.0 */

// Keys sorted alphabetically!
const REQUIRED_KEYS = [
  'badge',
  'bandcampId',
  'bandcampUrl',
  'coverArt',
  'order',
  'title',
  'type',
  'upc'
];

export const validateAlbumFrontmatter = (data, fileName) => {
  const errors = [];

  // 1. Check for missing required fields
  REQUIRED_KEYS.forEach(key => {
    // We check against undefined/null so you are still allowed to use 
    // empty strings (e.g., upc: "") for pending data.
    if (data[key] === undefined || data[key] === null) {
      errors.push(`Missing required field: '${key}'`);
    }
  });

  // 2. Type enforcement
  if (data.order !== undefined && typeof data.order !== 'number') {
    errors.push(`'order' must be a number. Received: ${typeof data.order}`);
  }

  // 3. Strict Alphabetical Order Enforcement
  const keys = Object.keys(data);
  const sortedKeys = [...keys].sort();
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== sortedKeys[i]) {
      errors.push(`Frontmatter keys must be strictly alphabetical. Expected '${sortedKeys[i]}' but found '${keys[i]}'.`);
      break; // Only report the first ordering error to avoid console noise
    }
  }

  return errors;
};