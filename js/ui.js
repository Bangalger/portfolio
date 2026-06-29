// Toggles de tema + idioma con persistencia, más lógica de UI, scroll,
// menú móvil y efecto de tipeo (streaming) del hero.
(function () {
    const root = document.documentElement;
    const store = window.localStorage;
    const mainEl = document.querySelector('main');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Accesibilidad: ocultar iconos decorativos a lectores de pantalla ----
    // Los Material Symbols se renderizan como texto (ej. "south"); sin aria-hidden
    // un lector de pantalla leería esa palabra literalmente.
    document.querySelectorAll('.material-symbols-outlined').forEach((icon) => {
        icon.setAttribute('aria-hidden', 'true');
    });

    // ---- Tema ----
    const savedTheme = store.getItem("theme");
    // Default to dark if prefers-color-scheme matches and no saved theme, else light.
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    let currentTheme = savedTheme || (prefersDark ? "dark" : "light");

    if (currentTheme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

    document.querySelectorAll(".toggle--theme").forEach((btn) => {
        btn.addEventListener("click", () => {
            const isDark = root.classList.contains("dark");
            const next = isDark ? "light" : "dark";
            if (next === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            store.setItem("theme", next);
        });
    });

    // ---- Idioma ----
    const savedLang = store.getItem("lang");
    root.dataset.lang = savedLang || (navigator.language.startsWith("es") ? "es" : "en");
    // Mantener el atributo lang del <html> sincronizado para los lectores de pantalla.
    root.lang = root.dataset.lang;

    let langSwitching = false;
    document.querySelectorAll(".toggle--lang").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (langSwitching) return;
            const next = root.dataset.lang === "es" ? "en" : "es";

            const applyLang = () => {
                root.dataset.lang = next;
                root.lang = next;
                store.setItem("lang", next);
                // Re-render del texto streaming en el nuevo idioma (sin re-tipear).
                renderStreaming(false);
            };

            // Sin animación: cambio inmediato.
            if (reduceMotion || !mainEl) {
                applyLang();
                return;
            }

            // Fade-out → swap → fade-in para evitar el cambio brusco.
            langSwitching = true;
            mainEl.classList.add("lang-switching");
            setTimeout(() => {
                applyLang();
                requestAnimationFrame(() => {
                    mainEl.classList.remove("lang-switching");
                    langSwitching = false;
                });
            }, 320);
        });
    });

    // ---- Mission Clock Logic ----
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const clockEl = document.getElementById('mission-clock');
        if (clockEl) {
            clockEl.textContent = `T-MINUS ${h}:${m}:${s}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ---- Subtle parallax/scroll effects ----
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('#hero-title');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroText.style.opacity = 1 - (scrolled / 700);
        }
    });

    // ---- Intersection Observer for Active Nav Links ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ---- Mobile menu ----
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');

    function setMenu(open) {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('hidden', !open);
        if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
        if (menuIcon) {
            menuIcon.textContent = open ? 'close' : 'menu';
            menuIcon.setAttribute('data-icon', open ? 'close' : 'menu');
        }
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            setMenu(!isOpen);
        });
    }

    // Cerrar el menú al hacer click en cualquier enlace del menú móvil.
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    // ---- Streaming (typewriter) text effect ----
    const streamingEls = Array.from(document.querySelectorAll('.streaming-text'));
    const originalHTML = new Map();
    streamingEls.forEach(el => originalHTML.set(el, el.innerHTML));

    let streamToken = 0;
    let streamTimers = [];

    function clearStreamTimers() {
        streamTimers.forEach(t => clearTimeout(t));
        streamTimers = [];
    }

    // Convierte el HTML original en texto plano, preservando los saltos <br>.
    function htmlToRaw(html) {
        return html
            .replace(/<br\s*\/?>/gi, '\u0001')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/[ \t]+/g, ' ')
            .trim()
            .replace(/\u0001/g, '\n');
    }

    // Obtiene el texto del idioma activo a partir del markup original.
    function rawForLang(el, lang) {
        const original = originalHTML.get(el) || '';
        const tmp = document.createElement('div');
        tmp.innerHTML = original;
        const span = tmp.querySelector(`[lang="${lang}"]`);
        return htmlToRaw(span ? span.innerHTML : original);
    }

    function renderHTML(text) {
        return text.replace(/\n/g, '<br>');
    }

    function typeInto(el, text, speed, token) {
        return new Promise(resolve => {
            let i = 0;
            const step = () => {
                if (token !== streamToken) {
                    resolve();
                    return;
                }
                if (i <= text.length) {
                    el.innerHTML = renderHTML(text.slice(0, i)) + '<span class="stream-cursor">&#9611;</span>';
                    i++;
                    streamTimers.push(setTimeout(step, speed));
                } else {
                    el.innerHTML = renderHTML(text);
                    resolve();
                }
            };
            step();
        });
    }

    async function renderStreaming(animate) {
        const token = ++streamToken;
        clearStreamTimers();
        const lang = root.dataset.lang || 'en';

        if (!animate || reduceMotion) {
            streamingEls.forEach(el => {
                el.innerHTML = renderHTML(rawForLang(el, lang));
            });
            return;
        }

        // Reservar la altura actual (el markup original aún está presente) ANTES de
        // vaciar los contenedores, para que el layout permanezca rígido mientras se
        // tipea y no empuje los bloques "Experience" / "Status".
        streamingEls.forEach(el => {
            if (!el.style.minHeight) {
                el.style.minHeight = el.offsetHeight + 'px';
            }
            el.innerHTML = '';
        });

        const speeds = { 'hero-title': 65, 'hero-subtitle': 28 };
        for (const el of streamingEls) {
            if (token !== streamToken) return;
            const speed = speeds[el.id] || 10;
            await typeInto(el, rawForLang(el, lang), speed, token);
        }
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => renderStreaming(true));
    } else {
        renderStreaming(true);
    }
})();
