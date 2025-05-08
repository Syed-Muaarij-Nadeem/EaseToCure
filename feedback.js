const slides = document.querySelectorAll('.question-slide');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
let current = 0;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'left', 'right');
        if (index === current) {
            slide.classList.add('active');
        } else if (index < current) {
            slide.classList.add('left');
        } else {
            slide.classList.add('right');
        }
    });
}

prevArrow.addEventListener('click', () => {
    if (current > 0) {
        current--;
        updateSlides();
    }
});

nextArrow.addEventListener('click', () => {
    if (current < slides.length - 1) {
        current++;
        updateSlides();
    }
});

updateSlides(); // Initialize

// ⭐ STAR RATING FUNCTIONALITY
document.querySelectorAll('.rating-stars').forEach(starContainer => {
    const stars = starContainer.querySelectorAll('.star');
    const counter = starContainer.querySelector('.rating-counter');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;

            // Fill stars
            stars.forEach((s, i) => {
                s.classList.toggle('filled', i < rating);
            });

            // Update counter
            counter.textContent = rating;
        });
    });
});


function showAlert() {
    document.getElementById('customAlert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

async function showSuccessOverlay() {
    const overlay = document.getElementById('successOverlay');
    overlay.classList.add('active');

    await setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }, 4200);
}


// ✅ Enhanced Submit Handler
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if all questions are rated
    const allRated = [...document.querySelectorAll('.rating-counter')]
        .every(counter => parseInt(counter.textContent) > 0);

    if (!allRated) {
        showAlert();
        return;
    }

    // alert("Thanks for your feedback!");
    showSuccessOverlay();
    // Reset star ratings and counters
    document.querySelectorAll('.rating-stars').forEach(starContainer => {
        const stars = starContainer.querySelectorAll('.star');
        const counter = starContainer.querySelector('.rating-counter');

        stars.forEach(star => star.classList.remove('filled'));
        counter.textContent = "0";
    });

    // Reset all input fields (text, email, number, etc.)
    document.querySelectorAll('form input').forEach(input => {
        input.value = '';
    });

    // Reset textarea (optional feedback) to empty
    const textarea = document.querySelector('form textarea');
    if (textarea) textarea.value = '';

    // Optional: Reset to first slide
    current = 0;
    updateSlides();
});
