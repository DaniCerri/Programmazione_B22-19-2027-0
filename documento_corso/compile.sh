#!/usr/bin/env bash
# ==============================================================================
# Script di compilazione per il libro di testo LaTeX
# Piazza dei Mestieri - Programmazione 1
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

if [ "$1" = "clean" ]; then
    echo "==> Rimozione dei file temporanei ed ausiliari..."
    rm -f *.aux *.log *.out *.toc *.synctex.gz *.fls *.fdb_latexmk capitoli/*.aux
    echo "==> Pulizia completata con successo!"
    exit 0
fi

echo "============================================================"
echo "  Compilazione Libro di Programmazione 1 (LaTeX)"
echo "============================================================"

echo "--> [1/2] Prima passata pdflatex (struttura e sezioni)..."
pdflatex -halt-on-error -interaction=nonstopmode main.tex > /dev/null

echo "--> [2/2] Seconda passata pdflatex (indice cliccabile e riferimenti)..."
pdflatex -halt-on-error -interaction=nonstopmode main.tex > /dev/null

echo "============================================================"
echo "  COMPILAZIONE COMPLETATA CON SUCCESSO!"
echo "  File generato: $(pwd)/main.pdf"
echo "============================================================"
