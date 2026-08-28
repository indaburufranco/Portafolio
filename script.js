// ---- Formulario de contacto (Formspree) ----
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const data = new FormData(contactForm);

        formStatus.textContent = 'Enviando...';
        formStatus.className = 'form-status';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = '¡Mensaje enviado! Te voy a responder a la brevedad.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                formStatus.textContent = 'No se pudo enviar. Probá de nuevo o escribime directo por email.';
                formStatus.classList.add('error');
            }
        } catch (err) {
            formStatus.textContent = 'No se pudo enviar. Probá de nuevo o escribime directo por email.';
            formStatus.classList.add('error');
        } finally {
            submitBtn.disabled = false;
        }
    });
}

// ---- Menú móvil ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ---- Efecto de tipeo en el hero ----
const roles = [
    'Desarrollador Web Frontend en formación',
    'Construyendo proyectos reales',
    'HTML · CSS · JavaScript'
];

const roleEl = document.getElementById('heroRole');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (roleEl) {
    if (prefersReducedMotion) {
        roleEl.textContent = roles[0];
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const current = roles[roleIndex];
            roleEl.textContent = deleting
                ? current.slice(0, charIndex--)
                : current.slice(0, charIndex++);
            roleEl.appendChild(cursor);

            let delay = deleting ? 35 : 55;

            if (!deleting && charIndex === current.length + 1) {
                delay = 1400;
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 300;
            }

            setTimeout(typeLoop, delay);
        }

        typeLoop();
    }
}

// ---- Animación de entrada al hacer scroll ----
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
    if (prefersReducedMotion) {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    } else {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
}

// ---- Link activo en el menú + barra de estado ----
const sections = document.querySelectorAll('main, header[id], section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const statusSection = document.getElementById('statusSection');
const statusPos = document.getElementById('statusPos');

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');

        navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });

        if (statusSection) {
            statusSection.textContent = id.replace('-', ' ');
        }
    });
}, { rootMargin: '-45% 0px -45% 0px' });

document.querySelectorAll('header[id], section[id]').forEach(function (el) {
    sectionObserver.observe(el);
});

// Simula "Ln, Col" moviéndose con el scroll, como referencia lúdica al editor
if (statusPos) {
    window.addEventListener('scroll', function () {
        const line = Math.max(1, Math.round(window.scrollY / 18));
        const col = Math.max(1, Math.round(window.scrollX + (window.scrollY % 80)));
        statusPos.textContent = 'Ln ' + line + ', Col ' + col;
    }, { passive: true });
}
