# Le Condizioni negli Algoritmi: La Logica del City Builder Marziano
**Corso di Programmazione 1 &bull; Prima Superiore (80 Ore)**  
*Piazza dei Mestieri &bull; Docente: Daniele Cerrina*  
*Lezione 03 &bull; 05 Ottobre 2026*  
*Progetto Guida Annuale:* **Mars City Builder (Lite)**

---

## Struttura della Presentazione (16 Slide - Ottimizzata per LIM)

Tutti i contenuti sono incentrati sulle meccaniche classiche di un **city builder leggero** (gestione risorse, costi di costruzione, bilancio energetico, cibo e felicità della popolazione), eliminando i formalismi grafici dei diagrammi a blocchi per concentrarsi sul ragionamento algoritmico, lo pseudocodice e la tabella di traccia (*dry-run*):

1. **Copertina Ufficiale:** Le Condizioni: La Logica del City Builder (`SE ... ALLORA ... ALTRIMENTI`).
2. **Perché un Gestionale ha Bisogno di Bivi?** Evitare risorse negative e bug di gioco: controllo risorse prima dell'azione.
3. **Cos'è una Condizione?** Logica Booleana: solo VERO (1) o FALSO (0). Regole di gioco oggettive.
4. **I 6 Operatori Relazionali di Confronto:** Simboli universali (`>`, `<`, `>=`, `<=`, `==`, `!=`).
5. **Il Bug #1 dei Programmatori:** Assegnazione (`=`, modifica risorsa) vs Confronto (`==`, test logico).
6. **La Selezione a Due Vie:** Sintassi formale `SE ... ALLORA ... ALTRIMENTI ... FINE SE` e principio di mutua esclusione.
7. **La Selezione a Una Via:** Variante `SE ... ALLORA` (senza `ALTRIMENTI`) per bonus di turno o eventi speciali.
8. **Pattern di Gioco Fondamentale:** Lo schema *Verifica $\to$ Scala Risorsa $\to$ Feedback al Giocatore*.
9. **I Diagrammi a Blocchi (Flow Chart):** Le forme geometriche standard (Parallelogramma, Rettangolo, Rombo/Esagono, Ovale).
10. **Esempio Svolto (1/2) — Specifiche:** Costruzione della Cupola Idroponica (Costo: 50 Metallo).
11. **Esempio Svolto (2/2) — Il Flow Chart Risolto:** Diagramma a blocchi completo affiancato al corrispondente pseudocodice.
12. **Esercizio 1 (Sfida Flow Chart):** Il Bilancio Energetico della Colonia (Centrale solare: produzione vs fabbisogno).
13. **Esercizio 2 (Sfida Flow Chart):** Arrivo di Nuovi Coloni & Razioni di Cibo (Ares Shuttle: verifica scorte e aggiornamento magazzino).
14. **Esercizio 3 (Sfida Flow Chart):** L'Indice di Felicità della Colonia (Assemblea cittadina: scelta a 3 vie con rombi a cascata).
15. **I 3 Errori Tipici nei Flow Chart:** Etichette SÌ/NO mancanti, forme invertite, frecce aperte senza ricongiunzione.
16. **Regole del Laboratorio (Solo Algoritmi):** Focus 100% sulla progettazione dei diagrammi a blocchi con penna e righello.

---

## Controlli da Tastiera e Scorciatoie LIM

| Tasto | Funzione |
|---|---|
| `→` / `Spazio` / `PageDown` | Diapositiva Successiva |
| `←` / `Backspace` / `PageUp` | Diapositiva Precedente |
| **`F`** | Schermo Intero (Full Screen per proiezione su LIM) |
| **`O`** o **`Esc`** | Indice delle 16 slide con anteprime cliccabili per salto rapido |
| **`N`** | Note del docente a fondo pagina |
| **`P`** | Esporta tutte le diapositive in PDF widescreen 16:9 |
| **`Home`** / **`End`** | Prima slide / Ultima slide |
| **Touch** | Scorrimento tramite swipe per LIM o display touch |
