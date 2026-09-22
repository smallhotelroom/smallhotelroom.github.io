/* v3.1.0 - Pure Data Parser */
import { parseSongMarkdown } from "../shared/songParser";

const songFiles = import.meta.glob('../contents/songs/*.md', { import: 'default', eager: true });
const albumFiles = import.meta.glob('../contents/albums/*.md', { import: 'default', eager: true });

// 1. Process Albums
export const allAlbums = Object.entries(albumFiles).map(([filePath, parsedFile]) => {
  const { data } = parsedFile;
  const id = filePath.split('/').pop().replace('.md', '');
  
  return {
    id,
    ...data, // Spreads title, type, upc, downloadUrl, cdFiles, reviews, etc.
    title: data.title || id,
    order: data.order || 99,
    tracks: [],
    extras: []
  };
});

allAlbums.sort((a, b) => a.order - b.order);

// 2. Process Songs
const allTracks = Object.entries(songFiles).map(([filePath, parsedFile]) => {
  const rawFileName = filePath.split('/').pop().replace('.md', '');
  return parseSongMarkdown(rawFileName, parsedFile.data, parsedFile.content);
});

allTracks.sort((a, b) => parseInt(a.track || 999, 10) - parseInt(b.track || 999, 10));

// 3. Group Songs
allTracks.forEach(track => {
  if (track.album) {
    const targetAlbum = allAlbums.find(a => a.title === track.album);
    if (targetAlbum) {
       track.albumUpc = targetAlbum.upc;
       targetAlbum.tracks.push(track);
    }
  }
});

// 4. Dynamically generate "Extras" based on Album Markdown
allAlbums.forEach(album => {
  if (album.cdFiles) {
    album.extras.push({
      id: `${album.id}-create-cd`,
      isExtra: true,
      extraType: 'create-cd',
      title: `Create the Hi-Fi CD`,
      albumData: album
    });
  }
  if (album.reviews && album.reviews.length > 0) {
    album.extras.push({
      id: `${album.id}-reviews`,
      isExtra: true,
      extraType: 'reviews',
      title: `Reviews`,
      albumData: album
    });
  }
});

export const musicData = allAlbums;