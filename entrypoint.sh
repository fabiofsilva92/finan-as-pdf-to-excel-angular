#!/bin/sh

# Definindo o caminho para o diretório assets
ASSETS_DIR=/usr/share/nginx/html/assets

# Cria o diretório assets se ele não existir
mkdir -p $ASSETS_DIR

# Cria o arquivo config.json dentro do diretório assets
cat <<EOF > $ASSETS_DIR/config.json
{
  "uploadURL": "${UPLOAD_URL:-https://financas-pessoais.fly.dev/process}"
}
EOF

# Executa o comando original do CMD
exec "$@"
