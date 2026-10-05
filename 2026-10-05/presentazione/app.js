/* ==========================================================================
   APP.JS - CONTROLLER PRESENTAZIONE (LEZIONE 03: LE CONDIZIONI NEL CITY BUILDER)
   Piazza dei Mestieri - Prima Superiore (A.F. 2026/2027)
   Docente: Daniele Cerrina
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

  // Titoli per l'indice (16 Diapositive - Mars City Builder Lite)
  const slideTitles = [
    "01. Copertina: Il City Builder Marziano",
    "02. Perché un Gestionale ha Bisogno di Bivi?",
    "03. Cos'è una Condizione? Solo VERO o FALSO",
    "04. I 6 Operatori Relazionali di Confronto",
    "05. Il Bug #1: Assegnazione (=) vs Confronto (==)",
    "06. La Selezione a Due Vie: SE - ALLORA - ALTRIMENTI",
    "07. La Selezione a Una Via: SE - ALLORA (Senza Else)",
    "08. Pattern City Builder: Verifica, Spesa, Feedback",
    "09. I Diagrammi a Blocchi: Forme Geometriche (Flow Chart)",
    "10. Esempio Svolto: Costruzione Cupola Idroponica",
    "11. Esempio Svolto: Flow Chart & Pseudocodice Risolto",
    "12. Esercizio 1: Bilancio Energetico della Colonia",
    "13. Esercizio 2: Nuovi Coloni & Razioni di Cibo",
    "14. Esercizio 3: Indice di Felicità (3 Scenari)",
    "15. I 3 Errori Tipici nei Flow Chart & Algoritmi",
    "16. Regole del Laboratorio: Solo Algoritmi su Carta"
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

  // Navigazione da tastiera
  document.addEventListener('keydown', (e) => {
    if (overviewModal && !overviewModal.classList.contains('hidden')) {
      if (e.key === 'Escape' || e.key === 'o' || e.key === 'O') {
        toggleOverview();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
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
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  btnFullscreen?.addEventListener('click', toggleFullscreen);

  // Note Docente
  function toggleNotes() {
    document.body.classList.toggle('show-notes');
  }
  btnNotes?.addEventListener('click', toggleNotes);

  // Esporta / Stampa PDF
  function handleExportPdf() {
    window.print();
  }
  btnExportPdf?.addEventListener('click', handleExportPdf);
  btnModalExportPdf?.addEventListener('click', handleExportPdf);

  // Modal Panoramica (Indice)
  function buildOverviewGrid() {
    if (!overviewGrid) return;
    overviewGrid.innerHTML = '';

    slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      const thumb = document.createElement('div');
      thumb.className = `overview-thumb ${slideNum === currentSlide ? 'active' : ''}`;
      thumb.dataset.slide = slideNum;

      const title = slideTitles[idx] || `Slide ${slideNum}`;

      thumb.innerHTML = `
        <div class="thumb-header">
          <span class="thumb-num">${slideNum}</span>
          <span class="material-symbols-outlined thumb-icon">apartment</span>
        </div>
        <div class="thumb-title">${title}</div>
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
    const thumbs = overviewGrid.querySelectorAll('.overview-thumb');
    thumbs.forEach((thumb) => {
      const sNum = parseInt(thumb.dataset.slide, 10);
      if (sNum === currentSlide) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  function toggleOverview() {
    if (!overviewModal) return;
    const isHidden = overviewModal.classList.contains('hidden');
    if (isHidden) {
      buildOverviewGrid();
      overviewModal.classList.remove('hidden');
    } else {
      overviewModal.classList.add('hidden');
    }
  }

  btnOverview?.addEventListener('click', toggleOverview);
  btnCloseOverview?.addEventListener('click', toggleOverview);

  overviewModal?.addEventListener('click', (e) => {
    if (e.target === overviewModal) {
      toggleOverview();
    }
  });

  // Touch Swipe per LIM
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Tasti per mostrare/nascondere soluzioni
  document.querySelectorAll('.reveal-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('hidden');
          const isNowHidden = targetEl.classList.contains('hidden');
          btn.querySelector('span:last-child').textContent = isNowHidden ? 'Mostra Soluzione' : 'Nascondi Soluzione';
        }
      }
    });
  });

  showSlide(currentSlide);
});
