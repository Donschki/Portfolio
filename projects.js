const projects = [
    {
      title: "La Colombiana",
      description: "A rich cultural e-commerce website showcasing Colombian art and tradition.",
      story: "This project was inspired by my love for Colombian art. The goal was to create an immersive experience for users, showcasing not just products, but the rich history and culture behind them.",
      features: [
        "Interactive art galleries",
        "E-commerce functionality",
        "Cultural storytelling",
        "User profiles and reviews"
      ],
      techstack: [
        "WordPress", "PHP", "CSS3", "JavaScript"
      ],
      lessons: "I learned how to integrate WordPress with custom plugins for a dynamic e-commerce experience, and how to craft a cultural narrative through digital design.",
      liveDemoLink: "https://lacolombiana.co.za",
      imageSrc: "Images/Logo-With-Lady-800x400-3.png",
      bgColor: "#f9f9f9"
    },
    {
      title: "Root'd",
      description: "A community gardening app connecting urban farmers through smart mapping and real-time chats.",
      story: "Root'd is born from a passion for urban agriculture. This app allows city dwellers to share resources, garden plots, and connect with others in their local gardening community.",
      features: [
        "Real-time chat for gardeners",
        "Map integration for plant tracking",
        "Weather alerts for garden care",
        "User gardening profile pages"
      ],
      techstack: [
        "Node.js", "Express", "MongoDB", "Socket.io"
      ],
      lessons: "I learned how to integrate real-time communications into an app using Socket.io and gained insights into geolocation and map-based technologies for urban gardening.",
      liveDemoLink: "https://rootdsa.co.za",
      imageSrc: "Images/rootd-white.png",
      bgColor: "#fff0f0"
    },
    {
      title: "Get Out In Cape Town",
      description: "A travel guide app blending local experiences, secret spots, and adventure tours in Cape Town.",
      story: "Cape Town has so many hidden gems. This app aims to give travelers a local perspective, offering secret spots and off-the-beaten-path tours that most tourists miss.",
      features: [
        "Interactive maps with hidden spots",
        "Local tour guides",
        "Adventure activity booking",
        "User-generated travel tips"
      ],
      techstack: [
        "React", "Node.js", "MongoDB", "Google Maps API"
      ],
      lessons: "I delved into the power of user-generated content and map APIs while learning how to integrate location-based services seamlessly into an app for a better user experience.",
      liveDemoLink: "https://getoutin.co.za",
      imageSrc: "Images/GetOutInLogo-SVG.svg",
      bgColor: "#f0f9ff"
    },
    {
      title: "Down With Dough Bakery",
      description: "A travel guide app blending local experiences, secret spots, and adventure tours in Cape Town.",
      story: "Cape Town has so many hidden gems. This app aims to give travelers a local perspective, offering secret spots and off-the-beaten-path tours that most tourists miss.",
      features: [
        "Interactive maps with hidden spots",
        "Local tour guides",
        "Adventure activity booking",
        "User-generated travel tips"
      ],
      techstack: [
        "React", "Node.js", "MongoDB", "Google Maps API"
      ],
      lessons: "I delved into the power of user-generated content and map APIs while learning how to integrate location-based services seamlessly into an app for a better user experience.",
      liveDemoLink: "https://www.downwithdough.co.za",
      imageSrc: "Images/DWD-logo.jpg",
      bgColor: "#f0f9ff"
    }
  ];
  
  // Load project details based on the URL query
function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const projectId = parseInt(params.get('project'), 10);

  if (projectId >= 1 && projectId <= projects.length) {
    const projectData = projects[projectId - 1]; // Get the correct project data based on the ID

    // Set Title and Description
    document.getElementById('project-title').innerText = projectData.title;
    document.getElementById('project-description').innerText = projectData.description;

    // Set the Image
    const projectImageContainer = document.getElementById('project-image');
    projectImageContainer.innerHTML = ''; // Clear previous image
    const newImg = document.createElement('img');
    newImg.src = projectData.imageSrc;
    newImg.alt = projectData.title;
    newImg.classList.add('project-img');
    projectImageContainer.appendChild(newImg);

    // Inject the project story
    document.getElementById('project-story').innerHTML = `<p>${projectData.story}</p>`;

    // Inject features and tech stack
    document.getElementById('project-features').innerHTML = projectData.features.map(feature => `<li>${feature}</li>`).join('');
    document.getElementById('project-techstack').innerHTML = projectData.techstack.map(tech => `<li class="tech-badge">${tech}</li>`).join('');

    // Inject lessons learned
    document.getElementById('project-lessons').innerText = projectData.lessons;

    // Set background color for the project section
    document.getElementById('project-content').style.backgroundColor = projectData.bgColor;

    // Update progress bar text
    document.getElementById('project-progress').innerText = `Project ${projectId} of ${projects.length}`;

    // Update the "View Live" button link
    const liveDemoButton = document.getElementById('live-demo');
    if (projectData.liveDemoLink) {
      liveDemoButton.href = projectData.liveDemoLink;
      liveDemoButton.style.display = 'inline-block'; // Make sure it's visible
    } else {
      liveDemoButton.style.display = 'none'; // Hide if no live link available
    }

    // Set up navigation buttons (Previous/Next)
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');

    prevButton.onclick = function () {
      if (projectId > 1) {
        showLoadingScreen();
        setTimeout(() => {
          window.location.href = `Projects.html?project=${projectId - 1}`;
        }, 300);
      }
    };

    nextButton.onclick = function () {
      if (projectId < projects.length) {
        showLoadingScreen();
        setTimeout(() => {
          window.location.href = `Projects.html?project=${projectId + 1}`;
        }, 300);
      }
    };
  } else {
    alert('Project not found.');
  }
}

  // Show the loading screen
  function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
      loadingScreen.classList.remove('fade-out'); // Remove fade-out if user is navigating again
    }
  }
  
  // Hide the loading screen (with fade-out)
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      loadingScreen.addEventListener('transitionend', function () {
        loadingScreen.style.display = 'none';
      }, { once: true });
    }
  }
  
  // When the page fully loads
  window.addEventListener('load', function () {
    // Load project first
    loadProject();
  
    // Small timeout to ensure images are rendered
    setTimeout(() => {
      document.getElementById('project-content').style.opacity = 1;
      hideLoadingScreen();
    }, 300); // delay can be adjusted
  });
  
  // Keyboard navigation (arrows)
  window.addEventListener('keydown', function (e) {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('project'), 10);
  
    if (e.key === 'ArrowLeft' && projectId > 1) {
      showLoadingScreen();
      setTimeout(() => {
        window.location.href = `Projects.html?project=${projectId - 1}`;
      }, 300);
    } else if (e.key === 'ArrowRight' && projectId < projects.length) {
      showLoadingScreen();
      setTimeout(() => {
        window.location.href = `Projects.html?project=${projectId + 1}`;
      }, 300);
    }
  });
  