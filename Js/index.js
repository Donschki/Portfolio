

//////////////////////////SIDE_BAR_TOGGLE

let hamburger = document.querySelector (".hamburgerMenu");
let sideBar = document.querySelector (".sideBar");

// TOGGLE SIDE BAR

hamburger.addEventListener("click", () => {
    sideBar.classList.toggle("change");
    body.click.toggle("change");
    
});

// //CLICK TO REMOVE SIDE BAR

// document.querySelector('.one').addEventListener('click', () => {
//   sideBar.classList.remove('change');
// });

// document.querySelector('.two').addEventListener('click', () => {
//   sideBar.classList.remove('change');
// });

// //PROJECT SECTION -> CONTAINER ANIMATE ON SCROLL 

// const projectContainer = document.querySelectorAll('.project-container');

// const whiteWash = document.getElementsByClassName ('white-wash-animation');

// projectContainer.addEventListener('click', function(){
//    whiteWash.classList.toggle ('')
// });





