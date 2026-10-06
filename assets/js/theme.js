/* Light/dark theme toggle. Load in <head> so the theme applies before first paint. */
(function () {
  var KEY = "wic-gmail-theme";
  var root = document.documentElement;

  function systemDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var theme = getSaved() || (systemDark() ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  function build() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("role", "switch");
    btn.setAttribute("title", "Toggle dark mode");
    btn.innerHTML =
      '<span class="theme-toggle-icon" aria-hidden="true">\u2600</span>' +
      '<span class="theme-toggle-track"><span class="theme-toggle-knob"></span></span>' +
      '<span class="theme-toggle-icon" aria-hidden="true">\u263E</span>';

    function sync() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-checked", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Dark mode on" : "Dark mode off");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      sync();
    });
    sync();

    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();