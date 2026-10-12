/* ==========================================================================
   APP.JS - CONTROLLER PRESENTAZIONE (LEZIONE 04: CAPIRE IL PROBLEMA)
   Piazza dei Mestieri - A.F. 2026/2027
   Docente: Daniele Cerrina

   Novità rispetto alle lezioni precedenti:
   - Slide annotate a PASSI (attributo data-steps sulla <section>): gli
     elementi con data-step="n" compaiono uno alla volta. Avanti/Spazio
     rivela il passo successivo prima di cambiare slide.
   - In stampa/PDF ogni slide annotata esce con TUTTI i passi rivelati,
     mentre la slide gemella "testo pulito" resta senza annotazioni.
   - Titoli dell'indice letti dall'attributo data-title di ogni slide.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  const progressBar = document.getElementById('progressBar');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnOverview = document.getElementById('btnOverview');
  const btnNotes = document.getElementById('btnNotes');
  const btnExportPdf = document.getElementById('btnExportPdf');
  const btnModalExportPdf = document.getElementById('btnModalExportPdf');

  const overviewModal = document.getElementById('overviewModal');
  const overviewGrid = document.getElementById('overviewGrid');
  const btnCloseOverview = document.getElementById('btnCloseOverview');

  const courseName = document.body.dataset.course || 'Corso di Programmazione';

  if (totalSlidesNum) totalSlidesNum.textContent = totalSlides;

  // Lettura hash URL iniziale (es. #3)
  const hashVal = parseInt(window.location.hash.replace('#', ''), 10);
  if (!isNaN(hashVal) && hashVal >= 1 && hashVal <= totalSlides) {
    currentSlide = hashVal;
  }

  // --------------------------------------------------------------------------
  // PASSI DI ANNOTAZIONE (evidenziatore digitale)
  // --------------------------------------------------------------------------
  const stepState = new Map();

  function maxSteps(slide) {
    return parseInt(slide.dataset.steps || '0', 10);
  }

  function applySteps(slide, n) {
    const max = maxSteps(slide);
    if (!max) return;
    n = Math.max(0, Math.min(n, max));
    stepState.set(slide, n);

    slide.querySelectorAll('[data-step]').forEach((el) => {
      el.classList.toggle('on', parseInt(el.dataset.step, 10) <= n);
    });

    slide.querySelectorAll('.step-chip').forEach((chip) => {
      const k = parseInt(chip.dataset.goto, 10);
      chip.classList.toggle('done', k <= n);
      chip.classList.toggle('current', k === n);
    });
  }

  function currentSteps(slide) {
    return stepState.get(slide) || 0;
  }

  // Barra dei passi generata da JS: <div class="step-bar" data-last-label="...">
  const STEP_LABELS = [
    { cat: 'noise', label: 'Rumore', sym: '—' },
    { cat: 'in', label: 'Dati', sym: '◯' },
    { cat: 'out', label: 'Richiesta', sym: '═' },
    { cat: 'rule', label: 'Regole', sym: '〰' },
    { cat: 'ipo', label: 'Scheda I-P-O', sym: '' },
    { cat: 'test', label: 'Prova a mano', sym: '' }
  ];

  function buildStepBar(slide) {
    const bar = slide.querySelector('.step-bar');
    if (!bar) return;
    const labels = STEP_LABELS.slice(0, maxSteps(slide));
    if (bar.dataset.lastLabel) {
      labels[labels.length - 1] = { ...labels[labels.length - 1], label: bar.dataset.lastLabel };
    }
    const chips = labels.map((s, i) => `
      <button class="step-chip" data-goto="${i + 1}" data-cat="${s.cat}">
        <span class="chip-num">${i + 1}</span>${s.label}${s.sym ? ` <span class="chip-sym">${s.sym}</span>` : ''}
      </button>`).join('');
    bar.innerHTML = `
      <div class="step-chips">${chips}</div>
      <div class="step-controls">
        <button class="m3-btn m3-btn-outlined" data-step-action="prev" title="Nascondi l'ultimo passo (&larr;)">
          <span class="material-symbols-outlined">undo</span>
        </button>
        <button class="m3-btn m3-btn-filled" data-step-action="next" title="Rivela il passo successivo (&rarr; / Spazio)">
          <span class="material-symbols-outlined">ink_highlighter</span>
          <span>Passo</span>
        </button>
        <button class="m3-btn m3-btn-outlined" data-step-action="all" title="Mostra tutto (A)">
          <span class="material-symbols-outlined">done_all</span>
        </button>
        <button class="m3-btn m3-btn-outlined" data-step-action="reset" title="Azzera le annotazioni (Z)">
          <span class="material-symbols-outlined">restart_alt</span>
        </button>
      </div>
    `;
  }

  slides.forEach((slide) => {
    if (!maxSteps(slide)) return;
    buildStepBar(slide);
    applySteps(slide, 0);

    slide.querySelectorAll('.step-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const k = parseInt(chip.dataset.goto, 10);
        // Clic sul passo già attivo: torna al passo precedente
        applySteps(slide, currentSteps(slide) === k ? k - 1 : k);
      });
    });

    slide.querySelectorAll('[data-step-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.stepAction;
        const n = currentSteps(slide);
        if (action === 'next') applySteps(slide, n + 1);
        if (action === 'prev') applySteps(slide, n - 1);
        if (action === 'all') applySteps(slide, maxSteps(slide));
        if (action === 'reset') applySteps(slide, 0);
      });
    });
  });

  // In stampa: tutti i passi rivelati; dopo la stampa si ripristina lo stato
  let savedSteps = null;
  window.addEventListener('beforeprint', () => {
    savedSteps = new Map(stepState);
    slides.forEach((slide) => {
      if (maxSteps(slide)) applySteps(slide, maxSteps(slide));
    });
  });
  window.addEventListener('afterprint', () => {
    if (!savedSteps) return;
    savedSteps.forEach((n, slide) => applySteps(slide, n));
    savedSteps = null;
  });

  // --------------------------------------------------------------------------
  // NAVIGAZIONE
  // --------------------------------------------------------------------------
  function showSlide(index, revealAll = false) {
    if (index < 1) index = 1;
    if (index > totalSlides) index = totalSlides;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i + 1 === currentSlide);
    });

    const active = slides[currentSlide - 1];
    if (maxSteps(active)) {
      applySteps(active, revealAll ? maxSteps(active) : 0);
    }

    if (currentSlideNum) currentSlideNum.textContent = currentSlide;
    if (progressBar) {
      const progressPercent = totalSlides > 1 ? ((currentSlide - 1) / (totalSlides - 1)) * 100 : 100;
      progressBar.style.width = `${Math.max(progressPercent, (1 / totalSlides) * 100)}%`;
    }

    window.history.replaceState(null, null, `#${currentSlide}`);
    updateOverviewActiveThumb();
  }

  // Avanti: prima rivela il passo successivo, poi cambia slide
  function nextSlide() {
    const active = slides[currentSlide - 1];
    if (maxSteps(active) && currentSteps(active) < maxSteps(active)) {
      applySteps(active, currentSteps(active) + 1);
      return;
    }
    if (currentSlide < totalSlides) showSlide(currentSlide + 1);
  }

  // Indietro: prima nasconde l'ultimo passo, poi torna alla slide precedente
  function prevSlide() {
    const active = slides[currentSlide - 1];
    if (maxSteps(active) && currentSteps(active) > 0) {
      applySteps(active, currentSteps(active) - 1);
      return;
    }
    if (currentSlide > 1) showSlide(currentSlide - 1, true);
  }

  btnNext?.addEventListener('click', nextSlide);
  btnPrev?.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (overviewModal && !overviewModal.classList.contains('hidden')) {
      if (e.key === 'Escape' || e.key === 'o' || e.key === 'O') {
        toggleOverview();
      }
      return;
    }

    const active = slides[currentSlide - 1];

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'Backspace':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        showSlide(1);
        break;
      case 'End':
        e.preventDefault();
        showSlide(totalSlides);
        break;
      case 'a':
      case 'A':
        if (maxSteps(active)) applySteps(active, maxSteps(active));
        break;
      case 'z':
      case 'Z':
        if (maxSteps(active)) applySteps(active, 0);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'o':
      case 'O':
      case 'Escape':
        toggleOverview();
        break;
      case 'n':
      case 'N':
        toggleNotes();
        break;
      case 'p':
      case 'P':
        window.print();
        break;
      default:
        break;
    }
  });

  // Schermo intero
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  btnFullscreen?.addEventListener('click', toggleFullscreen);

  // Note Docente
  function toggleNotes() {
    document.body.classList.toggle('show-notes');
  }
  btnNotes?.addEventListener('click', toggleNotes);

  // Esporta / Stampa PDF
  btnExportPdf?.addEventListener('click', () => window.print());
  btnModalExportPdf?.addEventListener('click', () => {
    toggleOverview();
    window.print();
  });

  // --------------------------------------------------------------------------
  // INDICE (OVERVIEW)
  // --------------------------------------------------------------------------
  function buildOverviewGrid() {
    if (!overviewGrid) return;
    overviewGrid.innerHTML = '';

    slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      const thumb = document.createElement('div');
      thumb.className = `overview-thumb ${slideNum === currentSlide ? 'active' : ''}`;
      thumb.dataset.slide = slideNum;
      thumb.innerHTML = `
        <span class="thumb-num">${String(slideNum).padStart(2, '0')}</span>
        <span class="thumb-title">${slide.dataset.title || `Slide ${slideNum}`}</span>
      `;
      thumb.addEventListener('click', () => {
        showSlide(slideNum);
        toggleOverview();
      });
      overviewGrid.appendChild(thumb);
    });
  }

  function updateOverviewActiveThumb() {
    if (!overviewGrid) return;
    overviewGrid.querySelectorAll('.overview-thumb').forEach((thumb) => {
      thumb.classList.toggle('active', parseInt(thumb.dataset.slide, 10) === currentSlide);
    });
  }

  function toggleOverview() {
    if (!overviewModal) return;
    if (overviewModal.classList.contains('hidden')) {
      buildOverviewGrid();
      overviewModal.classList.remove('hidden');
    } else {
      overviewModal.classList.add('hidden');
    }
  }

  btnOverview?.addEventListener('click', toggleOverview);
  btnCloseOverview?.addEventListener('click', toggleOverview);
  overviewModal?.addEventListener('click', (e) => {
    if (e.target === overviewModal) toggleOverview();
  });

  // --------------------------------------------------------------------------
  // TOUCH SWIPE PER LIM
  // --------------------------------------------------------------------------
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // IMMAGINI PIXEL ART: segnaposto se il file non è ancora stato generato
  // --------------------------------------------------------------------------
  document.querySelectorAll('.pixel-art-img').forEach((img) => {
    const markMissing = () => img.closest('.pixel-art-img-wrap')?.classList.add('img-missing');
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  // --------------------------------------------------------------------------
  // CARTIGLIO ISTITUZIONALE
  // --------------------------------------------------------------------------
  slides.forEach((slide, idx) => {
    const pad = (n) => String(n).padStart(2, '0');
    const cartiglio = document.createElement('div');
    cartiglio.className = 'slide-cartiglio';
    cartiglio.innerHTML = `
      <div class="cartiglio-left">
        <span class="cartiglio-brand">Piazza dei Mestieri</span>
        <span class="cartiglio-divider">&bull;</span>
        <span class="cartiglio-course">${courseName}</span>
        <span class="cartiglio-divider">&bull;</span>
        <span class="cartiglio-year">A.F. 2026 / 2027</span>
      </div>
      <div class="cartiglio-right">
        <span class="cartiglio-teacher">
          <span class="material-symbols-outlined icon-mini">person</span>
          Daniele Cerrina
        </span>
        <span class="cartiglio-divider">&bull;</span>
        <a href="mailto:daniele.cerrina@immaginazioneelavoro.it" class="cartiglio-mail">
          <span class="material-symbols-outlined icon-mini">mail</span>
          daniele.cerrina@immaginazioneelavoro.it
        </a>
        <span class="cartiglio-divider">&bull;</span>
        <span class="cartiglio-num">${pad(idx + 1)} / ${pad(totalSlides)}</span>
      </div>
    `;
    const notes = slide.querySelector('.speaker-notes');
    slide.insertBefore(cartiglio, notes);
  });

  showSlide(currentSlide);
});
