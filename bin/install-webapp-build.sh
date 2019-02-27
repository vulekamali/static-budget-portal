set -Eeuo pipefail

rm -f assets/webapp/js/*
cp packages/webapp/build/static/js/* assets/webapp/js/
git add assets/webapp/js
