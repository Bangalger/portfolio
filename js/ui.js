// Toggles de tema + idioma con persistencia. CSS gestiona todo lo visual.
(function () {
  const root = document.documentElement;
  const store = window.localStorage;

  // ---- Tema ----
  const savedTheme = store.getItem("theme");
  if (savedTheme) root.dataset.theme = savedTheme;

  document.querySelector(".toggle--theme")?.addEventListener("click", () => {
    const current =
      root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store.setItem("theme", next);
  });

  // ---- Idioma ----
  const savedLang = store.getItem("lang");
  root.dataset.lang =
    savedLang || (navigator.language.startsWith("es") ? "es" : "en");

  document.querySelector(".toggle--lang")?.addEventListener("click", () => {
    const next = root.dataset.lang === "es" ? "en" : "es";
    root.dataset.lang = next;
    store.setItem("lang", next);
  });
})();
