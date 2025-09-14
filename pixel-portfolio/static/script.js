// Efeitos de interatividade e animações dinâmicas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar accordion
    initializeAccordion();
    
    // Animação da barra de XP
    animateXPBar();
    
    // Animação das barras de habilidades
    animateSkillBars();
    
    // Efeito de digitação no título
    typewriterEffect();
    
    // Animações das estatísticas
    animateStatsCounters();
    
    // Efeito de partículas (reduzido)
    createParticles();
});

// Sistema de Accordion
function initializeAccordion() {
    // Primeiro card (Sobre Mim) começa aberto
    const firstCard = document.querySelector('.accordion-card[data-card="about"]');
    if (firstCard) {
        firstCard.classList.add('active');
    }
}

function toggleCard(cardId) {
    const card = document.querySelector(`[data-card="${cardId}"]`);
    const allCards = document.querySelectorAll('.accordion-card');
    
    // Fechar todos os outros cards
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
            const toggle = c.querySelector('.card-toggle');
            if (toggle) toggle.textContent = '▶';
        }
    });
    
    // Toggle do card clicado
    if (card) {
        card.classList.toggle('active');
        const toggle = card.querySelector('.card-toggle');
        if (toggle) {
            toggle.textContent = card.classList.contains('active') ? '▼' : '▶';
        }
        
        // Animar barras de progresso quando o card abrir
        if (card.classList.contains('active')) {
            setTimeout(() => {
                animateProgressBars(card);
            }, 300);
        }
    }
}

function animateProgressBars(card) {
    const progressBars = card.querySelectorAll('.progress-fill, .skill-fill, .language-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width') + '%';
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, index * 100 + 200);
    });
}

// Animação da barra de XP
function animateXPBar() {
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const targetWidth = xpFill.style.width;
        xpFill.style.width = '0%';
        
        setTimeout(() => {
            xpFill.style.width = targetWidth;
        }, 1000);
    }
}

// Animação das barras de habilidades
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const targetWidth = skillFill.style.width;
                skillFill.style.width = '0%';
                
                setTimeout(() => {
                    skillFill.style.width = targetWidth;
                }, 500);
                
                observer.unobserve(skillFill);
            }
        });
    });
    
    skillFills.forEach(fill => observer.observe(fill));
}

// Criar partículas flutuantes
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        opacity: 0.7;
        animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        box-shadow: 0 0 6px #FFD700;
    `;
    
    container.appendChild(particle);
    
    // Remove a partícula após a animação
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container); // Cria uma nova partícula
        }
    }, (Math.random() * 10 + 10) * 1000);
}

// Adicionar CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efeitos de hover nos cards de projeto
function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(135, 206, 235, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Efeito de clique
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Efeito de digitação no título
function typewriterEffect() {
    const title = document.querySelector('.pixel-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #4a90e2';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Animação dos contadores de estatísticas
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 30;
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentNumber) + '+';
            }
        }, 50);
    });
}

// Função para alternar entre tema claro e escuro
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (body.classList.contains('light-theme')) {
        // Mudar para tema escuro
        body.classList.remove('light-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark');
    } else {
        // Mudar para tema claro
        body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Escuro';
        localStorage.setItem('theme', 'light');
    }
}

// Função para carregar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Escuro';
    } else {
        body.classList.remove('light-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Claro';
    }
}

// Função de Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingFill = document.querySelector('.loading-fill');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 100);
}

// Função para scroll suave
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar/ocultar botão voltar ao topo
function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Event listener para scroll
window.addEventListener('scroll', toggleBackToTopButton);

// Melhorar responsividade - ajustar sidebar em mobile
function adjustMobileLayout() {
    const gameLayout = document.querySelector('.game-layout');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        gameLayout.style.flexDirection = 'column';
        sidebar.style.position = 'relative';
        sidebar.style.width = '100%';
        sidebar.style.height = 'auto';
        mainContent.style.marginLeft = '0';
    } else {
        gameLayout.style.flexDirection = 'row';
        sidebar.style.position = 'fixed';
        sidebar.style.width = '300px';
        sidebar.style.height = '100vh';
        mainContent.style.marginLeft = '300px';
    }
}

// Event listener para redimensionamento
window.addEventListener('resize', adjustMobileLayout);

// Função para alternar entre layouts (gamificado/tradicional)
function switchLayout() {
    // Adiciona um efeito de transição suave
    document.body.style.opacity = '0.5';
    
    setTimeout(() => {
        // Redireciona para a versão backup (tradicional)
        window.location.href = '/backup';
    }, 300);
}

// Carregar tema e inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
    loadTheme();
    initializeAccordion();
    
    // Animar barras do card "Sobre Mim" que já vem aberto
    setTimeout(() => {
        const aboutCard = document.querySelector('.accordion-card[data-card="about"]');
        if (aboutCard && aboutCard.classList.contains('active')) {
            animateProgressBars(aboutCard);
        }
    }, 1000); // Delay para aguardar o loading screen
    
    adjustMobileLayout();
    toggleBackToTopButton();
});

