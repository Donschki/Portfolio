

// COSTOM CURSOR

document.addEventListener("DOMContentLoaded", function () {
    const customCursor = document.getElementById("customCursor");

    document.addEventListener("mousemove", function (e) {
        // Update the position of the custom cursor based on the mouse coordinates
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
});

// CLICK HAMBURGER TO TOGGLE SIDEBAR

let hamburger = document.querySelector (".hamburgerMenu");
let sideBar = document.querySelector (".sideBar");

hamburger.addEventListener("click", () => {
    sideBar.classList.toggle("change");
    body.click.toggle("change");
    
});


// PROJECT CONTAINERS SLIDE ON SCROLL

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".project-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the data-animate attribute to determine the animation delay
                const animationDelay = entry.target.getAttribute("data-animate");

                // Apply different delays to create a staggered effect
                entry.target.style.transitionDelay = `${animationDelay * 0.5}s`;

                // Make the element visible
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.5 // Adjust the threshold as needed
    });

    // Start observing each target element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});





