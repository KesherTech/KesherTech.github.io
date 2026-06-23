// Dark-mode toggle. The initial theme is set by an inline <head> snippet to avoid
// a flash of the wrong theme; this just wires the toggle button(s).
(function () {
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("kt-theme", theme); } catch (e) {}
  }
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      apply(cur === "dark" ? "light" : "dark");
    });
  });
})();
