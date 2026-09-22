/* v1.0.0 - Automated Sitemap Generator */
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://smallhotelroom.com';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

// Formats today's date for the XML (e.g., "2026-04-01")
const getToday = () => new Date().toISOString().split('T')[0];

const generateSitemap = () => {
  console.log('🗺️  Generating sitemap.xml...');

  const urls = [
    { loc: `${BASE_URL}/`, priority: '1.00' }
  ];

  // The subfolders we want to scan inside /dist
  const dirsToScan = ['songs', 'extras'];

  dirsToScan.forEach(dir => {
    const dirPath = path.join(DIST_DIR, dir);
    
    // If the directory exists, read all the HTML files inside it
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.endsWith('.html')) {
          // Convert filename "mountain.html" -> URL path "/songs/mountain"
          const slug = file.replace('.html', '');
          urls.push({
            loc: `${BASE_URL}/${dir}/${slug}`,
            priority: '0.80'
          });
        }
      });
    }
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${getToday()}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write the completed XML directly into the dist folder
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapContent);
  console.log(`✅ sitemap.xml successfully generated with ${urls.length} URLs!`);
};

generateSitemap();