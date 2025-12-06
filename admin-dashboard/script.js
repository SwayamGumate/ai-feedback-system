// Configuration - Update with your deployed backend URL
const API_URL = 'http://localhost:3000';
let adminPassword = '';
let autoRefreshInterval = null;
let allFeedback = [];

// DOM Elements
const authOverlay = document.getElementById('authOverlay');
const authForm = document.getElementById('authForm');
const passwordInput = document.getElementById('passwordInput');
const authBtn = document.getElementById('authBtn');
const authError = document.getElementById('authError');
const dashboard = document.getElementById('dashboard');
const refreshBtn = document.getElementById('refreshBtn');
const autoRefreshToggle = document.getElementById('autoRefreshToggle');
const searchInput = document.getElementById('searchInput');
const ratingFilter = document.getElementById('ratingFilter');
const sentimentFilter = document.getElementById('sentimentFilter');
const feedbackList = document.getElementById('feedbackList');
const emptyState = document.getElementById('emptyState');

// Analytics elements
const totalReviews = document.getElementById('totalReviews');
const avgRating = document.getElementById('avgRating');
const positiveCount = document.getElementById('positiveCount');
const negativeCount = document.getElementById('negativeCount');

// Authentication
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    authBtn.classList.add('loading');
    authError.textContent = '';

    try {
        // Test the password by making an API call
        const response = await fetch(`${API_URL}/api/admin/feedback`, {
            headers: {
                'X-Admin-Password': password
            }
        });

        if (response.ok) {
            adminPassword = password;
            authOverlay.classList.add('hidden');
            dashboard.classList.add('visible');
            loadDashboardData();
        } else {
            authError.textContent = 'Invalid password. Please try again.';
            passwordInput.value = '';
        }
    } catch (error) {
        console.error('Authentication error:', error);
        authError.textContent = 'Connection error. Is the backend running?';
    } finally {
        authBtn.classList.remove('loading');
    }
});

// Load dashboard data
async function loadDashboardData() {
    try {
        // Fetch feedback and analytics
        const [feedbackResponse, analyticsResponse] = await Promise.all([
            fetch(`${API_URL}/api/admin/feedback`, {
                headers: { 'X-Admin-Password': adminPassword }
            }),
            fetch(`${API_URL}/api/admin/analytics`, {
                headers: { 'X-Admin-Password': adminPassword }
            })
        ]);

        if (!feedbackResponse.ok || !analyticsResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const feedbackData = await feedbackResponse.json();
        const analyticsData = await analyticsResponse.json();

        allFeedback = feedbackData.feedback || [];

        updateAnalytics(analyticsData.analytics);
        displayFeedback(allFeedback);

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update analytics display
function updateAnalytics(analytics) {
    totalReviews.textContent = analytics.totalReviews || 0;
    avgRating.textContent = analytics.averageRating ? analytics.averageRating.toFixed(1) : '0.0';
    positiveCount.textContent = analytics.sentimentDistribution?.positive || 0;
    negativeCount.textContent = analytics.sentimentDistribution?.negative || 0;
}

// Display feedback cards
function displayFeedback(feedback) {
    if (!feedback || feedback.length === 0) {
        feedbackList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    feedbackList.innerHTML = feedback.map(item => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const sentimentClass = item.sentiment || 'neutral';
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);

        return `
            <div class="feedback-card">
                <div class="feedback-header">
                    <div class="rating-badge ${sentimentClass}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        ${item.rating}/5 ${stars}
                    </div>
                    <div class="timestamp">${formattedDate}</div>
                </div>
                
                <p class="review-text">${escapeHtml(item.review)}</p>
                
                ${item.summary ? `
                    <div class="ai-summary">
                        <div class="ai-summary-label">AI Summary</div>
                        <div class="ai-summary-text">${escapeHtml(item.summary)}</div>
                    </div>
                ` : ''}
                
                ${item.recommendedActions && item.recommendedActions.length > 0 ? `
                    <div class="recommended-actions">
                        <h4>Recommended Actions</h4>
                        <ul class="actions-list">
                            ${item.recommendedActions.map(action =>
            `<li>${escapeHtml(action)}</li>`
        ).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Filter feedback
function filterFeedback() {
    const searchTerm = searchInput.value.toLowerCase();
    const ratingValue = ratingFilter.value;
    const sentimentValue = sentimentFilter.value;

    let filtered = allFeedback;

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(item =>
            item.review.toLowerCase().includes(searchTerm) ||
            (item.summary && item.summary.toLowerCase().includes(searchTerm))
        );
    }

    // Rating filter
    if (ratingValue !== 'all') {
        filtered = filtered.filter(item => item.rating === parseInt(ratingValue));
    }

    // Sentiment filter
    if (sentimentValue !== 'all') {
        filtered = filtered.filter(item => item.sentiment === sentimentValue);
    }

    displayFeedback(filtered);
}

// Event listeners for filters
searchInput.addEventListener('input', filterFeedback);
ratingFilter.addEventListener('change', filterFeedback);
sentimentFilter.addEventListener('change', filterFeedback);

// Refresh button
refreshBtn.addEventListener('click', () => {
    refreshBtn.style.transform = 'rotate(360deg)';
    loadDashboardData();
    setTimeout(() => {
        refreshBtn.style.transform = '';
    }, 600);
});

// Auto-refresh toggle
autoRefreshToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        // Refresh every 30 seconds
        autoRefreshInterval = setInterval(loadDashboardData, 30000);
        console.log('Auto-refresh enabled (30s interval)');
    } else {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
        console.log('Auto-refresh disabled');
    }
});

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
console.log('Admin dashboard initialized');
console.log('API URL:', API_URL);
