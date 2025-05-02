// Initialize EmailJS with your new public key
emailjs.init('h4ODndc48ho0JOjHM');

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-links');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if it's open
        if (burger.classList.contains('toggle')) {
          burger.classList.remove('toggle');
          navMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
          closeMenu.restart();
          menuOpen = false;
        }
      }
    });
  });
});

const body = document.body;
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

let menuOpen = false;

// Timeline for opening
const openMenu = gsap.timeline({ paused: true });

openMenu
  .to('.burger span', {
    rotate: (i) => (i === 0 ? 45 : i === 1 ? 0 : -45),
    y: (i) => (i === 0 ? 8 : i === 2 ? -8 : 0),
    scaleX: 1.2,
    transformOrigin: "center",
    stagger: 0.05,
    duration: 0.4,
    ease: "back.out(1.7)"
  })
  .set(navLinks, { display: "flex" })
  .to(navLinks, { right: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
  .fromTo(links, {
    rotateX: -90,
    opacity: 0,
    transformOrigin: "top center"
  }, {
    rotateX: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.5,
    ease: "back.out(1.4)"
  });

// Timeline for closing
const closeMenu = gsap.timeline({ paused: true });

closeMenu
  .to(links, {
    rotateX: 90,
    opacity: 0,
    stagger: 0.05,
    duration: 0.3,
    ease: "power2.in"
  })
  .to(navLinks, { right: "-100%", opacity: 0, duration: 0.5, ease: "power2.in" })
  .to('.burger span', {
    rotate: 0,
    y: 0,
    scaleX: 1,
    duration: 0.5,
    ease: "elastic.out(1, 0.4)"
  });

burger.addEventListener('click', () => {
  if (!menuOpen) {
    openMenu.restart();
    body.classList.add('menu-open');
    menuOpen = true;
  } else {
    closeMenu.restart();
    body.classList.remove('menu-open');
    menuOpen = false;
  }
});

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
  const header = document.querySelector('header');
  if (
    menuOpen &&
    !burger.contains(event.target) &&
    !navLinks.contains(event.target) &&
    !header.contains(event.target)
  ) {
    closeMenu.restart();
    body.classList.remove('menu-open');
    menuOpen = false;
  }
});

// GSAP hover effect for navigation links
const navItems = document.querySelectorAll('.nav-links li');

navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      scale: 1.15,
      color: 'var(--accent-color)',
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      scale: 1,
      color: 'var(--text-color-light)',
      duration: 0.3,
      ease: 'power2.in'
    });
  });
});

// Hide Header on scroll
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  let lastScrollTop = window.scrollY;
  let ticking = false;
  const scrollThreshold = 5;
  const minScroll = 60; // how far down before header starts hiding

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;

        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
          if (scrollTop > lastScrollTop && scrollTop > minScroll) {
            header.classList.add('hidden');
          } else {
            header.classList.remove('hidden');
          }

          lastScrollTop = scrollTop;
        }

        ticking = false;
      });

      ticking = true;
    }
  });
});


// Sticky Sections
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.sticky-section');
    if (!sections.length) return;

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      const nextSection = sections[index + 1];
      const observer = new IntersectionObserver(handleIntersect(section), {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -200% 0px'
      });

      observer.observe(nextSection);
    });
  });
}

function handleIntersect(section) {
  return (entries) => {
    for (const entry of entries) {
      section.classList.toggle('hidden', entry.isIntersecting);
    }
  };
}

// Form submission
const form = document.querySelector("form");
const loadingScreen = document.getElementById('loading-screen');

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    loadingScreen.style.display = 'flex';

    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    emailjs.send('service_4esi4ks', 'template_hg6qz3f', data)
      .then(response => {
        console.log('Success!', response.status, response.text);
        alert("Your message has been sent successfully!");
        form.reset();
      })
      .catch(error => {
        console.error('Failed to send email:', error);
        alert(`Oops! Something went wrong.\n${error.text || 'Check console for details.'}`);
      })
      .finally(() => {
        loadingScreen.style.display = 'none';
      });
  });
}

// Page loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) loader.classList.add('fade-out');
});

// Fun Facts Cards
document.addEventListener('DOMContentLoaded', function () {
  const facts = [
    "I build websites faster than my coffee cools down.",
    "Once drew a full cityscape pixel by pixel.",
    "Dream project: Making an interactive web novel.",
    "I'm a huge fan of minimalistic design!",
    "My code is my canvas, and the web is my gallery."
  ];

  ['webdev', 'design', 'problem', 'coffee'].forEach((id, i) => {
    const card = document.getElementById(`card-${id}`);
    if (card) card.onclick = () =>
      card.querySelector('.card-back').innerText = facts[i];
  });

  const cards = document.querySelectorAll('.card');

  gsap.from(cards, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out"
  });

  cards.forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, {
        scale: 1.05,
        rotation: 8,
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.2,
        ease: "power1.out"
      })
    );

    card.addEventListener('mouseleave', () =>
      gsap.to(card, {
        scale: 1,
        rotation: 0,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: "elastic.out(1, 0.4)"
      })
    );

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      const inner = card.querySelector('.card-inner');
      gsap.to(inner, {
        rotationY: card.classList.contains('flipped') ? 180 : 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
});

// Project containers Projects Section / Home Page
gsap.utils.toArray('.project').forEach((project, i) => {
  gsap.from(project, {
    scrollTrigger: {
      trigger: project,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: i * 0.1, // Stagger entrance
  });
});

const hero = document.querySelector('.hero');
const chars = document.querySelectorAll('.char');
let tiltEnabled = false;
let lastGamma = 0, lastBeta = 0;

// Desktop mouse interaction
hero.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = hero.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;

  animateChars(x, y, width);
});

hero.addEventListener('mouseleave', () => {
  resetChars();
});

// Shared animation function
function animateChars(x, y, width = 500) {
  chars.forEach((char, index) => {
    const strength = 1 + (index % 5) * 0.5;
    const rotate = (x / width) * 20 * (index % 3 ? 1 : -1);
    const scale = 1 + Math.sin((x + y) / 200) * 0.1;
    const skewX = (x / 500) * strength;
    const skewY = (y / 500) * strength;

    gsap.to(char, {
      x: x / 30 * strength,
      y: y / 30 * strength,
      rotate,
      scale,
      skewX,
      skewY,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
}

function resetChars() {
  gsap.to(chars, {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    duration: 0.6,
    ease: 'power3.out'
  });
}

// Mobile tilt logic
function handleOrientation(event) {
  const smooth = 0.1;
  lastGamma += (event.gamma - lastGamma) * smooth;
  lastBeta += (event.beta - lastBeta) * smooth;

  const x = lastGamma * 5;
  const y = lastBeta * 5;

  animateChars(x, y);
}

function enableMobileTilt() {
  if (tiltEnabled) return;

  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(permission => {
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        tiltEnabled = true;
        document.querySelector('.tilt-hint')?.classList.add('fade-out');
      }
    }).catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
    tiltEnabled = true;
    document.querySelector('.tilt-hint')?.classList.add('fade-out');
  }
}

// Trigger tilt permission only on mobile
const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
if (isMobile) {
  hero.addEventListener('click', enableMobileTilt);
}







