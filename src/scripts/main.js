// general script operations

// wait until dom elements are loaded
window.addEventListener("DOMContentLoaded", (event) => {
	// nav toggle
	const burgerIcon = document.querySelector(".burger-icon");
	const navMenu = document.querySelector(".nav-top__menu");
	const bodyElement = document.querySelector("body");
	const toggleNav = () => {
		if (window.matchMedia("(min-width: 1024px)").matches) return; // match with burger-menu breakpoint
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

	// toggle team section cards content on click on mobile
	document.querySelectorAll(".team-section__card").forEach((teamSectionCard) => {
		teamSectionCard.addEventListener("click", () => {
			teamSectionCard.classList.toggle("clicked");
		});
	});
});
