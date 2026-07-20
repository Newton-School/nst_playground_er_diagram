#!/bin/bash
set -euo pipefail
[ -d vendor ] || mkdir vendor
cd "$(dirname "$0")/vendor"

[ -d bliss ] || git clone --depth 1 https://github.com/digraphs/bliss

cat > paths.json <<EOF
{
  "bliss": "$(pwd)/bliss/bliss",
}
EOF

echo "OK:"
echo "  bliss -> $(pwd)/bliss/bliss"
