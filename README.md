# [Nome do Cliente] — Site Estático

## Informações do Projeto

| Campo       | Valor                        |
|-------------|------------------------------|
| Cliente     | Nome do cliente              |
| Domínio     | https://www.seudominio.com.br |
| Servidor    | Cloudpanel / VPS             |
| Contato     | email@cliente.com.br         |
| Início      | DD/MM/AAAA                   |
| Última att. | DD/MM/AAAA                   |

---

## Estrutura de Arquivos

```
/
├── index.html          ← Página principal
├── pages/
│   ├── sobre.html
│   ├── contato.html
│   └── privacidade.html
├── assets/
│   ├── css/
│   │   ├── main.css    ← Estilos gerais
│   │   └── cookies.css ← Banner LGPD
│   ├── js/
│   │   ├── main.js          ← Scripts gerais
│   │   ├── cookies.js       ← Consentimento LGPD
│   │   └── sitemap-gen.js   ← Gerador de sitemap (Node.js)
│   ├── img/            ← Imagens otimizadas (.webp preferencial)
│   └── fonts/          ← Fontes locais (se houver)
├── sitemap.xml
├── robots.txt
└── .htaccess
```

---

## Deploy

### Manual (SFTP / File Manager)
Suba todos os arquivos para o diretório público do domínio.

### Via Git + SSH
```bash
# No servidor (primeira vez)
git clone git@github.com:usuario/repo.git /home/cliente/htdocs

# Atualizações
ssh usuario@servidor "cd /home/cliente/htdocs && git pull"
```

---

## Atualizar Sitemap

```bash
# Requer Node.js no servidor ou localmente
node assets/js/sitemap-gen.js
```

Edite `BASE_URL` e o objeto `PRIORITIES` no topo do arquivo antes de rodar.

---

## Checklist de Go-Live

- [ ] Substituir todos `seudominio.com.br` pelo domínio real
- [ ] Substituir `G-XXXXXXX` pelo ID do Google Analytics
- [ ] Descomentar bloco do GA no `<head>` do HTML
- [ ] Rodar `sitemap-gen.js` e verificar URLs geradas
- [ ] Atualizar `robots.txt` com a URL correta do sitemap
- [ ] Testar banner de cookies (abrir em aba anônima)
- [ ] Verificar `.htaccess` funcionando (cache e compressão)
- [ ] Apontar domínio para Cloudflare
- [ ] Testar PageSpeed Insights (meta: 90+)
