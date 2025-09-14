// Efeitos de interatividade e animações dinâmicas - VERSÃO BACKUP

document.addEventListener('DOMContentLoaded', function() {
    // Animação da barra de XP
    animateXPBar();
    
    // Animação das barras de habilidades
    animateSkillBars();
    
    // Efeito de partículas
    createParticles();
    
    // Efeito de hover nos cards de projeto
    addProjectHoverEffects();
    
    // Efeito de digitação no título
    typewriterEffect();
    
    // Parallax do mouse
    addMouseParallax();
    
    // Animações das novas seções
    animateStatsCounters();
    addContactHoverEffects();
});

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
        title.style.borderRight = '2px solid #FFD700';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                    // Para todas as animações após o efeito de digitação
                    stopAllAnimations();
                }, 1000);
            }
        }, 100);
    }
}

// Função para parar todas as animações
function stopAllAnimations() {
    // Remove animações de elementos específicos
    const elementsToStop = [
        '.project-icon',
        '.contact-icon', 
        '.competency-icon',
        '.skill-item',
        '.about-card',
        '.contact-form-container',
        '.competency-card'
    ];
    
    elementsToStop.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.animation = 'none';
        });
    });
    
    // Para as partículas
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.style.display = 'none';
    }
    
    // Para o parallax do mouse
    document.removeEventListener('mousemove', handleMouseMove);
    
    console.log('Todas as animações foram pausadas após o efeito de digitação');
}

// Função para o parallax do mouse (precisa ser global para poder remover depois)
function handleMouseMove(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Mover as camadas de fundo baseado na posição do mouse
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    
    if (layer1) {
        layer1.style.transform = `translateX(${mouseX * 20 - 10}px) translateY(${mouseY * 20 - 10}px)`;
    }
    
    if (layer2) {
        layer2.style.transform = `translateX(${mouseX * 15 - 7.5}px) translateY(${mouseY * 15 - 7.5}px)`;
    }
    
    if (layer3) {
        layer3.style.transform = `translateX(${mouseX * 10 - 5}px) translateY(${mouseY * 10 - 5}px)`;
    }
    
    // Mover o avatar baseado na posição do mouse
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.transform = `translateX(${mouseX * 10 - 5}px) translateY(${mouseY * 10 - 5}px)`;
    }
}

// Parallax do mouse
function addMouseParallax() {
    document.addEventListener('mousemove', handleMouseMove);
}

// Efeito de scroll suave
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Adicionar efeito de brilho nos elementos interativos
function addGlowEffects() {
    const interactiveElements = document.querySelectorAll('.project-card, .skill-item, .profile-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
}

// Animação dos contadores de estatísticas
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalNumber = parseInt(statNumber.textContent);
                let currentNumber = 0;
                
                const increment = finalNumber / 30; // 30 frames de animação
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        statNumber.textContent = finalNumber + '+';
                        clearInterval(counter);
                    } else {
                        statNumber.textContent = Math.floor(currentNumber) + '+';
                    }
                }, 50);
                
                observer.unobserve(statNumber);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Efeitos de hover nos cards de contato
function addContactHoverEffects() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Adiciona um pequeno shake no ícone
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = 'shake 0.5s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = 'float 2s ease-in-out infinite';
            }
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

// Adicionar animação de shake para os ícones de contato
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Função para alternar entre tema claro e escuro (versão backup)
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

// Função para carregar tema salvo (versão backup)
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

// Função para alternar entre layouts (tradicional/gamificado)
function switchLayout() {
    // Adiciona um efeito de transição suave
    document.body.style.opacity = '0.5';
    
    setTimeout(() => {
        // Redireciona para a versão principal (gamificada)
        window.location.href = '/';
    }, 300);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    loadTheme();
});

// Inicializar efeitos adicionais
setTimeout(() => {
    addGlowEffects();
    smoothScroll();
}, 1000);
