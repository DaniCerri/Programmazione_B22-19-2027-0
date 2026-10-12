# Lezione 04: Capire il Problema — Leggere da Programmatore
**Data:** 12 Ottobre 2026  
**Corso:** Programmazione 1 (Prima Superiore — Operatore Informatico, 80 Ore)  
**Docente:** Daniele Cerrina (`daniele.cerrina@immaginazioneelavoro.it`)  
**Sede:** Piazza dei Mestieri (Torino)  
**Progetto Guida Annuale:** **Mars City Builder (Lite)**  
**Durata:** 1 ora e 30 minuti

---

## 1. Perché Leggere Prima di Risolvere?

Il computer fa **esattamente** quello che gli diciamo. Se leggiamo male il testo di un problema, il bug nasce prima ancora di disegnare un Flow Chart.

> [!WARNING]
> **Il bug nato da due parole**  
> Il testo dice: *"L'allarme deve suonare quando restano **al massimo 10** unità di ossigeno."*  
> Il programmatore frettoloso capisce: *"L'allarme suona quando restano **meno di 10** unità."*  
> Con esattamente 10 unità il testo vuole l'allarme (10 ≤ 10), il programma invece tace (10 < 10 è falso).

---

## 2. Lo Schema I-P-O come Filtro di Lettura

| | Domanda da farsi | Cosa cercare nel testo |
|---|---|---|
| **INPUT** | Cosa mi **DAI**? | I dati noti: numeri, quantità, misure |
| **ELABORAZIONE** | Quali **REGOLE**? | Calcoli e condizioni che collegano dati e risultato |
| **OUTPUT** | Cosa mi **CHIEDI**? | Il risultato da trovare o il messaggio da mostrare |

Tutto quello che non entra in nessuna casella è **RUMORE**: nomi, orari, colori, emozioni. Rende bella la storia, ma il computer non lo usa.

---

## 3. Il Metodo del Programmatore in 5 Passi

1. **Leggi due volte.** La prima volta per capire la storia, la seconda per cercare i dati.
2. **Evidenzia** con i colori o con i simboli (vedi sotto).
3. **Riformula** con una sola frase: *"Devo capire se…"*.
4. **Compila la scheda I-P-O** sul quaderno.
5. **Prova a mano** con i numeri del testo e poi con il **caso limite**.

> [!IMPORTANT]
> **Regola d'oro:** nessuna soluzione finché non hai completato i 5 passi.

---

## 4. Il Kit dell'Evidenziatore: Colori e Simboli

Chi ha gli evidenziatori usa **colore e simbolo insieme**. Chi non li ha usa **solo il simbolo**, con una penna qualsiasi.

| Cosa cerco | Colore | Simbolo (solo penna) | Come ricordarlo |
|---|---|---|---|
| **Dato (Input)** | Blu / azzurro | **Cerchio** intorno alla parola | Il cerchio *cattura* il dato |
| **Richiesta (Output)** | Rosso / rosa | **Doppia sottolineatura** | Due righe = il risultato, come in matematica |
| **Regola** | Giallo | **Sottolineatura a onda** 〰 | L'onda è il *bivio*: la strada cambia |
| **Rumore** | — | **Barrato** (una riga sopra) | Lo butto via |
| **Dato nascosto** | Blu | **★** a margine + scrivi il dato | Un tesoro che il testo non scrive |
| **Dato mancante** | — | **?** a margine + scrivi la domanda | Non lo inventi: lo chiedi |

---

## 5. Il Dizionario: Parole che Diventano Confronti

| Parola nel testo | Confronto | Esempio | Il numero della soglia è… |
|---|:---:|---|---|
| almeno | ≥ | "almeno 50 di metallo" | compreso |
| al massimo | ≤ | "al massimo 6 coloni" | compreso |
| più di / supera | > | "supera 120 km/h" | escluso |
| meno di / sotto | < | "meno di 40 punti" | escluso |
| fino a | ≤ | "resiste fino a 120 km/h" | compreso |
| basta / è sufficiente | ≥ | "il cibo basta" → scorte ≥ fabbisogno | compreso |
| esattamente / pari a | = | "esattamente 10 coloni" | solo quello |
| diverso da / tranne | ≠ | "tutti tranne il rover 2" | escluso |

**Il caso limite:** prova sempre con il numero *esatto* della soglia (50, 120, 10…). È lì che si nasconde il bug.

---

## 6. Le 4 Trappole del Testo

1. **Il rumore:** nomi, orari e perfino numeri che non servono (*"la serra ha perso il 40% delle piante"*).
2. **Il dato nascosto:** il testo non lo scrive, ma serve (*"per una settimana"* → ★ 7 giorni).
3. **Le parole-trappola:** "almeno" e "più di" sembrano uguali, ma sul caso limite danno risultati opposti.
4. **Il dato mancante:** un'informazione indispensabile non c'è. Non si inventa: si scrive **?** e la domanda da fare.

---

## 7. Esempio Svolto: Il Turno dell'Ossigeno

> *Sono le 6:40 del mattino nella Colonia Alpha-1 e la sirena del cambio turno ha appena suonato. Il tecnico Rossi, arrivato su Marte da appena tre settimane, controlla il pannello del generatore. Ogni colono consuma 3 unità di ossigeno al giorno. Il serbatoio contiene 40 unità e nella colonia vivono 12 coloni. Se l'ossigeno del serbatoio basta per tutta la giornata, il pannello deve mostrare "Respirate tranquilli"; altrimenti deve far scattare l'allarme rosso. Cosa deve mostrare il pannello oggi?*

* **Rumore (barrato):** le 6:40, la sirena, il tecnico Rossi, le tre settimane.
* **Dati (cerchio):** 3 unità a testa al giorno, 40 unità nel serbatoio, 12 coloni.
* **Richiesta (doppia riga):** cosa mostra il pannello ("Respirate tranquilli" oppure allarme rosso).
* **Regole (onda):** "se basta" → **≥**; "altrimenti".

| Scheda I-P-O | |
|---|---|
| **Riformulo** | "Devo capire se l'ossigeno basta per tutti i coloni di oggi." |
| **Input** | ossigeno nel serbatoio = 40 · coloni = 12 · consumo a testa = 3 |
| **Elaborazione** | fabbisogno = coloni × 3 · basta? → serbatoio ≥ fabbisogno |
| **Output** | "Respirate tranquilli" oppure allarme rosso |
| **Prova a mano** | 12 × 3 = 36 → 40 ≥ 36 VERO → "Respirate tranquilli". Caso limite: serbatoio = 36 → basta ancora |

---

## 8. Foglio dello Studente (da stampare)

Modalità: **a coppie**. Su questo foglio evidenzia il testo con colori o simboli. Sul quaderno scrivi la frase *"Devo capire se…"*, la scheda I-P-O e la prova a mano.

**Legenda:** ◯ dato · ═ richiesta · 〰 regola · ~~barrato~~ rumore · ★ dato nascosto · ? dato mancante

### Sfida 1: La Tempesta di Sabbia
Il radar meteo della base Tharsis segnala una tempesta di sabbia in arrivo da nord-ovest, a 380 chilometri di distanza. Le raffiche sollevano la polvere rossa fino a 2 chilometri di altezza. La comandante Okafor, al suo secondo anno di missione, posa il caffè liofilizzato e ordina di controllare gli scudi. Gli scudi della cupola resistono a venti fino a 120 km/h; il radar stima che la tempesta soffierà a 135 km/h. Se il vento supera la resistenza degli scudi, i coloni devono rifugiarsi nel bunker; altrimenti possono restare nelle cupole. Dove devono andare i coloni?

### Sfida 2: Razioni per la Settimana
La navetta cargo Ares-3 è atterrata ieri sera sulla pista n° 2, ma il comandante vuole sapere se il cibo in magazzino basta per una settimana intera, senza aspettare il prossimo rifornimento. Nella colonia vivono 10 coloni e ognuno mangia 2 razioni al giorno. Nel magazzino ci sono 150 razioni. Le razioni preferite dai coloni sono quelle alla soia affumicata. Se il cibo non basta, bisogna ordinare un rifornimento urgente dalla Terra. Serve il rifornimento?

### Sfida 3: La Fabbrica di Mattoni
Il consiglio della colonia ha votato all'unanimità: è arrivato il momento di accendere la nuova fabbrica di mattoni. Per partire, la fabbrica ha bisogno di almeno 50 unità di energia libera. La centrale solare produce 200 unità, mentre gli edifici già accesi ne consumano 150. Se l'energia libera è meno di 50, la fabbrica resta spenta e i muratori tornano a giocare a carte nella mensa; altrimenti la fabbrica si accende. La fabbrica si accende?

### Sfida 4: Il Nuovo Quartiere
Con l'ultima navetta sono arrivati 9 nuovi coloni che non hanno ancora un letto. Il sindaco Hernández, che ama i nomi poetici, ha già deciso di chiamare il nuovo quartiere "Valle dell'Alba". Ogni modulo abitativo ospita al massimo 6 coloni e costa 80 unità di metallo. Se il metallo in magazzino basta, si costruiscono tutti i moduli necessari; altrimenti i nuovi coloni dormono nella palestra della base. Quanti moduli servono? Si possono costruire?

### Sfida 5: Il Meteorite sulla Serra
Durante la lunga notte marziana, mentre la colonia dorme, un piccolo meteorite colpisce la serra idroponica. L'ingegnera capo Lindqvist, svegliata dall'allarme, corre a controllare in tuta pressurizzata: la serra ha perso il 40% delle piante e 4 pannelli di vetro sono in frantumi. Riparare un pannello costa 30 unità di metallo. Se il metallo in magazzino è almeno pari al costo della riparazione, la serra viene riparata subito; se invece non basta, la serra resta chiusa fino al prossimo rifornimento. In magazzino ci sono 100 unità di metallo. La serra verrà riparata?

### Scheda I-P-O da copiare sul quaderno (una per sfida)

| Sfida n° ___ | |
|---|---|
| **Riformulo** | Devo capire se ………………………………………… |
| **Input** (nome = valore) | |
| **Elaborazione** (calcoli e confronti) | |
| **Output** | |
| **Prova a mano** (+ caso limite) | |

---

## 9. Soluzioni per il Docente

### Sfida 1: La Tempesta di Sabbia — *trappola: rumore*
* **Rumore:** base Tharsis, nord-ovest, **380 km**, **2 km** di altezza, comandante Okafor, secondo anno, caffè.
* **Dati:** resistenza scudi = 120 km/h · vento = 135 km/h.
* **Regole:** "fino a" → ≤ (120 compreso); "supera" → vento > resistenza.
* **Output:** "Tutti nel bunker" oppure "Restate nelle cupole".
* **Prova:** 135 > 120 VERO → bunker. Caso limite: vento = 120 → 120 > 120 FALSO → si resta nelle cupole.

### Sfida 2: Razioni per la Settimana — *trappola: dato nascosto*
* **Rumore:** navetta Ares-3, pista n° 2, ieri sera, soia affumicata.
* **Dati:** coloni = 10 · razioni a testa al giorno = 2 · razioni in magazzino = 150 · **★ una settimana = 7 giorni**.
* **Regole:** "basta" → razioni ≥ fabbisogno; "non basta" → <.
* **Elaborazione:** fabbisogno = 10 × 2 × 7 = 140.
* **Prova:** 150 ≥ 140 VERO → nessun rifornimento. Senza il ★ si calcola 20 e si arriva alla stessa risposta per il motivo sbagliato: con 130 razioni il ★ fa scattare il rifornimento, il calcolo sbagliato no.

### Sfida 3: La Fabbrica di Mattoni — *trappola: parole-trappola e caso limite*
* **Rumore:** voto all'unanimità, muratori che giocano a carte.
* **Dati:** produzione = 200 · consumo = 150 · soglia = 50.
* **Regole:** "almeno 50" → libera ≥ 50; "meno di 50" → libera < 50 (le due regole sono complementari).
* **Prova:** 200 − 150 = 50 → 50 ≥ 50 VERO → la fabbrica **si accende**. Chi legge "più di 50" la lascia spenta.

### Sfida 4: Il Nuovo Quartiere — *trappola: dato mancante*
* **Rumore:** sindaco Hernández, nomi poetici, "Valle dell'Alba".
* **Dati:** coloni = 9 · posti per modulo = 6 · costo per modulo = 80 · **? metallo in magazzino: MANCA**.
* **Elaborazione:** 1 modulo = 6 posti (non basta) → servono 2 moduli → costo = 160 → metallo ≥ 160.
* **Risposta corretta:** "Servono 2 moduli, ma non posso dire se si possono costruire: devo chiedere quanto metallo c'è in magazzino." Esempio: con 200 → 200 ≥ 160 → si costruiscono.

### Sfida 5: Il Meteorite sulla Serra — *tutte le trappole*
* **Rumore:** notte marziana, ingegnera Lindqvist, tuta pressurizzata, **40% delle piante** (numero esca).
* **Dati:** pannelli rotti = 4 · costo a pannello = 30 · metallo = 100.
* **Regole:** "almeno pari" → metallo ≥ costo; "non basta" → <.
* **Prova:** 4 × 30 = 120 → 100 ≥ 120 FALSO → **serra chiusa**. Caso limite: metallo = 120 → riparata. Domanda bonus: quanto metallo manca? 120 − 100 = 20.

### Biglietto d'uscita: Il Rover Esploratore
> *Il rover Curiosity-2, verniciato di arancione, consuma 5 unità di energia per ogni uscita e ha la batteria carica a 18 unità. Il comandante vuole sapere se il rover può fare almeno 3 uscite prima di ricaricarsi.*

* **Rumore:** Curiosity-2, arancione. **Dati:** consumo = 5 a uscita · batteria = 18 · uscite = 3.
* **Prova:** 3 × 5 = 15 → 18 ≥ 15 VERO → sì, può fare 3 uscite.

---

## 10. Checklist del Programmatore

Prima di dire "ho capito", controlla con il compagno di banco:
- [ ] Ho letto il testo **due volte**?
- [ ] Ho **barrato** il rumore (anche i numeri che non servono)?
- [ ] Ogni dato ha un **nome** e un **valore**?
- [ ] Ho trovato la **richiesta** (doppia riga)?
- [ ] Ho cercato i **dati nascosti** (★) e quelli **mancanti** (?)?
- [ ] Ho tradotto le regole in **confronti** (≥, >, ≤, <, =, ≠)?
- [ ] Ho provato con i numeri del testo e con il **caso limite**?
