# ==============================================================================
# Makefile per il Libro Didattico di Programmazione 1
# ==============================================================================

TEX = pdflatex
FLAGS = -halt-on-error -interaction=nonstopmode
MAIN = main

.PHONY: all pdf clean distclean

all: pdf

pdf:
	@echo "==> Compilazione 1/2..."
	$(TEX) $(FLAGS) $(MAIN).tex
	@echo "==> Compilazione 2/2 per indice e link..."
	$(TEX) $(FLAGS) $(MAIN).tex
	@echo "==> Generato con successo: $(MAIN).pdf"

clean:
	@echo "==> Rimozione file ausiliari..."
	rm -f *.aux *.log *.out *.toc *.synctex.gz *.fls *.fdb_latexmk capitoli/*.aux
	@echo "==> Pulizia completata."

distclean: clean
	rm -f $(MAIN).pdf
