/* v1.6.0 - Draconian Test Engine using Unified Validator */
import { describe, it, expect } from 'vitest';
import { validateFrontmatter } from './shared/songSchema';
import { validateAlbumFrontmatter } from './shared/albumSchema';

const songFiles = import.meta.glob('./contents/songs/*.md', { import: 'default', eager: true });
const albumFiles = import.meta.glob('./contents/albums/*.md', { import: 'default', eager: true });

describe('Markdown Frontmatter Strict Linting (Songs)', () => {
  Object.entries(songFiles).forEach(([filePath, parsedFile]) => {
    
    const fileName = filePath.split('/').pop();
    
    describe(`File: ${fileName}`, () => {
      const { data } = parsedFile;

      it('should pass all draconian schema checks', () => {
        const errors = validateFrontmatter(data, fileName);
        expect(errors, `\n🚨 LINT ERRORS IN ${fileName}:\n${errors.join('\n\n')}\n`).toEqual([]);
      });
    });
  });
});

describe('Markdown Frontmatter Strict Linting (Albums)', () => {
  Object.entries(albumFiles).forEach(([filePath, parsedFile]) => {
    
    const fileName = filePath.split('/').pop();
    
    describe(`File: ${fileName}`, () => {
      const { data } = parsedFile;

      it('should pass all draconian schema checks', () => {
        const errors = validateAlbumFrontmatter(data, fileName);
        expect(errors, `\n🚨 LINT ERRORS IN ${fileName}:\n${errors.join('\n\n')}\n`).toEqual([]);
      });
    });
  });
});