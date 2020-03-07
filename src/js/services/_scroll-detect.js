if (
  document.readyState === "complete" ||
  document.readyState === "loaded" ||
  document.readyState === "interactive"
) {
  addScrollDetect();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    addScrollDetect();
  });
}

function addScrollDetect() {
  const root = document.body.style;

  root.setProperty(
    "--scroll",
    window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
  );

  window.addEventListener("scroll", scroll, { passive: true });
  function scroll() {
    root.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
  }
}
