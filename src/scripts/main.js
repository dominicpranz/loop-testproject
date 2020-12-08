// general script operations

window.addEventListener("DOMContentLoaded", (event) => {
	// nav toggle
	const burgerIcon = document.querySelector(".burger-icon");
	const navMenu = document.querySelector(".nav-top__menu");
	const bodyElement = document.querySelector("body");
	const toggleNav = () => {
		burgerIcon.classList.toggle("opened");
		navMenu.classList.toggle("opened");
		bodyElement.classList.toggle("prevent-scrolling");
	};

	// nav toggle click event
	burgerIcon.addEventListener("click", toggleNav);
	// when a link inside the nav is clicked
	navMenu.querySelectorAll("a").forEach((navLink) => {
		navLink.addEventListener("click", toggleNav);
	});
});
