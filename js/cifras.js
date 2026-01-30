/**
 * MusicaViva - Cifras Page JavaScript
 * Functionality for the cifras/chords page
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initCifraSearch();
    initCifraFilters();
    initCifraModal();
    initChordPopup();
    initFavorites();
    initTranspose();
});

// ============================================
// Cifra Search
// ============================================
function initCifraSearch() {
    const searchInput = document.getElementById('cifra-search-input');
    const clearBtn = document.querySelector('.cifras-search__clear');
    const cifraItems = document.querySelectorAll('.cifra-item');
    const resultsCount = document.getElementById('results-count');

    if (!searchInput) return;

    const filterCifras = () => {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cifraItems.forEach(item => {
            const title = item.querySelector('.cifra-item__title')?.textContent.toLowerCase() || '';
            const artist = item.querySelector('.cifra-item__artist')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(query) || artist.includes(query);
            item.style.display = matches ? '' : 'none';
            
            if (matches) visibleCount++;
        });

        if (resultsCount) {
            resultsCount.textContent = visibleCount;
        }

        // Toggle clear button visibility
        if (clearBtn) {
            clearBtn.hidden = query.length === 0;
        }
    };

    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterCifras, 200);
    });

    clearBtn?.addEventListener('click', () => {
        searchInput.value = '';
        filterCifras();
        searchInput.focus();
    });
}

// ============================================
// Cifra Filters
// ============================================
function initCifraFilters() {
    const filterTags = document.querySelectorAll('.cifras-tag');
    const genreSelect = document.getElementById('filter-genre');
    const difficultySelect = document.getElementById('filter-difficulty');
    const sortSelect = document.getElementById('filter-sort');
    const cifraItems = document.querySelectorAll('.cifra-item');
    const resultsCount = document.getElementById('results-count');

    const applyFilters = () => {
        const activeTag = document.querySelector('.cifras-tag--active');
        const genreFilter = activeTag?.dataset.filter || genreSelect?.value || 'all';
        const difficultyFilter = difficultySelect?.value || '';
        
        let visibleCount = 0;
        const itemsArray = Array.from(cifraItems);

        itemsArray.forEach(item => {
            const genre = item.dataset.genre || '';
            const difficulty = item.dataset.difficulty || '';
            
            const matchesGenre = genreFilter === 'all' || genre === genreFilter;
            const matchesDifficulty = !difficultyFilter || difficulty === difficultyFilter;
            
            const isVisible = matchesGenre && matchesDifficulty;
            item.style.display = isVisible ? '' : 'none';
            
            if (isVisible) visibleCount++;
        });

        if (resultsCount) {
            resultsCount.textContent = visibleCount;
        }

        // Apply sorting
        const sortValue = sortSelect?.value || 'popular';
        sortCifras(itemsArray, sortValue);
    };

    // Tag filter clicks
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('cifras-tag--active'));
            tag.classList.add('cifras-tag--active');
            
            // Sync with select
            if (genreSelect) {
                genreSelect.value = tag.dataset.filter === 'all' ? '' : tag.dataset.filter;
            }
            
            applyFilters();
        });
    });

    // Select filters
    genreSelect?.addEventListener('change', () => {
        filterTags.forEach(t => t.classList.remove('cifras-tag--active'));
        const matchingTag = document.querySelector(`.cifras-tag[data-filter="${genreSelect.value || 'all'}"]`);
        matchingTag?.classList.add('cifras-tag--active');
        applyFilters();
    });

    difficultySelect?.addEventListener('change', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);
}

function sortCifras(items, sortBy) {
    const container = document.getElementById('cifras-grid');
    if (!container) return;

    const sortedItems = items.filter(item => item.style.display !== 'none');
    
    sortedItems.sort((a, b) => {
        const titleA = a.querySelector('.cifra-item__title')?.textContent || '';
        const titleB = b.querySelector('.cifra-item__title')?.textContent || '';
        const viewsA = parseViews(a.querySelector('.cifra-item__views')?.textContent || '0');
        const viewsB = parseViews(b.querySelector('.cifra-item__views')?.textContent || '0');

        switch (sortBy) {
            case 'az':
                return titleA.localeCompare(titleB, 'pt-BR');
            case 'za':
                return titleB.localeCompare(titleA, 'pt-BR');
            case 'popular':
            default:
                return viewsB - viewsA;
        }
    });

    sortedItems.forEach(item => container.appendChild(item));
}

function parseViews(viewsText) {
    const num = parseFloat(viewsText.replace(/[^0-9.k]/gi, ''));
    return viewsText.toLowerCase().includes('k') ? num * 1000 : num;
}

// ============================================
// Cifra Modal
// ============================================
function initCifraModal() {
    const modal = document.getElementById('cifra-modal');
    const modalOverlay = modal?.querySelector('.cifra-modal__overlay');
    const closeBtn = modal?.querySelector('.cifra-modal__close');
    const viewBtns = document.querySelectorAll('.cifra-item__view');

    if (!modal) return;

    // Cifra data (in a real app, this would come from an API)
    const cifrasData = {
        'evidencias': {
            title: 'Evidências',
            artist: 'Chitãozinho & Xororó',
            key: 'C',
            content: `<span class="chord">C</span>                    <span class="chord">Am</span>
Quando eu digo que deixei de te amar
<span class="chord">F</span>                    <span class="chord">G</span>
É porque eu te amo
<span class="chord">C</span>                    <span class="chord">Am</span>
Quando eu digo que não quero mais você
<span class="chord">F</span>                    <span class="chord">G</span>
É porque eu te quero

<span class="chord">F</span>                    <span class="chord">G</span>
Eu tenho medo de te dar meu coração
<span class="chord">C</span>                    <span class="chord">Am</span>
E confessar que eu estou em tuas mãos
<span class="chord">F</span>                    <span class="chord">G</span>
Mas não posso imaginar o que vai ser de mim
<span class="chord">C</span>                    <span class="chord">G</span>
Se eu não te ver

<span class="chord">C</span>              <span class="chord">G</span>
Evidências
<span class="chord">Am</span>                    <span class="chord">F</span>
Não adianta nem tentar me esquecer
<span class="chord">C</span>                    <span class="chord">G</span>
Durante muito tempo em sua vida
<span class="chord">Am</span>                    <span class="chord">F</span>
Eu vou viver`,
            chords: ['C', 'Am', 'F', 'G']
        },
        'pais-e-filhos': {
            title: 'Pais e Filhos',
            artist: 'Legião Urbana',
            key: 'G',
            content: `<span class="chord">G</span>              <span class="chord">Am</span>
Estátuas e cofres
<span class="chord">C</span>                 <span class="chord">G</span>
E paredes pintadas
<span class="chord">G</span>              <span class="chord">Am</span>
Ninguém sabe o que aconteceu
<span class="chord">C</span>                    <span class="chord">G</span>
Ela se jogou da janela do quinto andar

<span class="chord">G</span>                 <span class="chord">Am</span>
Nada é fácil de entender
<span class="chord">C</span>                    <span class="chord">G</span>
Dorme agora, é só o vento lá fora

<span class="chord">Em</span>              <span class="chord">C</span>
Quero colo, vou dormir
<span class="chord">G</span>              <span class="chord">D</span>
Tô cansado de brincar
<span class="chord">Em</span>                    <span class="chord">C</span>
Quero um sorriso seu, só pra poder descansar`,
            chords: ['G', 'Am', 'C', 'Em', 'D']
        },
        'perfect': {
            title: 'Perfect',
            artist: 'Ed Sheeran',
            key: 'G',
            content: `<span class="chord">G</span>                    <span class="chord">Em</span>
I found a love for me
<span class="chord">C</span>                              <span class="chord">D</span>
Darling, just dive right in and follow my lead
<span class="chord">G</span>                              <span class="chord">Em</span>
Well, I found a girl, beautiful and sweet
<span class="chord">C</span>                                          <span class="chord">D</span>
Oh, I never knew you were the someone waiting for me

<span class="chord">G</span>
'Cause we were just kids when we fell in love
<span class="chord">Em</span>
Not knowing what it was
<span class="chord">C</span>                    <span class="chord">D</span>
I will not give you up this time

<span class="chord">G</span>              <span class="chord">Em</span>
Baby, I'm dancing in the dark
<span class="chord">C</span>              <span class="chord">D</span>
With you between my arms
<span class="chord">G</span>              <span class="chord">Em</span>
Barefoot on the grass
<span class="chord">C</span>              <span class="chord">D</span>
Listening to our favorite song`,
            chords: ['G', 'Em', 'C', 'D']
        }
    };

    const openModal = (cifraId) => {
        const cifra = cifrasData[cifraId];
        if (!cifra) {
            // Default content for cifras without data
            return;
        }

        // Populate modal
        modal.querySelector('.cifra-modal__title').textContent = cifra.title;
        modal.querySelector('.cifra-modal__artist').textContent = cifra.artist;
        modal.querySelector('#current-key').textContent = cifra.key;
        modal.querySelector('#cifra-content').innerHTML = cifra.content;
        
        // Populate chords used
        const chordList = modal.querySelector('.cifra-modal__chord-list');
        if (chordList) {
            chordList.innerHTML = cifra.chords.map(chord => 
                `<button class="cifra-modal__chord" data-chord="${chord}">${chord}</button>`
            ).join('');
        }

        // Show modal
        modal.hidden = false;
        document.body.classList.add('modal-open');

        // Store current key for transpose
        modal.dataset.originalKey = cifra.key;
        modal.dataset.currentKey = cifra.key;
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
    };

    // Event listeners
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cifraId = btn.dataset.cifra;
            openModal(cifraId);
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
}

// ============================================
// Chord Transpose
// ============================================
function initTranspose() {
    const modal = document.getElementById('cifra-modal');
    if (!modal) return;

    const upBtn = modal.querySelector('[data-action="up"]');
    const downBtn = modal.querySelector('[data-action="down"]');
    const keyDisplay = modal.querySelector('#current-key');
    const cifraContent = modal.querySelector('#cifra-content');

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

    let transposeAmount = 0;

    const transposeChord = (chord, semitones) => {
        // Handle chord variations (m, 7, maj7, etc.)
        const match = chord.match(/^([A-G][#b]?)(.*)/);
        if (!match) return chord;

        const [, root, suffix] = match;
        let noteIndex = notes.indexOf(root);
        
        if (noteIndex === -1) {
            noteIndex = notesFlat.indexOf(root);
        }
        
        if (noteIndex === -1) return chord;

        const newIndex = (noteIndex + semitones + 12) % 12;
        return notes[newIndex] + suffix;
    };

    const updateCifra = (semitones) => {
        const chords = cifraContent.querySelectorAll('.chord');
        chords.forEach(chordEl => {
            const originalChord = chordEl.dataset.original || chordEl.textContent;
            chordEl.dataset.original = originalChord;
            chordEl.textContent = transposeChord(originalChord, semitones);
        });

        // Update key display
        const originalKey = modal.dataset.originalKey || 'C';
        const newKey = transposeChord(originalKey, semitones);
        keyDisplay.textContent = newKey;
        modal.dataset.currentKey = newKey;
        
        // Update chord buttons
        const chordBtns = modal.querySelectorAll('.cifra-modal__chord');
        chordBtns.forEach(btn => {
            const originalChord = btn.dataset.original || btn.dataset.chord;
            btn.dataset.original = originalChord;
            btn.textContent = transposeChord(originalChord, semitones);
            btn.dataset.chord = transposeChord(originalChord, semitones);
        });
    };

    upBtn?.addEventListener('click', () => {
        transposeAmount++;
        updateCifra(transposeAmount);
    });

    downBtn?.addEventListener('click', () => {
        transposeAmount--;
        updateCifra(transposeAmount);
    });

    // Reset transpose when modal closes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'hidden' && modal.hidden) {
                transposeAmount = 0;
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
}

// ============================================
// Chord Popup
// ============================================
function initChordPopup() {
    const popup = document.getElementById('chord-popup');
    if (!popup) return;

    // Chord diagrams data
    const chordDiagrams = {
        'C': { fullname: 'Dó Maior', fingers: '1-2-3' },
        'Am': { fullname: 'Lá Menor', fingers: '1-2-3' },
        'F': { fullname: 'Fá Maior', fingers: 'Pestana' },
        'G': { fullname: 'Sol Maior', fingers: '1-2-3-4' },
        'D': { fullname: 'Ré Maior', fingers: '1-2-3' },
        'Em': { fullname: 'Mi Menor', fingers: '1-2' },
    };

    document.addEventListener('click', (e) => {
        const chordEl = e.target.closest('.chord, .cifra-modal__chord');
        
        if (chordEl) {
            const chord = chordEl.textContent || chordEl.dataset.chord;
            const data = chordDiagrams[chord] || { fullname: chord, fingers: '-' };
            
            popup.querySelector('.chord-popup__name').textContent = chord;
            popup.querySelector('.chord-popup__fullname').textContent = data.fullname;
            popup.querySelector('.chord-popup__fingers span').textContent = `Dedos: ${data.fingers}`;
            
            // Position popup near the clicked element
            const rect = chordEl.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
            popup.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 180)}px`;
            
            popup.hidden = false;
        } else if (!e.target.closest('.chord-popup')) {
            popup.hidden = true;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popup.hidden = true;
        }
    });
}

// ============================================
// Favorites
// ============================================
function initFavorites() {
    const favoriteButtons = document.querySelectorAll('.cifra-item__favorite');
    const favorites = JSON.parse(localStorage.getItem('musicaviva_favorites') || '[]');

    // Update UI based on saved favorites
    favoriteButtons.forEach(btn => {
        const item = btn.closest('.cifra-item');
        const cifraId = item?.dataset.id;
        
        if (favorites.includes(cifraId)) {
            btn.classList.add('is-active');
            btn.querySelector('i').className = 'fas fa-heart';
        }
    });

    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.cifra-item');
            const cifraId = item?.dataset.id;
            
            if (!cifraId) return;

            const index = favorites.indexOf(cifraId);
            const icon = btn.querySelector('i');
            
            if (index > -1) {
                favorites.splice(index, 1);
                btn.classList.remove('is-active');
                icon.className = 'far fa-heart';
            } else {
                favorites.push(cifraId);
                btn.classList.add('is-active');
                icon.className = 'fas fa-heart';
            }
            
            localStorage.setItem('musicaviva_favorites', JSON.stringify(favorites));
        });
    });
}

// ============================================
// Font Size Control
// ============================================
const modal = document.getElementById('cifra-modal');
if (modal) {
    const increaseBtn = modal.querySelector('[data-action="increase"]');
    const decreaseBtn = modal.querySelector('[data-action="decrease"]');
    const cifraContent = modal.querySelector('#cifra-content');
    
    let fontSize = 14;
    const minSize = 10;
    const maxSize = 24;

    increaseBtn?.addEventListener('click', () => {
        if (fontSize < maxSize) {
            fontSize += 2;
            cifraContent.style.fontSize = `${fontSize}px`;
        }
    });

    decreaseBtn?.addEventListener('click', () => {
        if (fontSize > minSize) {
            fontSize -= 2;
            cifraContent.style.fontSize = `${fontSize}px`;
        }
    });
}

// ============================================
// Auto Scroll
// ============================================
let autoScrollInterval = null;
const autoScrollBtn = document.querySelector('.cifra-modal__action--scroll');
const cifraContent = document.querySelector('.cifra-modal__content');

autoScrollBtn?.addEventListener('click', () => {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
        autoScrollBtn.classList.remove('is-active');
    } else {
        autoScrollInterval = setInterval(() => {
            if (cifraContent) {
                cifraContent.scrollTop += 1;
                
                // Stop at the bottom
                if (cifraContent.scrollTop >= cifraContent.scrollHeight - cifraContent.clientHeight) {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = null;
                    autoScrollBtn.classList.remove('is-active');
                }
            }
        }, 50);
        autoScrollBtn.classList.add('is-active');
    }
});
