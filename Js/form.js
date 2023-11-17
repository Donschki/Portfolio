

// CLICK BUTTON TO DISPLAY FORM OVERLAY

const overlay = document.getElementById("form-overlay");
const showFormBtn = document.getElementById("showFormBtn");

showFormBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});

function closeForm() {
    overlay.style.display = "none";
}


