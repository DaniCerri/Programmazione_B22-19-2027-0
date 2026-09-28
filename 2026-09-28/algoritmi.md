# Lezione 02: Gli Algoritmi e la Struttura Sequenziale
**Data:** 28 Settembre 2026  
**Corso:** Programmazione 1 (Prima Superiore — Operatore Informatico)  
**Docente:** Daniele Cerrina (`daniele.cerrina@immaginazioneelavoro.it`)  
**Sede:** Piazza dei Mestieri (Torino)

---

## 1. Che cos'è un Algoritmo?

Un **algoritmo** è una sequenza **finita** e **ordinata** di istruzioni elementari, chiare e **non ambigue**, la cui esecuzione porta alla risoluzione esatta di un determinato problema.

* **Sequenza ordinata:** l'ordine cronologico dei passi è vincolante; scambiare due istruzioni altera il risultato o blocca l'esecuzione.
* **Istruzioni elementari:** passi atomici che l'esecutore (umano o macchina) sa compiere senza dubbi né interpretazioni soggettive.
* **Problema e Soluzione:** l'algoritmo parte da una condizione iniziale (Input) e produce un risultato concreto (Output).

---

## 2. Il Modello Fondamentale I-P-O

Ogni elaborazione informatica si fonda su tre momenti:

```
[ INPUT ]  ------------>  [ ELABORAZIONE ]  ------------>  [ OUTPUT ]
(Dati di ingresso)      (Sequenza di calcoli)           (Risultato finale)
```

1. **INPUT (Dati in ingresso):** Le informazioni fornite al sistema (valori digitati dall'utente, misure, prezzi).
2. **ELABORAZIONE (Process):** La serie ordinata di calcoli matematici e trasformazioni eseguite dal calcolatore passo dopo passo.
3. **OUTPUT (Dati in uscita):** Il risultato restituito (testo a video, totale stampato, disegno completato).

---

## 3. Le Proprietà Fondamentali di un Algoritmo

Per essere formalmente **corretto**, un algoritmo deve soddisfare quattro requisiti:

1. **Finitezza:** La sequenza deve sempre terminare dopo un numero finito di operazioni.
2. **Definitezza (Non Ambiguità):** Ogni istruzione deve avere un solo significato univoco.
   * *Ambiguo (Errato):* "Aggiungi un po' di zucchero", "Cammina un po'".
   * *Definito (Corretto):* "Aggiungi 5 grammi di zucchero", "Compi 10 passi avanti".
3. **Generalità:** L'algoritmo non deve risolvere solo un singolo calcolo con dati fissi (*hardcoded*), ma deve saper risolvere **qualsiasi problema appartenente a quella specifica classe** (es. calcolare la media di *qualsiasi* terna di voti).
4. **Efficienza:** Risolvere il problema impiegando una quantità ragionevole di passaggi e risorse. *(Nota: in prima superiore la priorità è al 100% sulla correttezza logica).*

---

## 4. La Struttura Fondamentale: La Sequenza Pura

Nelle prime settimane di laboratorio lavoreremo esclusivamente sulla **sequenza lineare**:
* Le istruzioni vengono eseguite rigidamente **dall'alto verso il basso**, una dietro l'altra.
* Non ci sono bivi condizionali né ripetizioni: ogni riga viene eseguita esattamente una volta.
* **L'ordine temporale è tassativo:** non è possibile utilizzare o elaborare un dato prima di averlo letto o calcolato!

---

## 5. Esempi Svolti dal Docente

### Esempio 1: Costruire una Casa di Terra 3x3 in Minecraft (Tutorial Gaming)
* **Input (Inventario):** 33 blocchi di terra (`dirt`), 1 porta di legno, 1 torcia, 1 letto, 1 fornace, 1 crafting table.
* **Output:** Rifugio 3x3 chiuso, illuminato e arredato per superare la notte.

```text
01. posiziona_perimetro_base_terra(8)      # 8 blocchi, lascia 1 vuoto per la porta
02. innalza_muri_secondo_livello(8)
03. innalza_muri_terzo_livello(8)
04. copri_soffitto_con_terra(9)            # Tetto chiuso 3x3
05. posiziona_porta_di_legno()             # Sigilla l'ingresso
06. attacca_torcia_su_parete()             # Luce anti-spawn mostri
07. posiziona_letto_in_angolo()            # Imposta spawn point
08. posiziona_fornace()
09. posiziona_crafting_table()
10. chiudi_porta_e_dormi()                 # Notte superata con successo!
```

*Perché l'ordine è legge?* Se provi a piazzare la torcia o il tetto prima di aver innalzato i muri di terra, non hai un supporto solido su cui posizionarli. Se metti il letto all'esterno prima di chiudere i muri, verrai eliminato da un mostro prima dell'alba!

---

### Esempio 2: Preparare un Toast Farcito alla Piastra (Vita Quotidiana)
* **Input:** 2 fette di pane da toast, 2 fette di formaggio, 1 fetta di prosciutto cotto, piastra elettrica, 1 piatto.
* **Output:** Toast caldo e dorato con formaggio fuso pronto sul piatto.

```text
01. Appoggia le due fette di pane sul tagliere pulito
02. Adagia la prima fetta di formaggio sulla fetta di pane inferiore
03. Aggiungi la fetta di prosciutto cotto sopra il formaggio
04. Adagia la seconda fetta di formaggio sopra il prosciutto
05. Chiudi il toast sovrapponendo la seconda fetta di pane
06. Accendi la piastra elettrica e attendi che sia calda
07. Posiziona il toast sulla piastra e chiudi il coperchio
08. Attendi 3 minuti per la tostatura
09. Apri la piastra e preleva il toast con una paletta
10. Adagia il toast dorato sul piatto e servilo caldo
```

*Perché l'ordine è fondamentale?* Se metti il formaggio sulla piastra prima del pane, il formaggio brucia e fa fumo! Se provi a tostarlo prima di accendere la piastra, il pane resta crudo.

---

## 6. Esercizi di Laboratorio da Svolgere su Carta

### Esercizio 1: Calcolo della Media di 3 Voti Scolastici
**Problema:** Uno studente ha ottenuto 3 voti in informatica: `7`, `8`, `6`.  
Scrivi sul quaderno la sequenza lineare in italiano chiaro che calcola e restituisce la media esatta.

```text
# SCRIVI SUL TUO QUADERNO:
Input: ...
Passo 1: ...
Passo 2: ...
Passo 3: ...
Output: ...
```

---

### Esercizio 2: Il Robot Disegnatore (Il Quadrato)
**Problema:** Un robot su una lavagna digitale comprende solo due semplici istruzioni in italiano:
* **"Avanza di 100 passi tracciando una linea dritta"**
* **"Gira a destra di 90 gradi"**

Scrivi sul quaderno la sequenza esatta di 8 istruzioni per far disegnare al robot un quadrato chiuso e farlo tornare orientato come in partenza.

```text
# SCRIVI SUL TUO QUADERNO:
Passo 1: ...
Passo 2: ...
Passo 3: ...
Passo 4: ...
Passo 5: ...
Passo 6: ...
Passo 7: ...
Passo 8: ...
```

---

## 7. I 4 Errori Tipici della Sequenza

1. **Dare per scontato l'ovvio:** saltare un passaggio intermedio fondamentale per la macchina.
2. **Passi Invertiti:** provare a calcolare il totale prima di aver letto i dati in ingresso.
3. **Istruzioni Ambigue:** usare termini vaghi come "un po'" invece di numeri e misure esatte.
4. **Soluzioni Cablate ("Hardcoded"):** scrivere il risultato già calcolato a mente anziché la formula generale.
