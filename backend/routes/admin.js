import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/feedback.json');

/**
 * Middleware to check admin password
 */
function authenticateAdmin(req, res, next) {
    const password = req.headers['x-admin-password'];

    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
            error: 'Unauthorized: Invalid admin password'
        });
    }

    next();
}

/**
 * GET /api/admin/feedback
 * Retrieve all feedback submissions
 */
router.get('/feedback', authenticateAdmin, async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const feedbackData = JSON.parse(data);

        // Sort by timestamp (newest first)
        feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            count: feedbackData.length,
            feedback: feedbackData
        });
    } catch (error) {
        console.error('Error reading feedback:', error);
        res.status(500).json({
            error: 'Failed to retrieve feedback',
            details: error.message
        });
    }
});

/**
 * GET /api/admin/analytics
 * Calculate and return analytics
 */
router.get('/analytics', authenticateAdmin, async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const feedbackData = JSON.parse(data);

        if (feedbackData.length === 0) {
            return res.json({
                success: true,
                analytics: {
                    totalReviews: 0,
                    averageRating: 0,
                    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                    sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
                    recentReviews: []
                }
            });
        }

        // Calculate analytics
        const totalReviews = feedbackData.length;
        const sumRatings = feedbackData.reduce((sum, item) => sum + item.rating, 0);
        const averageRating = (sumRatings / totalReviews).toFixed(2);

        // Rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        feedbackData.forEach(item => {
            ratingDistribution[item.rating]++;
        });

        // Sentiment distribution
        const sentimentDistribution = { positive: 0, neutral: 0, negative: 0 };
        feedbackData.forEach(item => {
            sentimentDistribution[item.sentiment]++;
        });

        // Recent reviews (last 5)
        const recentReviews = feedbackData
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        res.json({
            success: true,
            analytics: {
                totalReviews,
                averageRating: parseFloat(averageRating),
                ratingDistribution,
                sentimentDistribution,
                recentReviews
            }
        });
    } catch (error) {
        console.error('Error calculating analytics:', error);
        res.status(500).json({
            error: 'Failed to calculate analytics',
            details: error.message
        });
    }
});

export default router;
