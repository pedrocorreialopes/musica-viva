/**
 * MusicaViva - Curiosidades Page JavaScript
 * Quiz functionality and curiosity filtering
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initCuriosityFilter();
    initCuriosityLikes();
    initQuiz();
    initShareButton();
});

// ============================================
// Curiosity Category Filter
// ============================================
function initCuriosityFilter() {
    const categories = document.querySelectorAll('.curiosity-category');
    const cards = document.querySelectorAll('.curiosity-card');

    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            const filter = cat.dataset.category;

            // Update active state
            categories.forEach(c => c.classList.remove('curiosity-category--active'));
            cat.classList.add('curiosity-category--active');

            // Filter cards
            cards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldShow = filter === 'all' || cardCategory === filter;
                
                card.style.display = shouldShow ? '' : 'none';
                
                // Animation
                if (shouldShow) {
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                }
            });
        });
    });
}

// ============================================
// Curiosity Likes
// ============================================
function initCuriosityLikes() {
    const likeButtons = document.querySelectorAll('.curiosity-card__like');
    const likes = JSON.parse(localStorage.getItem('musicaviva_curiosity_likes') || '{}');

    likeButtons.forEach((btn, index) => {
        const id = `curiosity-${index}`;
        
        // Check if already liked
        if (likes[id]) {
            btn.classList.add('is-liked');
            btn.querySelector('i').className = 'fas fa-heart';
        }

        btn.addEventListener('click', () => {
            const countEl = btn.querySelector('span');
            let count = parseInt(countEl.textContent.replace(/[^0-9]/g, ''), 10) || 0;

            if (likes[id]) {
                // Unlike
                delete likes[id];
                count--;
                btn.classList.remove('is-liked');
                btn.querySelector('i').className = 'far fa-heart';
            } else {
                // Like
                likes[id] = true;
                count++;
                btn.classList.add('is-liked');
                btn.querySelector('i').className = 'fas fa-heart';
                
                // Heart animation
                createHeartAnimation(btn);
            }

            countEl.textContent = formatNumber(count);
            localStorage.setItem('musicaviva_curiosity_likes', JSON.stringify(likes));
        });
    });
}

function createHeartAnimation(element) {
    const heart = document.createElement('span');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        animation: heartFloat 1s ease forwards;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top}px`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Add heart animation CSS
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
    }
    .curiosity-card__like.is-liked {
        color: #ef4444 !important;
        background: rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(heartStyle);

// ============================================
// Quiz Functionality
// ============================================
function initQuiz() {
    const startBtn = document.getElementById('start-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    const modal = document.getElementById('quiz-modal');
    const modalOverlay = modal?.querySelector('.quiz-modal__overlay');
    const closeBtn = modal?.querySelector('.quiz-modal__close');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    const progressBar = modal?.querySelector('.quiz-progress__bar');

    if (!modal) return;

    // Quiz questions
    const questions = [
        {
            question: 'Qual artista é conhecido como o "Rei do Pop"?',
            options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'],
            correct: 1
        },
        {
            question: 'Com quantos anos Mozart compôs sua primeira peça musical?',
            options: ['3 anos', '5 anos', '7 anos', '10 anos'],
            correct: 1
        },
        {
            question: 'Qual instrumento tem aproximadamente 12.000 peças?',
            options: ['Violino', 'Órgão de tubos', 'Piano de cauda', 'Harpa'],
            correct: 2
        },
        {
            question: 'Qual neurotransmissor é liberado quando ouvimos música que gostamos?',
            options: ['Serotonina', 'Adrenalina', 'Dopamina', 'Melatonina'],
            correct: 2
        },
        {
            question: 'Qual é o álbum mais vendido da história?',
            options: ['Abbey Road - Beatles', 'Thriller - Michael Jackson', 'Back in Black - AC/DC', 'The Dark Side of the Moon - Pink Floyd'],
            correct: 1
        },
        {
            question: 'Quantas oitavas vocais Freddie Mercury conseguia alcançar?',
            options: ['2 oitavas', '3 oitavas', 'Quase 4 oitavas', '5 oitavas'],
            correct: 2
        },
        {
            question: 'Onde nasceu a Bossa Nova?',
            options: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Belo Horizonte'],
            correct: 1
        },
        {
            question: 'Beethoven ficou completamente surdo com aproximadamente quantos anos?',
            options: ['30 anos', '35 anos', '40 anos', '44 anos'],
            correct: 3
        },
        {
            question: 'Qual é considerado o gênero musical raiz de quase toda música popular moderna?',
            options: ['Jazz', 'Blues', 'Rock', 'Country'],
            correct: 1
        },
        {
            question: 'Por quantas horas seguidas durou o show mais longo da história?',
            options: ['12 horas', '18 horas', '27 horas', '36 horas'],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedQuestions = [];

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const openQuiz = () => {
        // Select 5 random questions
        selectedQuestions = shuffleArray(questions).slice(0, 5);
        currentQuestion = 0;
        score = 0;
        
        quizContent.hidden = false;
        quizResult.hidden = true;
        
        modal.hidden = false;
        document.body.classList.add('modal-open');
        
        showQuestion();
    };

    const closeQuiz = () => {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
    };

    const showQuestion = () => {
        const q = selectedQuestions[currentQuestion];
        const totalQuestions = selectedQuestions.length;
        
        // Update progress
        const progress = ((currentQuestion) / totalQuestions) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        
        // Update question number
        document.getElementById('current-question').textContent = currentQuestion + 1;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        // Update question text
        modal.querySelector('.quiz-question').textContent = q.question;
        
        // Update options
        const optionsContainer = modal.querySelector('.quiz-options');
        optionsContainer.innerHTML = q.options.map((option, i) => `
            <button class="quiz-option" data-answer="${i}">${option}</button>
        `).join('');
        
        // Add click handlers to options
        optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.answer)));
        });
    };

    const selectAnswer = (answerIndex) => {
        const q = selectedQuestions[currentQuestion];
        const options = modal.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        
        // Show correct/wrong
        options[answerIndex].classList.add(
            answerIndex === q.correct ? 'quiz-option--correct' : 'quiz-option--wrong'
        );
        
        if (answerIndex !== q.correct) {
            options[q.correct].classList.add('quiz-option--correct');
        } else {
            score++;
        }
        
        // Next question after delay
        setTimeout(() => {
            currentQuestion++;
            
            if (currentQuestion < selectedQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    };

    const showResult = () => {
        quizContent.hidden = true;
        quizResult.hidden = false;
        
        // Update progress to 100%
        if (progressBar) progressBar.style.width = '100%';
        
        // Update score
        document.getElementById('score').textContent = score;
        
        // Update message based on score
        const messageEl = modal.querySelector('.quiz-result__message');
        const iconEl = modal.querySelector('.quiz-result__icon');
        
        if (score === 5) {
            iconEl.textContent = '🏆';
            messageEl.textContent = 'Perfeito! Você é um verdadeiro expert em música!';
        } else if (score >= 4) {
            iconEl.textContent = '🎉';
            messageEl.textContent = 'Excelente! Você conhece muito sobre música!';
        } else if (score >= 3) {
            iconEl.textContent = '👏';
            messageEl.textContent = 'Muito bem! Você tem bons conhecimentos musicais!';
        } else if (score >= 2) {
            iconEl.textContent = '🎵';
            messageEl.textContent = 'Não foi mal! Continue explorando o mundo da música!';
        } else {
            iconEl.textContent = '📚';
            messageEl.textContent = 'Continue aprendendo! Há muito mais para descobrir!';
        }
    };

    // Event listeners
    startBtn?.addEventListener('click', openQuiz);
    restartBtn?.addEventListener('click', openQuiz);
    closeBtn?.addEventListener('click', closeQuiz);
    modalOverlay?.addEventListener('click', closeQuiz);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeQuiz();
        }
    });
}

// ============================================
// Share Button
// ============================================
function initShareButton() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const title = 'Curiosidade Musical - MusicaViva';
            const text = document.querySelector('.curiosity-hero__title')?.textContent || 'Confira essa curiosidade musical!';
            const url = window.location.href;
            
            // Try native share API first (mobile)
            if (navigator.share) {
                try {
                    await navigator.share({ title, text, url });
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        copyToClipboard(url);
                    }
                }
            } else {
                // Fallback: copy to clipboard
                copyToClipboard(url);
            }
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        if (window.MusicaVivaUtils?.showNotification) {
            window.MusicaVivaUtils.showNotification('Link copiado para a área de transferência! 📋', 'success');
        }
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}
