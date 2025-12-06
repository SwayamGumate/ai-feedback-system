import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateUserResponse, generateSummary, generateRecommendedActions } from '../services/ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/feedback.json');

/**
 * POST /api/feedback
 * Submit new feedback with rating and review
 */
router.post('/', async (req, res) => {
    try {
        const { rating, review } = req.body;

        // Validation
        if (!rating || !review) {
            return res.status(400).json({
                error: 'Missing required fields: rating and review'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                error: 'Rating must be between 1 and 5'
            });
        }

        if (review.trim().length < 5) {
            return res.status(400).json({
                error: 'Review must be at least 5 characters long'
            });
        }

        // Generate AI responses in parallel for speed
        const [aiResponse, summary, recommendedActions] = await Promise.all([
            generateUserResponse(rating, review),
            generateSummary(review, rating),
            generateRecommendedActions(review, rating)
        ]);

        // Create feedback entry
        const feedbackEntry = {
            id: Date.now().toString(),
            rating: parseInt(rating),
            review: review.trim(),
            aiResponse,
            summary,
            recommendedActions,
            timestamp: new Date().toISOString(),
            sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative'
        };

        // Read existing data
        let feedbackData = [];
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            feedbackData = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty, start with empty array
            feedbackData = [];
        }

        // Add new feedback
        feedbackData.push(feedbackEntry);

        // Save to file
        await fs.writeFile(DATA_FILE, JSON.stringify(feedbackData, null, 2));

        // Return success with AI response
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            aiResponse,
            feedbackId: feedbackEntry.id
        });

    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({
            error: 'Failed to process feedback',
            details: error.message
        });
    }
});

export default router;
