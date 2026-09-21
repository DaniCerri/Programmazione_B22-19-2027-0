# Libro di Programmazione 1 -- Setup LaTeX

Questa cartella contiene il sorgente \LaTeX\ del **Libro Ufficiale del Corso di Programmazione 1** (Piazza dei Mestieri, Torino).  
La struttura è modulare e pensata per crescere di pari passo con le lezioni svolte in classe durante l'anno accademico.

---

## 📁 Struttura della Cartella

```text
documento_corso/
├── main.tex          # File principale: copertina, indice cliccabile e inclusione capitoli
├── stile.sty         # Pacchetto grafico: palette Piazza dei Mestieri, box colorati, listati codice
├── compile.sh        # Script per compilazione rapida a due passate (con opzione clean)
├── Makefile          # Makefile per compilare da terminale (make / make clean)
├── README.md         # Questa guida
└── capitoli/         # I singoli capitoli del libro (uno per argomento o blocco di lezioni)
    └── 01_introduzione_algoritmi.tex
```

---

## 🚀 Come Compilare il Libro

Per ottenere il file PDF finale con tutti i collegamenti e l'indice interattivo:

### Metodo 1: Script bash (consigliato)
```bash
./compile.sh
```

Per pulire i file temporanei generati da \LaTeX\ (`.aux`, `.log`, `.toc`, ecc.):
```bash
./compile.sh clean
```

### Metodo 2: Makefile
```bash
make
```
Oppure:
```bash
make clean
```

---

## ✍️ Come Aggiungere una Nuova Lezione / Capitolo

1. **Crea un nuovo file `.tex`** all'interno della cartella `capitoli/`, ad esempio:
   ```text
   capitoli/02_diagrammi_di_flusso.tex
   ```
2. **Scrivi il contenuto** iniziando con il comando del capitolo:
   ```latex
   \chapter{Diagrammi di Flusso e Flowchart}
   \label{chap:flowchart}

   \section{I Blocchi Fondamentali}
   ...
   ```
3. **Includi il file in `main.tex`** aggiungendo la riga nella posizione desiderata:
   ```latex
   \input{capitoli/02_diagrammi_di_flusso}
   ```
4. **Ricompila** con `./compile.sh` o `make`. L'indice generale verrà aggiornato automaticamente e conterrà il link cliccabile al nuovo capitolo!

---

## 🎨 Box Didattici Disponibili

Nel file `stile.sty` sono stati configurati ambienti pronti all'uso per rendere il testo piacevole e coinvolgente per gli studenti:

* **Concetto / Definizione:**
  ```latex
  \begin{concetto}[Definizione di Algoritmo]
  Testo del concetto...
  \end{concetto}
  ```
* **Esempio Pratico:**
  ```latex
  \begin{esempio}[Preparare una ricetta]
  Esempio illustrativo...
  \end{esempio}
  ```
* **Esercizio per gli allievi:**
  ```latex
  \begin{esercizio}[Attraversamento pedonale]
  Traccia dell'esercizio...
  \end{esercizio}
  ```
* **Soluzione Guidata:**
  ```latex
  \begin{soluzione}[Passaggi risolutivi]
  Spiegazione della soluzione...
  \end{soluzione}
  ```
* **Attenzione ed Errori Comuni:**
  ```latex
  \begin{attenzione}[Ciclo infinito]
  Avviso sui problemi frequenti...
  \end{attenzione}
  ```
* **Suggerimento del Docente:**
  ```latex
  \begin{consiglio}[Best practice]
  Suggerimento pratico di programmazione...
  \end{consiglio}
  ```
* **Blocchi di Codice:**
  ```latex
  \begin{lstlisting}[language=Python]
  # Codice Python formattato ed evidenziato
  print("Ciao mondo!")
  \end{lstlisting}
  ```
