import fs from 'fs';
import path from 'path';

try {
  let html = fs.readFileSync('dist/index.html', 'utf-8');

  // Inline CSS
  const cssMatch = html.match(/href="(\.\/assets\/[^"]+\.css)"/);
  if (cssMatch) {
    const cssPath = path.join('dist', cssMatch[1].replace('./', ''));
    if (fs.existsSync(cssPath)) {
      const cssData = fs.readFileSync(cssPath, 'utf-8');
      html = html.replace(/<link rel="stylesheet"[^>]+>/, `<style>${cssData}</style>`);
    }
  }

  // Inline JS
  const jsMatch = html.match(/src="(\.\/assets\/[^"]+\.js)"/);
  if (jsMatch) {
    const jsPath = path.join('dist', jsMatch[1].replace('./', ''));
    if (fs.existsSync(jsPath)) {
      const jsData = fs.readFileSync(jsPath, 'utf-8');
      html = html.replace(/<script type="module"[^>]+src="\.\/assets\/[^"]+\.js"><\/script>/, `<script type="module">${jsData}</script>`);
    }
  }

  fs.writeFileSync('dist/Srimaan_Solar_Quotation_Generator.html', html, 'utf-8');
  console.log('✓ Successfully generated dist/Srimaan_Solar_Quotation_Generator.html');
} catch (err) {
  console.error('Bundle error:', err);
}
