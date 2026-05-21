// Contador para 18 de julio de 2026
function updateCountdown() {
    const targetDate = new Date('July 18, 2026 15:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');
    
    if (diasEl) diasEl.innerText = days < 10 ? '0' + days : days;
    if (horasEl) horasEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutosEl) minutosEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (segundosEl) segundosEl.innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        if (diasEl) diasEl.innerText = '00';
        if (horasEl) horasEl.innerText = '00';
        if (minutosEl) minutosEl.innerText = '00';
        if (segundosEl) segundosEl.innerText = '00';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Apertura de carta inicial
window.addEventListener('load', () => {
    const cargando = document.getElementById('pantallaCarga');
    const btnAbrir = document.getElementById('btnAbrirInvitacion');
    const audioInicio = document.getElementById('audioPlayer');
    const esMovil = window.matchMedia('(max-width: 768px)').matches;
    let yaAbrio = false;

    if (!cargando || !btnAbrir) return;

    document.body.style.overflow = 'hidden';

    const abrirInvitacion = () => {
        if (yaAbrio) return;
        yaAbrio = true;
        cargando.classList.add('abriendo');

        if (audioInicio) {
            audioInicio.volume = 0.35;
            audioInicio.play().catch(() => {});
        }

        setTimeout(() => {
            cargando.style.opacity = '0';
            setTimeout(() => {
                cargando.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 550);
        }, 820);
    };

    btnAbrir.addEventListener('click', abrirInvitacion, { once: true });

    // Respaldo para móviles lentos: evita que se quede atorada la carga.
    if (esMovil) {
        setTimeout(abrirInvitacion, 4200);
    }
});

// Menú navbar que aparece al hacer scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
        if (currentScroll > 80) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
});

// Menú hamburguesa responsive
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Galería - Usando las 12 fotos
const imagenesSeleccionadas = [
    "DSC03906.jpg",
    "DSC03916.jpg",
    "DSC03925.jpg",
    "DSC03935.jpg",
    "DSC03944.jpg",
    "DSC03958.jpg",
    "DSC03973.jpg",
    "DSC03986.jpg",
    "DSC04003.jpg",
    "DSC04016.jpg",
    "DSC04054.jpg",
    "DSC04074.jpg"
];

function cargarGaleria() {
    const galeriaGrid = document.getElementById('galeriaGrid');
    if (!galeriaGrid) return;
    
    galeriaGrid.innerHTML = '';
    
    imagenesSeleccionadas.forEach((imgName, index) => {
        const divWrapper = document.createElement('div');
        divWrapper.className = 'galeria-item scroll-reveal';
        divWrapper.style.animationDelay = `${index * 0.08}s`;
        
        const imgElement = document.createElement('img');
        imgElement.src = `Fotos/${encodeURIComponent(imgName)}`;
        imgElement.alt = "Foto Recuerdo - Mis XV Camila";
        imgElement.loading = "lazy";
        
        imgElement.addEventListener('click', () => {
            abrirModal(imgElement.src);
        });
        
        divWrapper.appendChild(imgElement);
        galeriaGrid.appendChild(divWrapper);
    });
}

// Modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.querySelector('.close');

function abrirModal(src) {
    if (modal) {
        modal.style.display = "block";
        modalImg.src = src;
        document.body.style.overflow = "hidden";
    }
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Mapa de ubicaciones
document.querySelectorAll('.btn-mapa, .btn-mapa-principal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lugar = btn.getAttribute('data-lugar');
        if (lugar === 'iglesia') {
            window.open('https://www.google.com/maps/dir/?api=1&destination=20.275611,-97.958417&travelmode=driving', '_blank');
        } else if (lugar === 'salon') {
            window.open('https://www.google.com/maps/dir/?api=1&destination=20.226583,-97.950444&travelmode=driving', '_blank');
        }
    });
});

// Confirmación local de asistencia
const btnConfirmarAsistencia = document.getElementById('btnConfirmarAsistencia');
if (btnConfirmarAsistencia) {
    btnConfirmarAsistencia.addEventListener('click', (e) => {
        e.preventDefault();
        btnConfirmarAsistencia.innerHTML = '<span>Muchas gracias, asistencia registrada</span> <i class="fas fa-heart"></i>';
        btnConfirmarAsistencia.classList.add('confirmado');
    });
}

// Música
const audio = document.getElementById('audioPlayer');
const musicControlBtn = document.getElementById('musicControl');
let musicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    const esMovil = window.matchMedia('(max-width: 768px)').matches;
    if (audio) {
        audio.volume = esMovil ? 0.28 : 0.35;
        
        const iniciarMusica = () => {
            if (!musicPlaying && audio) {
                audio.play().then(() => {
                    musicPlaying = true;
                    if(musicControlBtn) {
                        musicControlBtn.style.background = "linear-gradient(135deg, #88D2EF, #1B39BB)";
                        musicControlBtn.style.color = "white";
                    }
                    document.removeEventListener('click', iniciarMusica);
                    document.removeEventListener('touchstart', iniciarMusica);
                }).catch(err => console.log("Autoplay bloqueado - toca el ícono de música"));
            }
        };
        
        iniciarMusica();
        document.addEventListener('click', iniciarMusica);
        document.addEventListener('touchstart', iniciarMusica);
    }
    
    if (musicControlBtn) {
        musicControlBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (musicPlaying) {
                audio.pause();
                musicPlaying = false;
                musicControlBtn.style.background = "white";
                musicControlBtn.style.color = "#1B39BB";
            } else {
                audio.play();
                musicPlaying = true;
                musicControlBtn.style.background = "linear-gradient(135deg, #88D2EF, #1B39BB)";
                musicControlBtn.style.color = "white";
            }
        });
    }
});

// Scroll Reveal
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .fade-up');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    cargarGaleria();
    initScrollReveal();
    
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Agregar clase para animaciones al cargar
document.querySelectorAll('.fade-up').forEach(el => {
    if (!el.classList.contains('revealed')) {
        setTimeout(() => {
            el.classList.add('revealed');
        }, 100);
    }
});
