// Initialize EmailJS with your new public key
emailjs.init('h4ODndc48ho0JOjHM');

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mobile menu toggle
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
let burger = document.querySelector('.burger');

if (!burger) {
  burger = document.createElement('div');
  burger.classList.add('burger');
  burger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  nav.appendChild(burger);
}

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('toggle');
  document.body.classList.toggle('menu-open'); // Toggle body class for menu-open state
});

// Close the menu when clicking outside of the burger or menu
document.addEventListener('click', function (event) {
  if (!burger.contains(event.target) && !navLinks.contains(event.target) && !header.contains(event.target)) {
    navLinks.classList.remove('active');
    burger.classList.remove('toggle');
    document.body.classList.remove('menu-open');
  }
});

// Header hide on scroll down, show on scroll up
let lastScrollTop = 0;
const scrollThreshold = 50; // optional: don't hide immediately on tiny scrolls

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Scroll down
      header.classList.add('hidden');
    } else {
      // Scroll up
      header.classList.remove('hidden');
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Form submission handler
const form = document.querySelector("form");
const loadingScreen = document.getElementById('loading-screen'); // Get the loading screen

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Show the loading screen
    loadingScreen.style.display = 'flex'; // Make the loader visible

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
        form.reset(); // Optional: reset form fields
      })
      .catch(error => {
        console.error('Failed to send email:', error);
        alert(`Oops! Something went wrong.\n${error.text || 'Check console for details.'}`);
      })
      .finally(() => {
        // Hide the loading screen after the request finishes (either success or error)
        loadingScreen.style.display = 'none';
      });
  });
}

// Page loader fade-out
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  loader.classList.add('fade-out');
});

// Fun facts for each card
const facts = [
  "I build websites faster than my coffee cools down.",
  "Once drew a full cityscape pixel by pixel.",
  "Dream project: Making an interactive web novel.",
  "I'm a huge fan of minimalistic design!",
  "My code is my canvas, and the web is my gallery."
];

// Assigning unique fun facts to each card
document.getElementById('card-webdev').onclick = function () {
  this.querySelector('.card-back').innerText = facts[0];  // Web Developer fact
};

document.getElementById('card-design').onclick = function () {
  this.querySelector('.card-back').innerText = facts[1];  // Design fact
};

document.getElementById('card-problem').onclick = function () {
  this.querySelector('.card-back').innerText = facts[2];  // Problem Solver fact
};

document.getElementById('card-coffee').onclick = function () {
  this.querySelector('.card-back').innerText = facts[3];  // Coffee Lover fact
};

// Add event listeners to each card to toggle the flipped class on click and mouse/touch leave
document.querySelectorAll('.card').forEach(card => {
  // Add click functionality to flip the card
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  // Mouse events for desktop
  card.addEventListener('mouseenter', () => {
    const clickIndicator = document.createElement('div');
    clickIndicator.classList.add('click-indicator');
    clickIndicator.innerText = "Click Me!";
    card.appendChild(clickIndicator);
  });

  // Move the "Click Me!" indicator as mouse moves over the card
  card.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - card.offsetLeft;
    const mouseY = e.clientY - card.offsetTop;

    const clickIndicator = card.querySelector('.click-indicator');
    if (clickIndicator) {
      clickIndicator.style.left = `${mouseX}px`;
      clickIndicator.style.top = `${mouseY}px`;
    }
  });

  // Remove the "Click Me!" indicator when mouse leaves the card
  card.addEventListener('mouseleave', () => {
    const clickIndicator = card.querySelector('.click-indicator');
    if (clickIndicator) {
      card.removeChild(clickIndicator);
    }
  });
});




