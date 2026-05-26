#!/usr/bin/env node
/**
 * sitemap-gen.js
 * Gera o sitemap.xml automaticamente varrendo os arquivos HTML do projeto.
 * 
 * Uso: node assets/js/sitemap-gen.js
 * 
 * Configuração: edite as variáveis abaixo antes de rodar.
 */

const fs   = require('fs');
const path = require('path');

// ── CONFIGURAÇÃO ─────────────────────────────────────────────
const BASE_URL    = 'https://reatei.com.br'; // Sem barra no final
const ROOT_DIR    = path.resolve(__dirname, '../../'); // Raiz do projeto
const OUTPUT_FILE = path.join(ROOT_DIR, 'sitemap.xml');

// Páginas e suas prioridades (defina manualmente para controle fino)
const PRIORITIES = {
  '/':                          { priority: '1.0', changefreq: 'monthly' },
  '/suporte':                   { priority: '0.6', changefreq: 'yearly'  },
  '/termos-de-uso':             { priority: '0.3', changefreq: 'yearly'  },
  '/politica-de-privacidade':   { priority: '0.3', changefreq: 'yearly'  },
};

// Arquivos/pastas a ignorar
const IGNORE = ['404.html'];
// ─────────────────────────────────────────────────────────────

function getHtmlFiles(dir, baseDir = dir) {
  const results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !['assets', 'node_modules', '.git'].includes(file)) {
      results.push(...getHtmlFiles(fullPath, baseDir));
    } else if (file.endsWith('.html') && !IGNORE.includes(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

function fileToUrl(filePath, rootDir) {
  let relative = filePath.replace(rootDir, '').replace(/\\/g, '/');
  relative = relative.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  // Esconde a pasta /pages/ na URL pública (rewrite no .htaccess faz o resto)
  relative = relative.replace(/^\/pages\//, '/');
  if (relative === '') relative = '/';
  return relative;
}

function generateSitemap() {
  const files   = getHtmlFiles(ROOT_DIR);
  const today   = new Date().toISOString().split('T')[0];
  const urls    = files.map(f => fileToUrl(f, ROOT_DIR));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml    += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  urls.forEach(url => {
    const meta = PRIORITIES[url] || { priority: '0.5', changefreq: 'yearly' };
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${meta.changefreq}</changefreq>\n`;
    xml += `    <priority>${meta.priority}</priority>\n`;
    xml += `  </url>\n\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
  console.log(`✅ sitemap.xml gerado com ${urls.length} URLs:`);
  urls.forEach(u => console.log(`   ${BASE_URL}${u}`));
}

generateSitemap();
