function iniciarFadeIn() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aparecer');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.remove('aparecer');
    observer.observe(el);
  });
}

function carregarPagina(pagina) {
  fetch(pagina)
    .then(res => {
      if (!res.ok) throw new Error('Erro ao carregar');
      return res.text();
    })
    .then(html => {
      document.getElementById('conteudo').innerHTML = html;
      iniciarFadeIn();
      aplicarHoverEffects();
    })
    .catch(() => {
      document.getElementById('conteudo').innerHTML = 'Erro ao carregar a página.';
    });
}

function aplicarHoverEffects() {
  document.querySelectorAll('.art-container').forEach(container => {
    const image = container.querySelector('.img-estilo');
    const title = container.querySelector('.art-title');

    container.addEventListener('mouseenter', () => {
      anime({ targets: image, scale: 1, duration: 200, easing: 'easeInOutQuad' });
      anime({ targets: title, '::after': { width: '100%' }, duration: 200, easing: 'easeInOutQuad' });
    });
    container.addEventListener('mouseleave', () => {
      anime({ targets: image, scale: 1, duration: 200, easing: 'easeInOutQuad' });
      anime({ targets: title, '::after': { width: '0%' }, duration: 200, easing: 'easeInOutQuad' });
    });
  });
}

const lenis = new Lenis({ duration: 10, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

window.addEventListener('load', () => {
  carregarPagina('home.html');
});
