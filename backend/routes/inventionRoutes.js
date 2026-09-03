const express = require('express');
const Groq = require('groq-sdk');
const { GoogleGenAI } = require('@google/genai');
const catalogItems = require('../data/items');

const router = express.Router();

// Helper to sanitize score values between 0 and 100
const sanitizeScore = (val, fallback = 75) => {
  const num = Number(val);
  if (isNaN(num)) return fallback;
  return Math.max(0, Math.min(100, Math.round(num)));
};

// @route   POST /api/inventions/generate
// @desc    Generate a funny useless invention using Groq AI from 2-3 selected items
router.post('/generate', async (req, res) => {
  try {
    const { items } = req.body;

    // 1. Validate that items is provided as an array
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be provided as an array (e.g. { "items": ["bucket", "spoon"] })'
      });
    }

    // 2. Validate selection count (minimum 2, maximum 3)
    if (items.length < 2 || items.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'Please select a minimum of 2 and a maximum of 3 items'
      });
    }

    // 3. Normalize strings and check for duplicate items
    const normalizedItems = items.map((item) => {
      if (typeof item === 'string') return item.trim().toLowerCase();
      if (item && item.name) return String(item.name).trim().toLowerCase();
      return '';
    });

    const uniqueItems = new Set(normalizedItems);
    if (uniqueItems.size !== normalizedItems.length) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate items are not allowed'
      });
    }

    // 4. Validate that all selected items exist in the catalog
    const catalogMap = new Map(
      catalogItems.map((item) => [item.name.toLowerCase(), item.name])
    );

    const matchedNames = [];
    const invalidItems = [];

    for (const item of normalizedItems) {
      if (catalogMap.has(item)) {
        matchedNames.push(catalogMap.get(item));
      } else {
        invalidItems.push(item);
      }
    }

    if (invalidItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid item(s): "${invalidItems.join(', ')}". All items must be valid objects from the catalog.`
      });
    }

    // 5. Verify AI API key is present (Gemini or Groq)
    const rawGeminiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
    const geminiKey = (rawGeminiKey && rawGeminiKey !== 'your_gemini_api_key_here') ? rawGeminiKey : null;
    const groqKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : '';

    if (!geminiKey && !groqKey) {
      return res.status(500).json({
        success: false,
        message: 'No AI API key found. Please add a valid GEMINI_API_KEY or GROQ_API_KEY in your .env file.'
      });
    }

    // 7. Define AI prompts with simple, funny, meme-style cartoon logic
    const systemPrompt = `
You are the HEAD INVENTOR of "ITHENTHINA?", a comedy game where people combine normal objects to create the most hilariously useless invention possible.

The user's selected objects are:

${items.join(", ")}

Your job is NOT to simply describe the objects stuck together.

Your job is to invent a NEW, ridiculous product that makes the player say:

"WHY DOES THIS EXIST?!"

==================================================
CORE INVENTION RULE
==================================================

You MUST use EVERY selected object as an important physical part of ONE single invention.

Do NOT make separate inventions.

Do NOT ignore any object.

Do NOT simply place the objects next to each other.

The objects must have a funny relationship with each other.

Think like this:

BAD:
Bucket + Spoon + Umbrella = "A bucket with a spoon and umbrella attached."

GOOD:
Bucket + Spoon + Umbrella = "A bucket with an umbrella on top and a spoon-powered rain launcher that throws the bucket's water back into the sky because the inventor is terrified of wet water."

The invention should feel like someone spent 3 hours solving a problem that never existed.

==================================================
COMEDY STYLE
==================================================

Use very simple, casual English.

Think:
- cartoon logic
- silly product commercials
- absurd startup ideas
- meme humor
- stupid inventions from a crazy genius
- "Shark Tank but everyone has lost their mind"

Avoid:
- boring descriptions
- technical explanations
- complicated engineering
- generic AI-sounding jokes
- "This innovative device..."
- "revolutionary technology..."
- random objects glued together
- jokes that have nothing to do with the objects

The humor should come from the INVENTION itself.

==================================================
MAKE THE IDEA SURPRISING
==================================================

Before writing the final answer, silently think of several possible inventions.

Reject boring ideas.

Choose the idea that is:
1. Most unexpected
2. Funniest
3. Most useless
4. Most visually interesting
5. Uses ALL objects naturally
6. Sounds like a product someone would unbelievably try to sell

IMPORTANT:

Do NOT always use the obvious function of an object.

Twist the normal purpose of the objects.

For example:

Spoon + Fan

BORING:
"A fan attached to a spoon."

FUN:
"A soup spoon with a tiny fan that blows the soup away from your mouth because it is designed to stop you from accidentally eating your food too quickly."

Shoe + Alarm Clock

BORING:
"An alarm clock attached to a shoe."

FUN:
"A shoe alarm that runs away when the alarm rings, forcing you to chase your own alarm before you can turn it off."

Toothbrush + Banana

BORING:
"A banana-shaped toothbrush."

FUN:
"A banana with toothbrush bristles that brushes your teeth while you eat it, leaving you with minty banana toothpaste."

The goal is NOT just weirdness.

The goal is:

WEIRD + LOGICAL + USELESS + FUNNY.

==================================================
FUNNY PRODUCT NAME
==================================================

The invention name is extremely important.

Create a short, catchy name that sounds like a real ridiculous product.

Use:
- silly word combinations
- fake brand names
- exaggerated product names
- puns
- dramatic names for stupid products
- words that make the product sound unnecessarily serious

Examples of the STYLE:

"SoupShot 3000"
"DryWater Pro"
"NapTrap"
"ToothBanana"
"RunAlarm"
"BucketShield Ultra"

Do NOT copy these names.

Create a NEW name based on the actual invention.

The name should make sense AFTER seeing the invention.

Avoid boring names like:
"Smart Bucket"
"Multi-Function Spoon"
"Umbrella Bucket System"
"Advanced Object Combiner"

==================================================
THE INVENTION MUST HAVE A DUMB PURPOSE
==================================================

Every invention needs a stupid problem.

Examples:

Problem:
"My soup is arriving at my mouth too safely."

Solution:
"A spoon with a fan that blows the soup away."

Problem:
"My bucket's water might get wet."

Solution:
"An umbrella for the bucket."

Problem:
"My alarm is too easy to turn off."

Solution:
"An alarm clock that runs away."

The problem should be something that makes the player laugh.

==================================================
IMAGE PROMPT
==================================================

Create an imagePrompt for a future image-generation model.

The image must show ONE physical invention.

Describe:
- every selected object
- how each object is physically attached
- the shape of the final invention
- important funny visual details

Use this style:

"Photorealistic commercial product photography, clean white studio background, showing [INVENTION]. The [OBJECT 1] is physically attached to [OBJECT 2]..., [OBJECT 3] is mounted..., absurd but believable physical construction, detailed materials, realistic lighting, centered product shot."

The image must make the invention immediately understandable.

==================================================
QUALITY CHECK
==================================================

Before returning the answer, silently check:

Did I use EVERY selected object?

Are all objects part of ONE invention?

Is the invention genuinely funny?

Is the idea unexpected?

Is the problem stupid enough?

Is the name catchy and funny?

Could the invention be visually shown in one image?

Does it avoid generic AI wording?

Would a person laugh when reading it?

Is it more creative than simply attaching the objects together?

If the idea feels boring, throw it away and invent another one.

==================================================
SCORES
==================================================

Give whole-number scores from 1 to 100.

Do not give random high scores.

Use these meanings:

uselessness:
How completely unnecessary is this invention?

creativity:
How original and clever is the stupid idea?

ridiculousness:
How absurd is the invention?

engineeringAbsurdity:
How hilariously wrong is the physical design?

overall:
The final entertainment value of the invention.

==================================================
ROAST
==================================================

Write ONE short savage joke about the invention.

The roast should attack the PRODUCT, not the player.

Example style:

"Finally, a product that makes you miss having normal problems."

or

"Somewhere, a perfectly good spoon is begging to be rescued."

Keep it short.

==================================================
OUTPUT
==================================================

Return ONLY valid JSON.

Do not use markdown.

Do not include explanations outside the JSON.

Use exactly this structure:

{
  "name": "Funny catchy invention name",
  "idea": "One very simple sentence explaining the whole invention, how it works, and why it is silly or useless",
  "problemSolved": "The silly, non-existent problem this invention solves",
  "marketDemand": "How much people would want this product (e.g. 'Very low. Almost nobody needs this.')",
  "complexity": "How hard it is to make (e.g. 'Very easy. Just put an umbrella on a bucket.')",
  "environment": "What happens to the environment because of this product (e.g. 'Bad. Creates useless plastic waste.')",
  "price": "Funny absurd price",
  "scores": {
    "uselessness": 0,
    "creativity": 0,
    "ridiculousness": 0,
    "wasteOfMoney": 0,
    "overall": 0
  },
  "roast": "One short funny roast",
  "imagePrompt": "Simple detailed description of the physical product on a clean white background for an image model"
}
`;

    const userPrompt = `Create a super funny, completely useless invention using ALL of these items: ${matchedNames.join(', ')}. Keep the words simple, silly, and hilarious!`;

    // 8. Call Gemini (preferred, funny & free) or Groq
    let aiContent = '';

    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const modelsToTry = [
        'gemini-3.5-flash-lite',
        'gemini-flash-latest',
        'gemini-3.5-flash',
        process.env.GEMINI_MODEL
      ].filter(Boolean);

      let lastError = null;
      for (const m of modelsToTry) {
        try {
          const geminiResponse = await ai.models.generateContent({
            model: m,
            contents: userPrompt,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: 'application/json',
              temperature: 1.0
            }
          });
          aiContent = geminiResponse.text;
          if (aiContent) break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!aiContent && lastError) {
        throw lastError;
      }
    } else {
      const groq = new Groq({ apiKey: groqKey });
      const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8
      });
      aiContent = completion.choices[0]?.message?.content;
    }

    if (!aiContent) {
      throw new Error('No content returned from AI');
    }

    const invention = JSON.parse(aiContent);

    // 9. Ensure scores are bounded between 0 and 100
    if (invention.scores) {
      invention.scores.uselessness = sanitizeScore(invention.scores.uselessness);
      invention.scores.creativity = sanitizeScore(invention.scores.creativity);
      invention.scores.ridiculousness = sanitizeScore(invention.scores.ridiculousness);
      invention.scores.wasteOfMoney = sanitizeScore(invention.scores.wasteOfMoney || invention.scores.engineeringAbsurdity);
      invention.scores.overall = sanitizeScore(invention.scores.overall);
      delete invention.scores.engineeringAbsurdity;
    }

    // 10. Return the structured invention
    return res.status(200).json({
      success: true,
      selectedItems: matchedNames,
      invention
    });
  } catch (error) {
    console.error('Invention generation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating invention'
    });
  }
});

module.exports = router;
