// ===== Theme Toggle =====
const toggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        sunIcon.classList.remove("hidden-icon");
        sunIcon.classList.add("visible-icon");

        moonIcon.classList.remove("visible-icon");
        moonIcon.classList.add("hidden-icon");
    } else {
        sunIcon.classList.remove("visible-icon");
        sunIcon.classList.add("hidden-icon");

        moonIcon.classList.remove("hidden-icon");
        moonIcon.classList.add("visible-icon");
    }
});

// Initial state
sunIcon.classList.add("hidden-icon");
moonIcon.classList.add("visible-icon");

const btn = document.getElementById('categoriesBtn');
const dropdown = document.getElementById('dropdownMenu');
const arrowIcon = document.getElementById('arrowIcon');
const wrapper = document.getElementById('categories-wrapper');

btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');

    // Toggle white color on arrow
    arrowIcon.classList.toggle('text-white');
    arrowIcon.classList.toggle('text-[#7a44f3]');
});

document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        dropdown.classList.add('hidden');
        arrowIcon.classList.remove('text-white');
        arrowIcon.classList.add('text-[#7a44f3]');
    }
});

// ===== Horizontal Carousel (Track Slider) =====
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 0) {
        const itemWidth = items[0].getBoundingClientRect().width + 20; // Including gap
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

nextBtn?.addEventListener('click', () => {
    const items = document.querySelectorAll('.carousel-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// ===== 3D Carousel (Cube-style) =====
const cubeCarousel = document.getElementById("carousel");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function goToSlide(index) {
    currentSlide = index;
    const angle = 90 * index;
    if (cubeCarousel) {
        cubeCarousel.style.transform = `rotateX(-${angle}deg)`;
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}



let autoScrollInterval;
let isHovered = false;
let isDotClicked = false;

// Auto-rotate every 5 seconds
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (!isHovered && !isDotClicked) {
            currentSlide = (currentSlide + 1) % 4;
            goToSlide(currentSlide);
        }
    }, 5000);
}

// Stop auto-scroll
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start auto-scroll initially
startAutoScroll();

// Pause when mouse hovers over carousel
cubeCarousel.addEventListener("mouseenter", () => {
    isHovered = true;
});

cubeCarousel.addEventListener("mouseleave", () => {
    isHovered = false;
    isDotClicked = false; // resume auto scroll after hover
});

// Pause auto-scroll for 10 seconds when a dot is clicked
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        goToSlide(i);
        isDotClicked = true;
        clearTimeout(dotClickTimeout);
        dotClickTimeout = setTimeout(() => {
            isDotClicked = false;
        }, 7000); // pause for 10 seconds
    });
});

let dotClickTimeout;