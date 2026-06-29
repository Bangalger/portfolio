// Toggles de tema + idioma con persistencia, más lógica de UI y scroll.
(function () {
    const root = document.documentElement;
    const store = window.localStorage;
  
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
  
    document.querySelector(".toggle--theme")?.addEventListener("click", () => {
        const isDark = root.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        if (next === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        store.setItem("theme", next);
    });
  
    // ---- Idioma ----
    const savedLang = store.getItem("lang");
    root.dataset.lang = savedLang || (navigator.language.startsWith("es") ? "es" : "en");
  
    document.querySelector(".toggle--lang")?.addEventListener("click", () => {
        const next = root.dataset.lang === "es" ? "en" : "es";
        root.dataset.lang = next;
        store.setItem("lang", next);
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
        if(heroText) {
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

    // --- Streamline Effect on Load ---
    window.addEventListener('DOMContentLoaded', () => {
        const streamlineElements = document.querySelectorAll('.streamline-reveal');
        streamlineElements.forEach(el => {
            el.classList.add('streamline-animate');
        });
    });
})();
