/* v1.1.0 */

export const parseSongMarkdown = (rawFileName, frontmatterData, rawContent) => {
  // 1. Extract the Artist and Title from the filename
  const dashIndex = rawFileName.indexOf(' - ');
  
  let extractedArtist = null;
  let songName = rawFileName;

  if (dashIndex !== -1) {
    extractedArtist = rawFileName.substring(0, dashIndex).trim();
    songName = rawFileName.substring(dashIndex + 3).trim();
  }

  // 2. Generate a clean URL slug (e.g., "we-die-alt")
  const generatedId = songName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)/g, '');    

  // 3. Parse the Lyrics & Translations
  const defaultLang = frontmatterData.lang || "English";
  const lyricsList = [];
  const sections = rawContent.split(/(?:^|\n)##\s+/);

  if (sections[0].trim()) {
    lyricsList.push({ lang: defaultLang, content: sections[0].trim() });
  }

  for (let i = 1; i < sections.length; i++) {
    const section = sections[i].trim();
    const firstNewlineIndex = section.indexOf('\n');

    if (firstNewlineIndex !== -1) {
      const langName = section.substring(0, firstNewlineIndex).trim();
      const langContent = section.substring(firstNewlineIndex + 1).trim();
      lyricsList.push({ lang: langName, content: langContent });
    } else {
      lyricsList.push({ lang: section, content: "" });
    }
  }

  // 4. Return the assembled track object
  return {
    ...frontmatterData,
    // Use the override if it exists, otherwise use the filename extraction
    artist: frontmatterData.artist || extractedArtist || "Unknown Artist",
    id: frontmatterData.id || generatedId, 
    title: frontmatterData.title || songName, 
    lyricsList: lyricsList,
  };
};