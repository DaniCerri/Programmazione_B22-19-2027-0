/* ==========================================================================
   APP.JS - CONTROLLER PRESENTAZIONE (LEZIONE 02: GLI ALGORITMI E LA SEQUENZA)
   Piazza dei Mestieri - Prima Superiore (A.F. 2026/2027)
   Navigazione, Slide Deck, Indice Dinamico, Stepper Sequenziale, Esercizi
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

  if (totalSlidesNum) totalSlidesNum.textContent = totalSlides;

  // Lettura hash URL iniziale (es. #3)
  const hashVal = parseInt(window.location.hash.replace('#', ''), 10);
  if (!isNaN(hashVal) && hashVal >= 1 && hashVal <= totalSlides) {
    currentSlide = hashVal;
  }

  // Titoli per l'indice (22 Diapositive)
  const slideTitles = [
    "01. Copertina: Gli Algoritmi",
    "02. La Mente Umana: Flessibile e Intuitiva",
    "03. Il Calcolatore: Rigido ed Esecutore",
    "04. Che cos'è un Algoritmo? (Definizione)",
    "05. I 3 Pilastri di Ogni Algoritmo",
    "06. Il Modello Universale: Input - Elaborazione - Output",
    "07. Esempio I-P-O: Il Perimetro del Rettangolo",
    "08. 1ª Proprietà: La Finitezza",
    "09. 2ª Proprietà: La Definitezza",
    "10. 3ª Proprietà: La Generalità",
    "11. 4ª Proprietà: L'Efficienza",
    "12. La Sequenza: L'Ordine è Legge",
    "13. Minecraft 3x3: L'Inventario Necessario",
    "14. Minecraft 3x3: I 10 Passi di Costruzione",
    "15. Il Toast alla Piastra: Gli Ingredienti",
    "16. Il Toast alla Piastra: I 10 Passi di Preparazione",
    "17. Esercizio 1: Media di 3 Voti (Sfida)",
    "18. Esercizio 1: La Soluzione del Docente",
    "19. Esercizio 2: Il Robot Disegnatore (Sfida)",
    "20. Esercizio 2: La Soluzione del Docente",
    "21. Errori Comuni: Omissioni e Inversioni",
    "22. Errori Comuni: Ambiguità e Hardcoding"
  ];

  function showSlide(index) {
    if (index < 1) index = 1;
    if (index > totalSlides) index = totalSlides;
    currentSlide = index;

    slides.forEach((slide, i) => {
      const slideNum = i + 1;
      if (slideNum === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (currentSlideNum) currentSlideNum.textContent = currentSlide;
    if (progressBar) {
      const progressPercent = totalSlides > 1 ? ((currentSlide - 1) / (totalSlides - 1)) * 100 : 100;
      progressBar.style.width = `${Math.max(progressPercent, (1 / totalSlides) * 100)}%`;
    }

    window.history.replaceState(null, null, `#${currentSlide}`);
    updateOverviewActiveThumb();
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      showSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      showSlide(currentSlide - 1);
    }
  }

  // Event Listeners Navigazione
  btnNext?.addEventListener('click', nextSlide);
  btnPrev?.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    if (overviewModal && !overviewModal.classList.contains('hidden') && (e.key === 'Escape' || e.key === 'o' || e.key === 'O')) {
      toggleOverview(false);
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault();
        prevSlide();
        break;

      case 'f':
      case 'F':
        toggleFullscreen();
        break;

      case 'o':
      case 'O':
        toggleOverview();
        break;

      case 'n':
      case 'N':
        toggleNotes();
        break;

      case 'p':
      case 'P':
        e.preventDefault();
        exportToPdf();
        break;

      case 'Home':
        showSlide(1);
        break;

      case 'End':
        showSlide(totalSlides);
        break;
    }
  });

  // Touch Swipe per LIM / Schermi Touchscreen
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }, { passive: true });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }
  btnFullscreen?.addEventListener('click', toggleFullscreen);

  function toggleNotes() {
    document.body.classList.toggle('show-notes');
    btnNotes?.classList.toggle('active');
  }
  btnNotes?.addEventListener('click', toggleNotes);

  function exportToPdf() {
    if (overviewModal && !overviewModal.classList.contains('hidden')) {
      toggleOverview(false);
    }
    setTimeout(() => {
      window.print();
    }, 150);
  }
  btnExportPdf?.addEventListener('click', exportToPdf);
  btnModalExportPdf?.addEventListener('click', exportToPdf);

  window.addEventListener('beforeprint', () => {
    if (overviewModal && !overviewModal.classList.contains('hidden')) {
      toggleOverview(false);
    }
  });

  // Costruzione dinamica dell'indice delle slide
  function buildOverviewGrid() {
    if (!overviewGrid) return;
    overviewGrid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      const thumb = document.createElement('div');
      thumb.className = `m3-thumb-card ${slideNum === currentSlide ? 'active-thumb' : ''}`;
      thumb.dataset.slide = slideNum;
      thumb.innerHTML = `
        <span class="thumb-idx">Slide ${slideNum < 10 ? '0' + slideNum : slideNum}</span>
        <span class="thumb-text">${slideTitles[idx] || 'Slide ' + slideNum}</span>
      `;
      thumb.addEventListener('click', () => {
        showSlide(slideNum);
        toggleOverview(false);
      });
      overviewGrid.appendChild(thumb);
    });
  }

  function updateOverviewActiveThumb() {
    if (!overviewGrid) return;
    const thumbs = overviewGrid.querySelectorAll('.m3-thumb-card');
    thumbs.forEach(thumb => {
      if (parseInt(thumb.dataset.slide, 10) === currentSlide) {
        thumb.classList.add('active-thumb');
      } else {
        thumb.classList.remove('active-thumb');
      }
    });
  }

  function toggleOverview(forceState) {
    if (!overviewModal) return;
    const isHidden = overviewModal.classList.contains('hidden');
    const shouldOpen = forceState !== undefined ? forceState : isHidden;
    if (shouldOpen) {
      overviewModal.classList.remove('hidden');
      btnOverview?.classList.add('active');
    } else {
      overviewModal.classList.add('hidden');
      btnOverview?.classList.remove('active');
    }
  }

  btnOverview?.addEventListener('click', () => toggleOverview());
  btnCloseOverview?.addEventListener('click', () => toggleOverview(false));

  // Cartiglio Istituzionale Material Design 3
  function attachCartigli() {
    slides.forEach((slide, idx) => {
      if (slide.querySelector('.slide-cartiglio')) return;
      const slideNum = idx + 1;
      const cartiglio = document.createElement('div');
      cartiglio.className = 'slide-cartiglio';
      cartiglio.innerHTML = `
        <div class="cartiglio-left">
          <span class="cartiglio-brand">Piazza dei Mestieri</span>
          <span class="cartiglio-divider">&bull;</span>
          <span class="cartiglio-course">Corso di Programmazione 1</span>
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
          <span class="cartiglio-num">${slideNum < 10 ? '0' + slideNum : slideNum} / ${totalSlides < 10 ? '0' + totalSlides : totalSlides}</span>
        </div>
      `;
      slide.appendChild(cartiglio);
    });
  }

  attachCartigli();
  buildOverviewGrid();
  showSlide(currentSlide);

  // --------------------------------------------------------------------------
  // LOGICA ESERCIZI: ACCORDION MOSTRA/NASCONDI SOLUZIONE
  // --------------------------------------------------------------------------
  window.toggleExerciseSolution = function(exId) {
    const content = document.getElementById(`solution-${exId}`);
    const btn = document.getElementById(`btn-solution-${exId}`);
    if (!content || !btn) return;

    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
      content.classList.remove('hidden');
      btn.innerHTML = `<span class="material-symbols-outlined">visibility_off</span><span>Nascondi Soluzione del Docente</span>`;
    } else {
      content.classList.add('hidden');
      btn.innerHTML = `<span class="material-symbols-outlined">visibility</span><span>Rivela Soluzione del Docente</span>`;
    }
  };
});
