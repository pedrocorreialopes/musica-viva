/**
 * MusicaViva - Dicionário de Acordes JavaScript
 * Functionality for the chord dictionary page
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initInstrumentTabs();
    initNoteSelector();
    initChordAudio();
});

// ============================================
// Instrument Tabs
// ============================================
function initInstrumentTabs() {
    const tabs = document.querySelectorAll('.instrument-tab');
    const panels = document.querySelectorAll('.chord-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');
            
            // Update tabs
            tabs.forEach(t => {
                t.classList.remove('instrument-tab--active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('instrument-tab--active');
            tab.setAttribute('aria-selected', 'true');
            
            // Update panels
            panels.forEach(panel => {
                panel.hidden = panel.id !== targetId;
            });
        });
    });
}

// ============================================
// Note Selector
// ============================================
function initNoteSelector() {
    const noteButtons = document.querySelectorAll('.note-btn');
    const selectedNoteDisplay = document.getElementById('selected-note');
    const pianoNoteDisplay = document.getElementById('piano-note');

    // Chord definitions for each note
    const chordDefinitions = {
        'C': {
            major: { name: 'C', fullname: 'Dó Maior', fingers: '1-2-3', notes: ['C', 'E', 'G'] },
            minor: { name: 'Cm', fullname: 'Dó Menor', fingers: 'Pestana: casa 3', notes: ['C', 'Eb', 'G'] },
            seventh: { name: 'C7', fullname: 'Dó com Sétima', fingers: '1-2-3-4', notes: ['C', 'E', 'G', 'Bb'] },
            maj7: { name: 'Cmaj7', fullname: 'Dó Maior com 7ª Maior', fingers: '2-3', notes: ['C', 'E', 'G', 'B'] },
            m7: { name: 'Cm7', fullname: 'Dó Menor com 7ª', fingers: 'Pestana: casa 3', notes: ['C', 'Eb', 'G', 'Bb'] },
            sus4: { name: 'Csus4', fullname: 'Dó Suspensa 4ª', fingers: '1-3-4', notes: ['C', 'F', 'G'] },
            dim: { name: 'Cdim', fullname: 'Dó Diminuto', fingers: '1-2-3', notes: ['C', 'Eb', 'Gb'] },
            aug: { name: 'C+', fullname: 'Dó Aumentado', fingers: '1-2-3-4', notes: ['C', 'E', 'G#'] }
        },
        'D': {
            major: { name: 'D', fullname: 'Ré Maior', fingers: '1-2-3', notes: ['D', 'F#', 'A'] },
            minor: { name: 'Dm', fullname: 'Ré Menor', fingers: '1-2-3', notes: ['D', 'F', 'A'] },
            seventh: { name: 'D7', fullname: 'Ré com Sétima', fingers: '1-2-3', notes: ['D', 'F#', 'A', 'C'] },
            maj7: { name: 'Dmaj7', fullname: 'Ré Maior com 7ª Maior', fingers: '1-2-3', notes: ['D', 'F#', 'A', 'C#'] },
            m7: { name: 'Dm7', fullname: 'Ré Menor com 7ª', fingers: '1-2', notes: ['D', 'F', 'A', 'C'] },
            sus4: { name: 'Dsus4', fullname: 'Ré Suspensa 4ª', fingers: '1-3-4', notes: ['D', 'G', 'A'] },
            dim: { name: 'Ddim', fullname: 'Ré Diminuto', fingers: '1-2-3', notes: ['D', 'F', 'Ab'] },
            aug: { name: 'D+', fullname: 'Ré Aumentado', fingers: '1-2-3-4', notes: ['D', 'F#', 'A#'] }
        },
        'E': {
            major: { name: 'E', fullname: 'Mi Maior', fingers: '1-2-3', notes: ['E', 'G#', 'B'] },
            minor: { name: 'Em', fullname: 'Mi Menor', fingers: '1-2', notes: ['E', 'G', 'B'] },
            seventh: { name: 'E7', fullname: 'Mi com Sétima', fingers: '1-2', notes: ['E', 'G#', 'B', 'D'] },
            maj7: { name: 'Emaj7', fullname: 'Mi Maior com 7ª Maior', fingers: '1-2-3', notes: ['E', 'G#', 'B', 'D#'] },
            m7: { name: 'Em7', fullname: 'Mi Menor com 7ª', fingers: '1', notes: ['E', 'G', 'B', 'D'] },
            sus4: { name: 'Esus4', fullname: 'Mi Suspensa 4ª', fingers: '1-2', notes: ['E', 'A', 'B'] },
            dim: { name: 'Edim', fullname: 'Mi Diminuto', fingers: '1-2-3', notes: ['E', 'G', 'Bb'] },
            aug: { name: 'E+', fullname: 'Mi Aumentado', fingers: '1-2-3-4', notes: ['E', 'G#', 'C'] }
        },
        'F': {
            major: { name: 'F', fullname: 'Fá Maior', fingers: 'Pestana', notes: ['F', 'A', 'C'] },
            minor: { name: 'Fm', fullname: 'Fá Menor', fingers: 'Pestana', notes: ['F', 'Ab', 'C'] },
            seventh: { name: 'F7', fullname: 'Fá com Sétima', fingers: 'Pestana', notes: ['F', 'A', 'C', 'Eb'] },
            maj7: { name: 'Fmaj7', fullname: 'Fá Maior com 7ª Maior', fingers: '1-2-3', notes: ['F', 'A', 'C', 'E'] },
            m7: { name: 'Fm7', fullname: 'Fá Menor com 7ª', fingers: 'Pestana', notes: ['F', 'Ab', 'C', 'Eb'] },
            sus4: { name: 'Fsus4', fullname: 'Fá Suspensa 4ª', fingers: 'Pestana', notes: ['F', 'Bb', 'C'] },
            dim: { name: 'Fdim', fullname: 'Fá Diminuto', fingers: '1-2-3', notes: ['F', 'Ab', 'B'] },
            aug: { name: 'F+', fullname: 'Fá Aumentado', fingers: 'Pestana', notes: ['F', 'A', 'C#'] }
        },
        'G': {
            major: { name: 'G', fullname: 'Sol Maior', fingers: '1-2-3-4', notes: ['G', 'B', 'D'] },
            minor: { name: 'Gm', fullname: 'Sol Menor', fingers: 'Pestana: casa 3', notes: ['G', 'Bb', 'D'] },
            seventh: { name: 'G7', fullname: 'Sol com Sétima', fingers: '1-2-3', notes: ['G', 'B', 'D', 'F'] },
            maj7: { name: 'Gmaj7', fullname: 'Sol Maior com 7ª Maior', fingers: '1-2-3', notes: ['G', 'B', 'D', 'F#'] },
            m7: { name: 'Gm7', fullname: 'Sol Menor com 7ª', fingers: 'Pestana: casa 3', notes: ['G', 'Bb', 'D', 'F'] },
            sus4: { name: 'Gsus4', fullname: 'Sol Suspensa 4ª', fingers: '1-3-4', notes: ['G', 'C', 'D'] },
            dim: { name: 'Gdim', fullname: 'Sol Diminuto', fingers: '1-2-3', notes: ['G', 'Bb', 'Db'] },
            aug: { name: 'G+', fullname: 'Sol Aumentado', fingers: '1-2-3-4', notes: ['G', 'B', 'D#'] }
        },
        'A': {
            major: { name: 'A', fullname: 'Lá Maior', fingers: '1-2-3', notes: ['A', 'C#', 'E'] },
            minor: { name: 'Am', fullname: 'Lá Menor', fingers: '1-2-3', notes: ['A', 'C', 'E'] },
            seventh: { name: 'A7', fullname: 'Lá com Sétima', fingers: '1-3', notes: ['A', 'C#', 'E', 'G'] },
            maj7: { name: 'Amaj7', fullname: 'Lá Maior com 7ª Maior', fingers: '1-2', notes: ['A', 'C#', 'E', 'G#'] },
            m7: { name: 'Am7', fullname: 'Lá Menor com 7ª', fingers: '1-2', notes: ['A', 'C', 'E', 'G'] },
            sus4: { name: 'Asus4', fullname: 'Lá Suspensa 4ª', fingers: '1-2-4', notes: ['A', 'D', 'E'] },
            dim: { name: 'Adim', fullname: 'Lá Diminuto', fingers: '1-2-3', notes: ['A', 'C', 'Eb'] },
            aug: { name: 'A+', fullname: 'Lá Aumentado', fingers: '1-2-3-4', notes: ['A', 'C#', 'F'] }
        },
        'B': {
            major: { name: 'B', fullname: 'Si Maior', fingers: 'Pestana: casa 2', notes: ['B', 'D#', 'F#'] },
            minor: { name: 'Bm', fullname: 'Si Menor', fingers: 'Pestana: casa 2', notes: ['B', 'D', 'F#'] },
            seventh: { name: 'B7', fullname: 'Si com Sétima', fingers: '1-2-3-4', notes: ['B', 'D#', 'F#', 'A'] },
            maj7: { name: 'Bmaj7', fullname: 'Si Maior com 7ª Maior', fingers: 'Pestana: casa 2', notes: ['B', 'D#', 'F#', 'A#'] },
            m7: { name: 'Bm7', fullname: 'Si Menor com 7ª', fingers: 'Pestana: casa 2', notes: ['B', 'D', 'F#', 'A'] },
            sus4: { name: 'Bsus4', fullname: 'Si Suspensa 4ª', fingers: 'Pestana: casa 2', notes: ['B', 'E', 'F#'] },
            dim: { name: 'Bdim', fullname: 'Si Diminuto', fingers: '1-2-3', notes: ['B', 'D', 'F'] },
            aug: { name: 'B+', fullname: 'Si Aumentado', fingers: '1-2-3-4', notes: ['B', 'D#', 'G'] }
        }
    };

    // Also add sharp/flat notes
    ['C#', 'D#', 'F#', 'G#', 'A#'].forEach(note => {
        const baseNote = note.charAt(0);
        if (chordDefinitions[baseNote]) {
            chordDefinitions[note] = JSON.parse(JSON.stringify(chordDefinitions[baseNote]));
            // Update names to include sharp
            Object.keys(chordDefinitions[note]).forEach(type => {
                const chord = chordDefinitions[note][type];
                chord.name = chord.name.replace(baseNote, note);
                chord.fullname = chord.fullname.replace(getNoteName(baseNote), getNoteName(note));
            });
        }
    });

    function getNoteName(note) {
        const names = {
            'C': 'Dó', 'C#': 'Dó#', 'Db': 'Réb',
            'D': 'Ré', 'D#': 'Ré#', 'Eb': 'Mib',
            'E': 'Mi',
            'F': 'Fá', 'F#': 'Fá#', 'Gb': 'Solb',
            'G': 'Sol', 'G#': 'Sol#', 'Ab': 'Láb',
            'A': 'Lá', 'A#': 'Lá#', 'Bb': 'Sib',
            'B': 'Si'
        };
        return names[note] || note;
    }

    const updateChordDisplay = (selectedNote) => {
        // Update note displays
        if (selectedNoteDisplay) selectedNoteDisplay.textContent = selectedNote;
        if (pianoNoteDisplay) pianoNoteDisplay.textContent = selectedNote;

        const chords = chordDefinitions[selectedNote];
        if (!chords) return;

        // Update guitar chord cards
        const chordCards = document.querySelectorAll('.chord-card');
        const chordTypes = ['major', 'minor', 'seventh', 'maj7', 'm7', 'sus4', 'dim', 'aug'];

        chordCards.forEach((card, index) => {
            const type = chordTypes[index];
            const chord = chords[type];
            if (chord) {
                card.querySelector('.chord-card__name').textContent = chord.name;
                card.querySelector('.chord-card__fullname').textContent = chord.fullname;
                card.querySelector('.chord-card__fingers').textContent = 
                    chord.fingers.includes('Pestana') ? chord.fingers : `Dedos: ${chord.fingers}`;
                card.dataset.chord = chord.name;
            }
        });

        // Update piano chord cards
        updatePianoChords(selectedNote, chords);
    };

    const updatePianoChords = (note, chords) => {
        const pianoCards = document.querySelectorAll('.piano-chord-card');
        const pianoTypes = ['major', 'minor', 'seventh', 'maj7'];

        pianoCards.forEach((card, index) => {
            const type = pianoTypes[index];
            const chord = chords[type];
            if (chord) {
                card.querySelector('.piano-chord-card__name').textContent = 
                    `${note} ${type === 'major' ? 'Maior' : type === 'minor' ? 'Menor' : type === 'seventh' ? '7 (Dominante)' : 'maj7'}`;
                card.querySelector('.piano-chord-card__notes').textContent = chord.notes.join(' - ');

                // Update piano keys
                const keys = card.querySelectorAll('.piano-key');
                keys.forEach(key => {
                    key.classList.remove('piano-key--active');
                    const keyNote = key.dataset.note;
                    if (chord.notes.includes(keyNote) || 
                        chord.notes.includes(keyNote.replace('#', 'b')) ||
                        chord.notes.some(n => n.replace('b', '#') === keyNote)) {
                        key.classList.add('piano-key--active');
                    }
                });
            }
        });
    };

    noteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            noteButtons.forEach(b => b.classList.remove('note-btn--active'));
            btn.classList.add('note-btn--active');
            
            const note = btn.dataset.note;
            updateChordDisplay(note);
        });
    });
}

// ============================================
// Chord Audio (Web Audio API)
// ============================================
function initChordAudio() {
    const playButtons = document.querySelectorAll('.chord-card__play');
    
    // Create audio context lazily (required by browsers)
    let audioContext = null;

    const getAudioContext = () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    };

    // Note frequencies (A4 = 440Hz)
    const noteFrequencies = {
        'C': 261.63, 'C#': 277.18, 'Db': 277.18,
        'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
        'E': 329.63,
        'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
        'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
        'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
        'B': 493.88
    };

    // Chord structures (intervals from root)
    const chordIntervals = {
        'major': [0, 4, 7],
        'minor': [0, 3, 7],
        'm': [0, 3, 7],
        '7': [0, 4, 7, 10],
        'maj7': [0, 4, 7, 11],
        'm7': [0, 3, 7, 10],
        'sus4': [0, 5, 7],
        'dim': [0, 3, 6],
        'aug': [0, 4, 8],
        '+': [0, 4, 8]
    };

    const parseChord = (chordName) => {
        const match = chordName.match(/^([A-G][#b]?)(m7|maj7|sus4|dim|aug|m|7|\+)?$/);
        if (!match) return null;
        
        const [, root, type] = match;
        return { root, type: type || 'major' };
    };

    const getChordFrequencies = (chordName) => {
        const parsed = parseChord(chordName);
        if (!parsed) return [];

        const rootFreq = noteFrequencies[parsed.root];
        if (!rootFreq) return [];

        const intervals = chordIntervals[parsed.type] || chordIntervals['major'];
        
        return intervals.map(interval => rootFreq * Math.pow(2, interval / 12));
    };

    const playChord = (chordName) => {
        const ctx = getAudioContext();
        const frequencies = getChordFrequencies(chordName);
        
        if (frequencies.length === 0) return;

        const now = ctx.currentTime;
        const duration = 1.5;

        frequencies.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = 'triangle'; // Softer than square
            oscillator.frequency.setValueAtTime(freq, now);

            // Envelope
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Slight delay for arpeggio effect
            oscillator.start(now + i * 0.05);
            oscillator.stop(now + duration);
        });
    };

    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.chord-card');
            const chordName = card?.dataset.chord || 
                              card?.querySelector('.chord-card__name')?.textContent;
            
            if (chordName) {
                playChord(chordName);
                
                // Visual feedback
                btn.classList.add('playing');
                setTimeout(() => btn.classList.remove('playing'), 200);
            }
        });
    });
}

// Add CSS for playing animation
const style = document.createElement('style');
style.textContent = `
    .chord-card__play.playing {
        transform: scale(1.1);
        background: var(--color-primary) !important;
        color: white !important;
    }
`;
document.head.appendChild(style);
