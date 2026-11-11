#!/usr/bin/env bash
# Ajusta a saída do build para o GitHub Pages (projeto servido em /<repo>/).
set -euo pipefail
BASE="${BASE_PATH:?defina BASE_PATH, ex.: /meu-repo/}"
BASE="${BASE%/}"
OUT=.output/public
# O TanStack Start busca o cache de server functions sem considerar o base path.
grep -rl '/__tsr/staticServerFnCache/' "$OUT/assets" | while read -r f; do
  sed -i.bak "s#\`/__tsr/staticServerFnCache/#\`$BASE/__tsr/staticServerFnCache/#g" "$f" && rm -f "$f.bak"
done
cp "$OUT/_shell.html" "$OUT/404.html"
touch "$OUT/.nojekyll"
