const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked'); // ✅ note the destructuring

const inputDir = 'docs'; // markdown source
const outputDir = 'static-site'; // html output

fs.ensureDirSync(outputDir);

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.md')) {
    const md = fs.readFileSync(path.join(inputDir, file), 'utf-8');
    const html = marked(md); // now works correctly

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${file.replace('.md','')}</title>
      </head>
      <body>${html}</body>
      </html>
    `;

    fs.writeFileSync(path.join(outputDir, file.replace('.md', '.html')), htmlTemplate);
  }
});

console.log('HTML files generated in', outputDir);
