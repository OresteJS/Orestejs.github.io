const toggleButton = document.querySelector(".toggle-button");
const toolbarGroup = document.querySelector(".tab-group");
const toolbar = document.querySelector(".toolbar-content");
const tabs = document.querySelectorAll(".tab");

/* toggle tab-group for mobile view  */
toggleButton.addEventListener("click", () => {
    toggleNavBar();
});

/* toggle tab-group for mobile view, when clicked on tab */
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        toggleNavBar();
    });
});

function toggleNavBar() {
    toolbarGroup.classList.toggle("active");
    toolbar.classList.toggle("active");

    // animate Burger Button
    toggleButton.classList.toggle("change");
}