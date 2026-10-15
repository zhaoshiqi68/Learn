#!/bin/bash
# Assembles the course from parts.
# Run from the course directory: bash build.sh
set -e
cat _base.html _cover.html modules/*.html _footer.html > index.html
mkdir -p ../../docs
cp index.html styles.css main.js ../../docs/
touch ../../docs/.nojekyll
echo "Built index.html and refreshed docs/ for GitHub Pages."
