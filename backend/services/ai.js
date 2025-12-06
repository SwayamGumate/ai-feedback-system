// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

async function callOpenRouter(messages, temperature = 0.7, maxTokens = 150) {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'AI Feedback System'
        },
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: messages,
            temperature: temperature,
            max_tokens: maxTokens
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

/**
 * Generate a personalized response to user feedback
 * @param {number} rating - Star rating (1-5)
 * @param {string} review - User's review text
 * @returns {Promise<string>} AI-generated response
 */
export async function generateUserResponse(rating, review) {
    try {
        const sentiment = rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative';

        const prompt = `You are a friendly customer service representative. A customer left a ${rating}-star review: "${review}". 
    
Generate a warm, personalized response (2-3 sentences) that:
- Thanks them for their feedback
- ${sentiment === 'positive' ? 'Expresses appreciation for their kind words' : sentiment === 'neutral' ? 'Acknowledges their experience' : 'Apologizes for their experience and shows commitment to improvement'}
- Sounds genuine and human

Keep it concise and friendly.`;

        return await callOpenRouter(
            [{ role: "user", content: prompt }],
            0.7,
            150
        );
    } catch (error) {
        console.error('Error generating user response:', error);
        // Fallback response
        if (rating >= 4) {
            return "Thank you so much for your wonderful feedback! We're thrilled to hear about your positive experience. Your support means the world to us!";
        } else if (rating === 3) {
            return "Thank you for taking the time to share your feedback. We appreciate your input and are always working to improve our service.";
        } else {
            return "We sincerely apologize for not meeting your expectations. Your feedback is invaluable, and we're committed to doing better. Thank you for bringing this to our attention.";
        }
    }
}

/**
 * Generate a concise summary of the review
 * @param {string} review - User's review text
 * @param {number} rating - Star rating
 * @returns {Promise<string>} AI-generated summary
 */
export async function generateSummary(review, rating) {
    try {
        const prompt = `Summarize this ${rating}-star customer review in one concise sentence (max 15 words):
"${review}"

Focus on the key point or sentiment.`;

        return await callOpenRouter(
            [{ role: "user", content: prompt }],
            0.5,
            50
        );
    } catch (error) {
        console.error('Error generating summary:', error);
        return review.length > 50 ? review.substring(0, 50) + '...' : review;
    }
}

/**
 * Generate recommended actions based on feedback
 * @param {string} review - User's review text
 * @param {number} rating - Star rating
 * @returns {Promise<string[]>} Array of recommended actions
 */
export async function generateRecommendedActions(review, rating) {
    try {
        const prompt = `Based on this ${rating}-star customer review: "${review}"

Suggest 2-3 specific, actionable next steps for the business. Format as a simple list.
Be practical and specific to the feedback content.`;

        const response = await callOpenRouter(
            [{ role: "user", content: prompt }],
            0.6,
            150
        );

        // Parse the response into an array of actions
        const actions = response
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
            .filter(action => action.length > 0);

        return actions.slice(0, 3); // Limit to 3 actions
    } catch (error) {
        console.error('Error generating recommended actions:', error);
        // Fallback actions based on rating
        if (rating >= 4) {
            return [
                "Share positive feedback with the team",
                "Request permission to use as testimonial",
                "Send a thank you note or discount code"
            ];
        } else if (rating === 3) {
            return [
                "Follow up to understand concerns better",
                "Review internal processes for improvement",
                "Monitor similar feedback patterns"
            ];
        } else {
            return [
                "Contact customer directly to resolve issues",
                "Investigate root cause of the problem",
                "Implement corrective measures immediately"
            ];
        }
    }
}
