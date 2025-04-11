function carregarPagina(pagina) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", pagina, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("conteudo").innerHTML = xhr.responseText;
    } else {
      document.getElementById("conteudo").innerHTML =
        "Erro ao carregar a página.";
    }
  };
  xhr.send();
}

document.querySelectorAll(".art-container").forEach((container) => {
  const image = container.querySelector(".img-estilo");
  const title = container.querySelector(".art-title");

  container.addEventListener("mouseenter", () => {
    anime({
      targets: image,
      scale: 1,
      duration: 200,
      easing: "easeInOutQuad",
    });
    anime({
      targets: title,
      "::after": {
        width: "100%",
      },
      duration: 200,
      easing: "easeInOutQuad",
    });
  });

  container.addEventListener("mouseleave", () => {
    anime({
      targets: image,
      scale: 1,
      duration: 200,
      easing: "easeInOutQuad",
    });
    anime({
      targets: title,
      "::after": {
        width: "0%",
      },
      duration: 200,
      easing: "easeInOutQuad",
    });
  });
});

const lenis = new Lenis({
  duration: 10,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
