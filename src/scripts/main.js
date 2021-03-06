// general script operations

// imports
import { Swiper, Navigation, Pagination, A11y } from "swiper"; // https://swiperjs.com/api/
//import Swiper from "swiper/bundle"; // import swiper with all modules for testing

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, A11y]);

function initNewsSwipers() {
	document.querySelectorAll(".news-swiper").forEach((newsSwiperElement) => {
		const newsSwiper = new Swiper(newsSwiperElement, {
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
				renderFraction: function (currentClass, totalClass) {
					return '<span class="' + currentClass + '"></span>' + "/" + '<span class="' + totalClass + '"></span>';
				},
			},
		});
	});
}

function initArticleSwipers() {
	document.querySelectorAll(".article-swiper-outer").forEach((articleSwiperElementOuter) => {
		const articleSwiperElement = articleSwiperElementOuter.querySelector(".article-swiper");
		const swiperButtonNext = articleSwiperElementOuter.querySelector(".swiper-button-next");
		const swiperButtonPrev = articleSwiperElementOuter.querySelector(".swiper-button-prev");
		const articleSwiper = new Swiper(articleSwiperElement, {
			slidesPerView: 1,
			spaceBetween: 50,
			loop: true,
			loopAdditionalSlides: 10, // make sure we have enough cloned slides
			navigation: {
				nextEl: swiperButtonNext,
				prevEl: swiperButtonPrev,
			},
			pagination: false,
			breakpoints: {
				1024: {
					slidesPerView: 4,
				},
			},
		});
	});
}

var swipersInitialized = false;

function initSwipers() {
	if (!swipersInitialized) {
		initNewsSwipers();
		initArticleSwipers();
		swipersInitialized = true;
	}
}

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

	// toggle modals on news-card click
	document.querySelectorAll(".news-card").forEach((newsCard) => {
		newsCard.addEventListener("click", (e) => {
			e.preventDefault();

			document.querySelector(".custom-modals").classList.add("opened");
			bodyElement.classList.add("prevent-scrolling");

			if (newsCard.classList.contains("news-card--dates")) {
				document.querySelector(".dates-modal").classList.add("opened");
			} else {
				document.querySelector(".news-modal").classList.add("opened");
				initSwipers();
			}
		});
	});

	function closeModals() {
		document.querySelector(".custom-modals").classList.remove("opened");
		bodyElement.classList.remove("prevent-scrolling");

		document.querySelectorAll(".custom-modal").forEach((customModal) => {
			customModal.classList.remove("opened");
		});
	}

	// close modals with close button
	document.querySelector(".custom-modals__button--close").addEventListener("click", (e) => {
		e.preventDefault();
		closeModals();
	});

	const customModalsWrapper = document.querySelector(".custom-modals");
	customModalsWrapper.addEventListener("click", (mouseEvent) => {
		// if clicked outside of modal content
		if (mouseEvent.target === customModalsWrapper) {
			closeModals();
		}
	});

	document.querySelector(".nav-top__logo").addEventListener("click", () => {
		closeModals();
	});

	// add / remove expanded classes from about-us-image-timeline
	const allImageTimelineCircles = document.querySelectorAll(".about-us-image-timeline .circle");
	allImageTimelineCircles.forEach((circle) => {
		circle.addEventListener("click", (e) => {
			allImageTimelineCircles.forEach((circleTemp) => {
				circleTemp.classList.remove("expanded");
			});
			circle.classList.add("expanded");
		});
	});

	// update year in the footer
	document.querySelector(".current-year").innerHTML = new Date().getFullYear();

	// validate form
	document.querySelector("form").addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("form submitted");
	});
});
