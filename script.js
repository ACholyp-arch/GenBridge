const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');
const navLinks = document.querySelectorAll('.nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const item = entry.target;
    const max = Number(item.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.round(max / 35));

    const timer = setInterval(() => {
      current += step;

      if (current >= max) {
        current = max;
        clearInterval(timer);
      }

      item.textContent = `${current}%`;
    }, 28);

    countObserver.unobserve(item);
  });
}, {
  threshold: 0.6
});

document.querySelectorAll('[data-count]').forEach(item => {
  countObserver.observe(item);
});

const priceCards = document.querySelectorAll('.price-card');

priceCards.forEach(card => {
  const button = card.querySelector('.expand-btn');

  const toggleCard = () => {
    const active = card.classList.toggle('active');
    button.setAttribute('aria-expanded', String(active));
    button.textContent = active ? 'Ocultar detalles' : 'Ver detalles';
  };

  button.addEventListener('click', event => {
    event.stopPropagation();
    toggleCard();
  });

  card.addEventListener('click', event => {
    if (!event.target.closest('button')) {
      toggleCard();
    }
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard();
    }
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    priceCards.forEach(card => {
      card.classList.toggle('hide', filter !== 'all' && card.dataset.filter !== filter);
    });
  });
});

const turnoverRange = document.querySelector('#turnoverRange');
const turnoverValue = document.querySelector('#turnoverValue');
const recommendation = document.querySelector('#recommendation');

const updateRecommendation = () => {
  const value = Number(turnoverRange.value);
  turnoverValue.textContent = `${value}%`;

  if (value < 8) {
    recommendation.textContent = 'Diagnóstico GenBridge: primero conviene entender las causas.';
  } else if (value <= 15) {
    recommendation.textContent = 'Plan Base: ideal para rotación moderada.';
  } else if (value <= 23) {
    recommendation.textContent = 'Plan Growth: recomendado para rotación alta.';
  } else {
    recommendation.textContent = 'Plan Enterprise: mejor para intervención amplia y varias sedes.';
  }
};

turnoverRange.addEventListener('input', updateRecommendation);
updateRecommendation();

const proofText = document.querySelector('#proofText');

const proofCopy = {
  retencion: 'Diagnósticos claros para saber por qué se va el talento joven y qué cambiar primero.',
  liderazgo: 'Talleres y capacitación para que supervisores conecten mejor con equipos Gen Z.',
  clima: 'Medición mensual de clima, reconocimiento y compromiso para sostener avances.'
};

document.querySelectorAll('.proof-pill').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.proof-pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    proofText.textContent = proofCopy[button.dataset.proof];
  });
});

const timelineCopy = document.querySelector('#timelineCopy');

const timelineMessages = [
  'Primero reunimos información clave para entender el contexto real de la organización.',
  'Después identificamos patrones, causas y puntos críticos de salida del talento joven.',
  'Diseñamos una intervención específica según tamaño, rotación y necesidades del equipo.',
  'Implementamos talleres, onboarding, reconocimiento y capacitación a supervisores.',
  'Finalmente medimos avances con reportes, indicadores y recomendaciones de mejora.'
];

document.querySelectorAll('.timeline button').forEach((button, index) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.timeline button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    timelineCopy.textContent = timelineMessages[index];
  });
});

const sections = document.querySelectorAll('section[id]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: '-40% 0px -55% 0px'
});

sections.forEach(section => {
  activeObserver.observe(section);
});

const floatingCta = document.querySelector('#floatingCta');
const floatingPanel = document.querySelector('#floatingPanel');

floatingCta.addEventListener('click', () => {
  const isOpen = floatingPanel.classList.toggle('open');
  floatingCta.setAttribute('aria-expanded', String(isOpen));
  floatingPanel.setAttribute('aria-hidden', String(!isOpen));
});

floatingPanel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    floatingPanel.classList.remove('open');
    floatingCta.setAttribute('aria-expanded', 'false');
    floatingPanel.setAttribute('aria-hidden', 'true');
  });
});

const form = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

form.addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = '¡Gracias! Tu solicitud fue registrada. GenBridge te contactará pronto.';
  form.reset();
});

const canHover = window.matchMedia('(hover: hover)').matches;

if (canHover) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
