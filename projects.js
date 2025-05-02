const projects = [
  {
    title: "La Colombiana",
    description: "A rich cultural e-commerce website showcasing Colombian art and tradition.",
    story: "Inspired by my love for Colombian art, this project immerses users in the history and culture behind the products.",
    features: ["Interactive art galleries", "E-commerce functionality", "Cultural storytelling", "User profiles and reviews"],
    techstack: ["WordPress", "PHP", "CSS3", "JavaScript"],
    lessons: "Integrated WordPress with custom plugins and learned to craft digital narratives.",
    liveDemoLink: "https://lacolombiana.co.za",
    imageSrc: "Images/Logo-With-Lady-800x400-3.png",
    bgColor: "#f9f9f9"
  },
  {
    title: "Root'd",
    description: "A community gardening app connecting urban farmers through smart mapping and real-time chats.",
    story: "Born from a passion for urban agriculture, Root’d connects gardeners, plots, and resources in real time.",
    features: ["Real-time chat", "Map-based plant tracking", "Weather alerts", "User profiles"],
    techstack: ["Node.js", "Express", "MongoDB", "Socket.io"],
    lessons: "Gained experience with Socket.io, geolocation, and map integrations.",
    liveDemoLink: "https://rootdsa.co.za",
    imageSrc: "Images/rootd-white.png",
    bgColor: "#fff0f0"
  },
  {
    title: "Get Out In Cape Town",
    description: "A travel guide app blending local experiences, secret spots, and adventure tours in Cape Town.",
    story: "This app reveals Cape Town’s hidden gems and authentic tours most visitors miss.",
    features: ["Interactive hidden maps", "Local guides", "Adventure bookings", "User travel tips"],
    techstack: ["React", "Node.js", "MongoDB", "Google Maps API"],
    lessons: "Learned about user-generated content and seamless map integration.",
    liveDemoLink: "https://getoutin.co.za",
    imageSrc: "Images/GetOutInLogo-SVG.svg",
    bgColor: "#f0f9ff"
  },
  {
    title: "Down With Dough Bakery",
    description: "A travel guide app blending local experiences, secret spots, and adventure tours in Cape Town.",
    story: "This app reveals Cape Town’s hidden gems and authentic tours most visitors miss.",
    features: ["Interactive hidden maps", "Local guides", "Adventure bookings", "User travel tips"],
    techstack: ["React", "Node.js", "MongoDB", "Google Maps API"],
    lessons: "Learned about user-generated content and seamless map integration.",
    liveDemoLink: "https://www.downwithdough.co.za",
    imageSrc: "Images/DWD-logo.jpg",
    bgColor: "#f0f9ff"
  }
];

// GSAP animations and enhancements
function loadProject() {
  const id = parseInt(new URLSearchParams(location.search).get('project'), 10);
  const p = projects[id - 1];
  if (!p) return alert('Project not found.');

  const el = (id) => document.getElementById(id);
  el('project-title').innerText = p.title;
  el('project-description').innerText = p.description;
  el('project-story').innerHTML = `<p>${p.story}</p>`;
  el('project-features').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
  el('project-techstack').innerHTML = p.techstack.map(t => `<li class="tech-badge">${t}</li>`).join('');
  el('project-lessons').innerText = p.lessons;
  el('project-content').style.backgroundColor = p.bgColor;
  el('project-progress').innerText = `Project ${id} of ${projects.length}`;

  // GSAP fade-in animations
  gsap.from(el('project-title'), { opacity: 0, y: -50, duration: 1 });
  gsap.from(el('project-description'), { opacity: 0, y: 50, duration: 1, delay: 0.2 });
  gsap.from(el('project-story'), { opacity: 0, y: 50, duration: 1, delay: 0.4 });
  gsap.from(el('project-features'), { opacity: 0, y: 50, duration: 1, delay: 0.6 });
  gsap.from(el('project-techstack'), { opacity: 0, y: 50, duration: 1, delay: 0.8 });
  gsap.from(el('project-lessons'), { opacity: 0, y: 50, duration: 1, delay: 1 });

  // Image fade-in and append
  const img = document.createElement('img');
  img.src = p.imageSrc;
  img.alt = p.title;
  img.classList.add('project-img');
  const imgContainer = el('project-image');
  imgContainer.innerHTML = '';
  imgContainer.appendChild(img);
  gsap.from(img, { opacity: 0, scale: 0.5, duration: 1, delay: 1.2 });

  // Live demo button
  const demoBtn = el('live-demo');
  if (p.liveDemoLink) {
    demoBtn.href = p.liveDemoLink;
    demoBtn.style.display = 'inline-block';
    gsap.from(demoBtn, { opacity: 0, x: -50, duration: 0.8, delay: 1.5 });
  } else {
    demoBtn.style.display = 'none';
  }

  // Card flip effect
  const projectContent = el('project-content');
  projectContent.classList.add('card-flip');
  gsap.from(projectContent, { rotationY: 180, duration: 1, ease: 'power4.out' });

  // Hover interactions for image wrapper
  gsap.utils.toArray('.project-image-wrapper').forEach((imgWrapper) => {
    imgWrapper.addEventListener('mouseenter', () => {
      gsap.to(imgWrapper, { rotation: 10, scale: 1.05, duration: 0.5 });
    });
    imgWrapper.addEventListener('mouseleave', () => {
      gsap.to(imgWrapper, { rotation: 0, scale: 1, duration: 0.5 });
    });
  });

  // Navigation click handlers
  el('prev-project').onclick = () => navigateTo(id - 1);
  el('next-project').onclick = () => navigateTo(id + 1);

  // Container fade-in
  gsap.from('.project-container', { opacity: 0, y: 50, duration: 1.5 });
  gsap.from('.project-header', { opacity: 0, scale: 0.5, duration: 1.5 });
  gsap.from('.project-body', { opacity: 0, duration: 2 });
}

function navigateTo(id) {
  if (id < 1 || id > projects.length) return;
  showLoadingScreen();
  setTimeout(() => location.href = `Projects.html?project=${id}`, 300);
}

function showLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.style.display = 'flex';
    screen.classList.remove('fade-out');
  }
}

function hideLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.classList.add('fade-out');
    screen.addEventListener('transitionend', () => {
      screen.style.display = 'none';
    }, { once: true });
  }
}

window.addEventListener('load', () => {
  loadProject();
  setTimeout(() => {
    document.getElementById('project-content').style.opacity = 1;
    hideLoadingScreen();
  }, 300);
});

window.addEventListener('keydown', (e) => {
  const id = parseInt(new URLSearchParams(location.search).get('project'), 10);
  if (e.key === 'ArrowLeft') navigateTo(id - 1);
  else if (e.key === 'ArrowRight') navigateTo(id + 1);
});

