document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.btn');

  const animationPresets = {
    left:   { x: -100, opacity: 0, scale: 0.8 },
    right:  { x: 100, opacity: 0, scale: 0.8 },
    bottom: { y: 100, opacity: 0, scale: 0.8 },
    zoom:   { scale: 0.4, opacity: 0, rotation: -10 },
  };

  const getAnimProps = (type) => {
    return animationPresets[type] || {
      x: gsap.utils.random(-80, 80),
      y: gsap.utils.random(-80, 80),
      rotation: gsap.utils.random(-25, 25),
      opacity: 0,
      scale: 0.7,
    };
  };

  const animateButton = (btn, i) => {
    gsap.from(btn, {
      ...getAnimProps(btn.dataset.anim),
      duration: 0.9,
      ease: "power3.out",
      delay: i * 0.15
    });
  };

  const handleRipple = (btn, e) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = btn.getBoundingClientRect();
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${(e.clientX || e.touches?.[0]?.clientX || 0) - rect.left - size / 2}px`;
    ripple.style.top = `${(e.clientY || e.touches?.[0]?.clientY || 0) - rect.top - size / 2}px`;
    ripple.style.background = btn.dataset.ripple || 'rgba(255,255,255,0.5)';
    ripple.style.position = 'absolute';
    ripple.style.pointerEvents = 'none';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.webkitTransform = 'translate(-50%, -50%)';

    btn.style.position = 'relative';
    btn.appendChild(ripple);

    gsap.fromTo(ripple, {
      scale: 0,
      opacity: 0.6
    }, {
      scale: 2.5,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      onComplete: () => ripple.remove()
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const btn = entry.target;
        animateButton(btn, [...buttons].indexOf(btn));
        obs.unobserve(btn);
      }
    });
  }, {
    threshold: 0.25, // Slightly lower for mobile viewports
    rootMargin: "0px 0px -10% 0px" // Helps with edge triggering
  });

  buttons.forEach(btn => {
    observer.observe(btn);

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.12,
        rotation: gsap.utils.random(-4, 4),
        duration: 0.2,
        ease: "back.out(2)"
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)"
      });
    });

    btn.addEventListener('click', (e) => {
      gsap.fromTo(btn, { scale: 1 }, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
      handleRipple(btn, e);
    });

    // Optional: mobile ripple support
    btn.addEventListener('touchstart', (e) => handleRipple(btn, e), { passive: true });
  });
});
