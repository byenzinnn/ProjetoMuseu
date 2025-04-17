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
      if (pagina === 'exposicoes.html') {
        aplicarTiltExposicoes();
      }
      
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

function aplicarTiltExposicoes() {
  document.querySelectorAll('.exposicao').forEach(card => {
    card.classList.add('tilt-transition');
    card.addEventListener('mousemove', onCardMouseMove);
    card.addEventListener('mouseleave', onCardMouseLeave);
  });
}

function onCardMouseMove(e) {
  this.classList.remove('tilt-transition');
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const normX = (x / rect.width)  * 2 - 1;
  const normY = (y / rect.height) * 2 - 1;
  const maxTilt = 2;

  const rotateY = -normX * maxTilt;
  const rotateX =  normY * maxTilt;

  this.style.transform = 
    `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function onCardMouseLeave() {
  this.classList.add('tilt-transition');
  this.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
}


const lenis = new Lenis({ duration: 10, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

window.addEventListener('load', () => {
  carregarPagina('home.html');
});
