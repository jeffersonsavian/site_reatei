#!/bin/bash
# deploy.sh — Script de deploy via SSH
# Uso: ./deploy.sh
# Configure as variáveis abaixo antes de usar

SERVER_USER="usuario"
SERVER_HOST="ip.do.servidor"
SERVER_PATH="/home/cliente/htdocs"
REPO_PATH=$(pwd)

echo "🚀 Iniciando deploy..."

# Atualiza sitemap antes de subir
if command -v node &> /dev/null; then
  echo "📍 Gerando sitemap..."
  node assets/js/sitemap-gen.js
fi

# Faz push para o Git
echo "📦 Enviando para o Git..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')" 2>/dev/null || echo "Nada novo para commitar."
git push

# Pull no servidor via SSH
echo "🔄 Atualizando servidor..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_PATH} && git pull origin main"

echo "✅ Deploy concluído!"
