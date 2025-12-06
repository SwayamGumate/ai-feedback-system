// Configuration - Update this with your deployed backend URL
const API_URL = 'http://localhost:3000';

// DOM Elements
const form = document.getElementById('feedbackForm');
const starRating = document.getElementById('starRating');
const ratingText = document.getElementById('ratingText');
const reviewTextarea = document.getElementById('review');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const aiResponse = document.getElementById('aiResponse');
const aiResponseText = document.getElementById('aiResponseText');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Rating text descriptions
const ratingDescriptions = {
    1: '😞 Poor - We\'re sorry to hear that',
    2: '😕 Fair - We can do better',
    3: '😐 Good - Thanks for your feedback',
    4: '😊 Very Good - We\'re glad you enjoyed it!',
    5: '🌟 Excellent - Thank you so much!'
};

// Star rating interaction
const stars = starRating.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        updateRatingDisplay();
    });

    star.addEventListener('mouseenter', () => {
        const hoverRating = parseInt(star.dataset.rating);
        highlightStars(hoverRating);
        ratingText.textContent = ratingDescriptions[hoverRating];
    });
});

starRating.addEventListener('mouseleave', () => {
    if (selectedRating > 0) {
        highlightStars(selectedRating);
        ratingText.textContent = ratingDescriptions[selectedRating];
    } else {
        ratingText.textContent = '';
    }
});

function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.style.color = 'var(--star-color)';
        } else {
            star.style.color = 'var(--star-inactive)';
        }
    });
}

function updateRatingDisplay() {
    highlightStars(selectedRating);
    ratingText.textContent = ratingDescriptions[selectedRating];

    // Check the corresponding radio button
    const radioBtn = document.getElementById(`star${selectedRating}`);
    if (radioBtn) radioBtn.checked = true;
}

// Character counter
reviewTextarea.addEventListener('input', () => {
    const count = reviewTextarea.value.length;
    charCount.textContent = count;
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous messages
    aiResponse.classList.remove('show');
    errorMessage.classList.remove('show');

    // Validate rating
    if (selectedRating === 0) {
        showError('Please select a star rating');
        return;
    }

    // Validate review
    const review = reviewTextarea.value.trim();
    if (review.length < 5) {
        showError('Please write at least 5 characters in your review');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Submit feedback to API
        const response = await fetch(`${API_URL}/api/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: selectedRating,
                review: review
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit feedback');
        }

        // Show AI response
        aiResponseText.textContent = data.aiResponse;
        aiResponse.classList.add('show');

        // Reset form
        form.reset();
        selectedRating = 0;
        ratingText.textContent = '';
        charCount.textContent = '0';
        highlightStars(0);

        // Scroll to response
        aiResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        showError(error.message || 'Failed to submit feedback. Please try again.');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Initialize
console.log('Feedback form initialized');
console.log('API URL:', API_URL);
