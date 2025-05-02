// Initialize EmailJS
emailjs.init('h4ODndc48ho0JOjHM');

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-links');
  const body = document.body;
  const links = document.querySelectorAll('.nav-links li');
  const header = document.querySelector('header');
  const form = document.querySelector("form");
  const loadingScreen = document.getElementById('loading-screen');
  const facts = [
    "I build websites faster than my coffee cools down.",
    "Once drew a full cityscape pixel by pixel.",
    "Dream project: Making an interactive web novel.",
    "I'm a huge fan of minimalistic design!",
    "My code is my canvas, and the web is my gallery."
  ];
  const hero = document.querySelector('.hero');
  const chars = document.querySelectorAll('.char');

  let menuOpen = false;
  let lastGamma = 0, lastBeta = 0;

  // Smooth scroll for internal links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (burger.classList.contains('toggle')) {
          burger.classList.remove('toggle');
          navMenu.classList.remove('active');
          body.classList.remove('menu-open');
          closeMenu.restart();
          menuOpen = false;
        }
      }
    });
  });

  // Burger Menu Animations
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
    .set(navMenu, { display: "flex" })
    .to(navMenu, { right: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
    .fromTo(links, { rotateX: -90, opacity: 0 }, {
      rotateX: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.4)"
    });

  const closeMenu = gsap.timeline({ paused: true });
  closeMenu
    .to(links, { rotateX: 90, opacity: 0, stagger: 0.05, duration: 0.3, ease: "power2.in" })
    .to(navMenu, { right: "-100%", opacity: 0, duration: 0.5, ease: "power2.in" })
    .to('.burger span', { rotate: 0, y: 0, scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

  burger.addEventListener('click', () => {
    if (!menuOpen) {
      openMenu.restart();
      body.classList.add('menu-open');
    } else {
      closeMenu.restart();
      body.classList.remove('menu-open');
    }
    menuOpen = !menuOpen;
  });

  document.addEventListener('click', (e) => {
    if (menuOpen && !burger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu.restart();
      body.classList.remove('menu-open');
      menuOpen = false;
    }
  });

  // Hover effect on nav items
  links.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.15, color: 'var(--accent-color)', duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, color: 'var(--text-color-light)', duration: 0.3, ease: 'power2.in' });
    });
  });

  // Hide header on scroll
  let lastScrollTop = window.scrollY;
  let ticking = false;
  const scrollThreshold = 5, minScroll = 60;

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

  // Sticky sections
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.sticky-section');
  
    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;
  
      const nextSection = sections[index + 1];
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add('hidden');
          } else {
            section.classList.remove('hidden');
          }
        });
      }, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -99% 0px' // Triggers just before the next section fully covers the current one
      });
  
      observer.observe(nextSection);
    });
  }
  
  

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      loadingScreen.style.display = 'flex';
      const formData = new FormData(this);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      emailjs.send('service_4esi4ks', 'template_hg6qz3f', data)
        .then(response => {
          alert("Your message has been sent successfully!");
          form.reset();
        })
        .catch(error => {
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

  // Fun Facts
  ['webdev', 'design', 'problem', 'coffee'].forEach((id, i) => {
    const card = document.getElementById(`card-${id}`);
    if (card) card.onclick = () => card.querySelector('.card-back').innerText = facts[i];
  });

  const cards = document.querySelectorAll('.card');
  gsap.from(cards, { opacity: 0, y: 50, stagger: 0.2, duration: 1.2, ease: "power3.out" });

  cards.forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, { scale: 1.05, rotation: 8, boxShadow: '0 15px 25px rgba(0,0,0,0.2)', duration: 0.2 })
    );
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { scale: 1, rotation: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.1)', duration: 0.2 })
    );
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      gsap.to(card.querySelector('.card-inner'), {
        rotationY: card.classList.contains('flipped') ? 180 : 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  // Animate project containers
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
      delay: i * 0.1,
    });
  });

  // Hero tilt + animation
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
        rotate, scale, skewX, skewY,
        duration: 0.4, ease: 'power2.out'
      });
    });
  }

  function resetChars() {
    gsap.to(chars, { x: 0, y: 0, rotate: 0, scale: 1, skewX: 0, skewY: 0, duration: 0.6, ease: 'power3.out' });
  }

  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      animateChars(x, y, width);
    });
    hero.addEventListener('mouseleave', resetChars);
  }

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent) && window.DeviceOrientationEvent) {
    const enableTilt = () => {
      window.addEventListener('deviceorientation', (event) => {
        const smooth = 0.1;
        lastGamma += (event.gamma - lastGamma) * smooth;
        lastBeta += (event.beta - lastBeta) * smooth;
        animateChars(lastGamma * 5, lastBeta * 5);
      });
    };
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permission => { if (permission === 'granted') enableTilt(); })
        .catch(console.error);
    } else {
      enableTilt();
    }
  }
});


