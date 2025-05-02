const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    title: "Down With Dough Bakery",
    description: "A cozy, playful bakery brand website with seasonal menu displays, animations, and ordering integration.",
    story: "Built to give a local bakery a warm online presence, this site mixes charm with responsive design and functionality.",
    features: ["Menu browser", "Online ordering integration", "Seasonal themes", "GSAP animations"],
    techstack: ["HTML5", "SCSS", "JavaScript", "GSAP"],
    lessons: "Refined responsive layout techniques and used GSAP for playful UI animations.",
    liveDemoLink: "https://www.downwithdough.co.za",
    imageSrc: "Images/DWD-logo.jpg",
    bgColor: "#fef7f3"
  }
];

// Load current project
function loadProject() {
  const id = parseInt(new URLSearchParams(location.search).get('project'), 10);
  const project = projects.find(p => p.id === id);
  if (!project) return alert('Project not found.');

  updateProjectDetails(project);
  animateProjectDetails();
  setupNavigation(project.id);
  addImageHoverEffect();
  gsap.from('.project-container', { opacity: 0, y: 50, duration: 1.5 });
}

function updateProjectDetails(project) {
  const el = (id) => document.getElementById(id);

  el('project-title').textContent = project.title;
  el('project-description').textContent = project.description;
  el('project-story').innerHTML = `<p>${project.story}</p>`;
  el('project-features').innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
  el('project-techstack').innerHTML = project.techstack.map(t => `<li class="tech-badge">${t}</li>`).join('');
  el('project-lessons').textContent = project.lessons;
  el('project-progress').textContent = `Project ${project.id} of ${projects.length}`;

  const img = document.createElement('img');
  img.src = project.imageSrc;
  img.alt = `${project.title} preview image`;
  img.classList.add('project-img');
  const imgContainer = el('project-image');
  imgContainer.innerHTML = '';
  imgContainer.appendChild(img);

  const demoBtn = el('live-demo');
  if (project.liveDemoLink) {
    demoBtn.href = project.liveDemoLink;
    demoBtn.style.display = 'inline-block';
  } else {
    demoBtn.style.display = 'none';
  }

  el('project-content').style.backgroundColor = project.bgColor || '#fff';
}

function animateProjectDetails() {
  const el = (id) => document.getElementById(id);

  gsap.from(el('project-title'), { opacity: 0, y: -30, duration: 1 });
  gsap.from('.project-body', { opacity: 0, y: 30, duration: 1.2, delay: 0.2 });
  gsap.from('.project-img', { opacity: 0, scale: 0.95, duration: 1.2, delay: 0.5 });
  gsap.from(el('live-demo'), { opacity: 0, x: -20, duration: 0.8, delay: 0.7 });

  const content = el('project-content');
  content.classList.add('card-flip');
  gsap.from(content, { rotationY: 180, duration: 1, ease: 'power4.out' });
}

function addImageHoverEffect() {
  gsap.utils.toArray('.project-image-wrapper').forEach((imgWrapper) => {
    imgWrapper.addEventListener('mouseenter', () => {
      gsap.to(imgWrapper, { rotation: 10, scale: 1.05, duration: 0.5 });
    });
    imgWrapper.addEventListener('mouseleave', () => {
      gsap.to(imgWrapper, { rotation: 0, scale: 1, duration: 0.5 });
    });
  });
}

function setupNavigation(id) {
  const el = (id) => document.getElementById(id);

  el('prev-project').onclick = () => navigateTo(id - 1 <= 0 ? projects.length : id - 1);
  el('next-project').onclick = () => navigateTo(id + 1 > projects.length ? 1 : id + 1);
}

function navigateTo(id) {
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

// Events
window.addEventListener('load', () => {
  loadProject();
  setTimeout(hideLoadingScreen, 400);
});

window.addEventListener('keydown', (e) => {
  const id = parseInt(new URLSearchParams(location.search).get('project'), 10);
  if (e.key === 'ArrowLeft') navigateTo(id - 1 <= 0 ? projects.length : id - 1);
  else if (e.key === 'ArrowRight') navigateTo(id + 1 > projects.length ? 1 : id + 1);
});
