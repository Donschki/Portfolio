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

        // 🔥 Close mobile menu if it's open
        if (burger.classList.contains('toggle')) {
          burger.classList.remove('toggle');
          navMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
});


const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const body = document.body;
const links = document.querySelectorAll('.nav-links li');

let menuOpen = false;

// Timeline for opening
const openMenu = gsap.timeline({ paused: true });

openMenu
  .set(navLinks, { display: "flex" })
  .to(navLinks, { right: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
  .to('.burger span:nth-child(1)', { rotate: 45, y: 8, duration: 0.3, ease: "power2.out" }, "<")
  .to('.burger span:nth-child(2)', { opacity: 0, duration: 0.2, ease: "power2.out" }, "<")
  .to('.burger span:nth-child(3)', { rotate: -45, y: -8, duration: 0.3, ease: "power2.out" }, "<")
  .to(links, { 
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.3"); // << now .to(), not .from()

// Timeline for closing
const closeMenu = gsap.timeline({ paused: true });

closeMenu
  .to(links, { 
    y: 20,
    opacity: 0,
    stagger: 0.05,
    duration: 0.3,
    ease: "power2.in"
  })
  .to(navLinks, { right: "-100%", opacity: 0, duration: 0.4, ease: "power2.in" })
  .to('.burger span:nth-child(1)', { rotate: 0, y: 0, duration: 0.3, ease: "power2.in" }, "<")
  .to('.burger span:nth-child(2)', { opacity: 1, duration: 0.2, ease: "power2.in" }, "<")
  .to('.burger span:nth-child(3)', { rotate: 0, y: 0, duration: 0.3, ease: "power2.in" }, "<");

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

// Close when clicking outside
document.addEventListener('click', (event) => {
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

// GSAP hover effect for nav links
const navItems = document.querySelectorAll('.nav-links li');

navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, { 
      scale: 1.1, 
      color: 'var(--accent-color)', // Change color on hover
      duration: 0.3, 
      ease: 'power2.out' 
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, { 
      scale: 1, 
      color: 'var(--text-color-light)', // Return to the original color
      duration: 0.3, 
      ease: 'power2.in' 
    });
  });
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

// Sticky Sections hidden after scroll down and reappear on scroll up
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.sticky-section');
  
  if (!sections.length) return; // Early exit if no sections found

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

// Extract handler to separate function for better readability
function handleIntersect(section) {
  return (entries) => {
    for (const entry of entries) {
      section.classList.toggle('hidden', entry.isIntersecting);
    }
  };
}

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



document.addEventListener('DOMContentLoaded', function () {
  // Fun facts array
  const facts = [
    "I build websites faster than my coffee cools down.",
    "Once drew a full cityscape pixel by pixel.",
    "Dream project: Making an interactive web novel.",
    "I'm a huge fan of minimalistic design!",
    "My code is my canvas, and the web is my gallery."
  ];

  // Add fun facts when clicking on cards
  ['webdev', 'design', 'problem', 'coffee'].forEach((id, i) => {
    const card = document.getElementById(`card-${id}`);
    if (card) card.onclick = () =>
      card.querySelector('.card-back').innerText = facts[i];
  });

  // Card animations and hover effects
  const cards = document.querySelectorAll('.card');

  gsap.from(cards, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out"
  });

  cards.forEach(card => {
    // Hover effect: Grow and rotate slightly with faster transition
    card.addEventListener('mouseenter', () =>
      gsap.to(card, {
        scale: 1.05,
        rotation: 8, // Increased rotation for more dramatic effect
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.2, // Reduced duration for faster effect
        ease: "power1.out" // Quicker easing function for snappier feel
      })
    );
    
    // Return effect on mouse leave with quicker transition
    card.addEventListener('mouseleave', () =>
      gsap.to(card, {
        scale: 1,
        rotation: 0,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        duration: 0.2, // Reduced duration for faster effect
        ease: "elastic.out(1, 0.4)"
      })
    );

    // Flip effect on click
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      
      // Faster animation for flipping card
      const inner = card.querySelector('.card-inner');
      gsap.to(inner, {
        rotationY: card.classList.contains('flipped') ? 180 : 0,
        duration: 0.4, // Reduced duration for a faster flip
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







