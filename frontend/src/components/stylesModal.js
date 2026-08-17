// Componente Modular: Biblioteca de Estilos DYZRUPT
const GENRES = [
  "Hip Hop", "Trap", "Reggaeton", "Afrobeat", "EDM", "Salsa",
  "Jazz", "Reggae", "Pop", "R&B", "Country", "Folk", "Rock", "Blues"
];

const SENTIMENTS = [
  "Emocional", "Alegre", "Triste", "Enojado", "Agresivo", "Gentil",
  "Cálido", "Frío", "Festivo", "Nostálgico", "Romántico", "Apasionado"
];

let activeTab = 'genre';

function renderList(container, items, promptInput, modalOverlay) {
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'modal-list-item';
    div.innerHTML = `<span>${item}</span><span class="chevron">›</span>`;
    div.addEventListener('click', () => {
      if (promptInput) {
        const currentVal = promptInput.value.trim();
        promptInput.value = currentVal ? `${currentVal}, ${item}` : item;
      }
      modalOverlay.classList.remove('active');
    });
    container.appendChild(div);
  });
}

export function initStylesModal() {

  if (!document.getElementById('styles-modal-css')) {
    const style = document.createElement('style');
    style.id = 'styles-modal-css';
    style.innerHTML = `
      .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px); }
      .modal-overlay.active { display: flex !important; }
      .modal-container { background: #18181b; border: 1px solid #27272a; border-radius: 16px; width: 90%; max-width: 400px; max-height: 80vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
      .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #27272a; color: #fff; }
      .modal-header h2 { font-size: 1.1rem; font-weight: 600; margin: 0; }
      .modal-close-btn { background: none; border: none; color: #a1a1aa; font-size: 1.2rem; cursor: pointer; padding: 4px; }
      .modal-tabs { display: flex; border-bottom: 1px solid #27272a; background: #09090b; }
      .modal-tab { flex: 1; padding: 12px; background: none; border: none; color: #71717a; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; }
      .modal-tab.active { color: #a855f7; border-bottom-color: #a855f7; background: #18181b; }
      .modal-list { overflow-y: auto; padding: 8px; max-height: 300px; }
      .modal-list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; color: #e4e4e7; border-radius: 8px; cursor: pointer; margin-bottom: 4px; }
      .modal-list-item:active { background: #27272a; }
      .modal-list-item .chevron { color: #52525b; }
    `;
    document.head.appendChild(style);
  }

  if (!document.getElementById('styles-modal-overlay')) {
    const modalHTML = `
      <div id="styles-modal-overlay" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Biblioteca de Estilos</h2>
            <button id="close-styles-modal" class="modal-close-btn">✕</button>
          </div>
          <div class="modal-tabs">
            <button id="tab-genre" class="modal-tab active">Género</button>
            <button id="tab-sentiment" class="modal-tab">Sentimiento</button>
          </div>
          <div id="modal-list-content" class="modal-list"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modalOverlay = document.getElementById('styles-modal-overlay');
  const closeBtn = document.getElementById('close-styles-modal');
  const tabGenre = document.getElementById('tab-genre');
  const tabSentiment = document.getElementById('tab-sentiment');
  const listContainer = document.getElementById('modal-list-content');

  const updateList = () => {
    const promptInput = document.querySelector('textarea') || document.querySelector('#promptField') || document.querySelector('input');
    if (activeTab === 'genre') {
      tabGenre.classList.add('active');
      tabSentiment.classList.remove('active');
      renderList(listContainer, GENRES, promptInput, modalOverlay);
    } else {
      tabSentiment.classList.add('active');
      tabGenre.classList.remove('active');
      renderList(listContainer, SENTIMENTS, promptInput, modalOverlay);
    }
  };

  document.addEventListener('click', (e) => {
    const triggerBtn = e.target.closest('#styles-library-trigger');
    if (triggerBtn) {
      e.preventDefault();
      modalOverlay.classList.add('active');
      updateList();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
    }
  });

  if (tabGenre) tabGenre.addEventListener('click', () => { activeTab = 'genre'; updateList(); });
  if (tabSentiment) tabSentiment.addEventListener('click', () => { activeTab = 'sentiment'; updateList(); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStylesModal);
} else {
  initStylesModal();
}
