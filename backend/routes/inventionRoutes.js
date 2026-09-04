const express = require('express');
const Groq = require('groq-sdk');
const { GoogleGenAI } = require('@google/genai');
const catalogItems = require('../data/items');
const SavedInvention = require('../models/SavedInvention');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Helper to sanitize score values between 0 and 100
const sanitizeScore = (val, fallback = 75) => {
  const num = Number(val);
  if (isNaN(num)) return fallback;
  return Math.max(0, Math.min(100, Math.round(num)));
};

// Generate an invention image via Pollinations.ai (free, no API key needed)
// Returns a direct URL the frontend can use as an <img> src
// Builds an enriched prompt from the invention name, selected items, and AI-generated imagePrompt
const generateInventionImage = (inventionName, selectedItems, imagePrompt) => {
  const itemList = selectedItems.join(' and ');
  const enrichedPrompt = [
    `Photorealistic product photography of "${inventionName}",`,
    `a single physical object that combines: ${itemList}.`,
    imagePrompt,
    'Clean white studio background, centered product, realistic studio lighting, realistic shadows, all items physically connected and clearly visible, no text, no labels, no cartoons.'
  ].join(' ');
  const encoded = encodeURIComponent(enrichedPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true&model=flux`;
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
      } else if (item && item.length > 0 && item.length <= 40) {
        matchedNames.push(item.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      } else {
        invalidItems.push(item);
      }
    }

    if (invalidItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid item(s): "${invalidItems.join(', ')}". Please provide valid items.`
      });
    }

    // 5. Special curated inventions for signature combinations
    const sortedKey = [...matchedNames].map((s) => s.toLowerCase()).sort().join('+');

    if (sortedKey === 'bucket+umbrella+wheel') {
      const invention = {
        name: 'Bucket Umbrella Simulator',
        idea: 'A wheel used to transport the bucket around while an overhead umbrella ensures the water inside the bucket never accidentally gets wet.',
        problemSolved: 'The urgent, non-existent danger that the water inside your bucket might get wet.',
        marketDemand: 'Zero — only desired by people terrified of their water getting wet.',
        complexity: 'Unnecessarily High. Requires balancing an open umbrella on a rolling bucket axle.',
        environment: 'Completely confuses rain and liquid thermodynamics.',
        price: '₹70 (Duct tape included)',
        scores: {
          uselessness: 99,
          creativity: 94,
          ridiculousness: 98,
          wasteOfMoney: 96,
          overall: 97
        },
        roast: 'Finally, a mobile contraption dedicated to protecting liquid from moisture.',
        imagePrompt: 'Photorealistic commercial product photography, clean white studio background, showing an upright plastic bucket mounted on a single sturdy wheel with an open rain umbrella bolted over the top rim shielding the inside, centered product shot, realistic studio lighting'
      };

      return res.status(200).json({
        success: true,
        selectedItems: matchedNames,
        invention,
        imageUrl: generateInventionImage(invention.name, matchedNames, invention.imagePrompt)
      });
    }

    if (sortedKey === 'book+candle+wheel') {
      const invention = {
        name: 'Rolling Study Machine',
        idea: 'The book travels around continuously on wheels while the candle provides completely unnecessary lighting and an extreme fire hazard.',
        problemSolved: 'Studying while sitting still is too easy, so the book must roll away while lit by a candle.',
        marketDemand: 'Banned by every library and fire department in the world.',
        complexity: 'Extremely hazardous. Mounting a hot open flame to a moving paper apparatus.',
        environment: 'Immediate danger to household rugs and eyebrows.',
        price: '₹75 (Extinguisher sold separately)',
        scores: {
          uselessness: 98,
          creativity: 95,
          ridiculousness: 97,
          wasteOfMoney: 95,
          overall: 96
        },
        roast: 'Guaranteed to burn 100 calories chasing your book and all your study notes in the process.',
        imagePrompt: 'Photorealistic commercial product photography, clean white studio background, showing a thick hardcover textbook fitted with rolling wheels and a lit wax candle mounted directly on the top cover, centered product shot, sharp focus, realistic studio lighting'
      };

      return res.status(200).json({
        success: true,
        selectedItems: matchedNames,
        invention,
        imageUrl: generateInventionImage(invention.name, matchedNames, invention.imagePrompt)
      });
    }

    if (sortedKey === 'fan+sock+umbrella') {
      const invention = {
        name: 'Emergency Sock Dryer',
        idea: 'The umbrella holds the sock open while the fan dries it.',
        problemSolved: 'The urgent need to dry exactly one wet sock using a massive rain canopy.',
        marketDemand: 'Zero — only people with one damp sock and severe impatience.',
        complexity: 'Medium. Requires clamping a running fan into an open umbrella skeleton.',
        environment: 'Wastes good electricity on damp cotton.',
        price: '₹65 (Damp smell extra)',
        scores: {
          uselessness: 97,
          creativity: 93,
          ridiculousness: 96,
          wasteOfMoney: 92,
          overall: 95
        },
        roast: 'Finally, an aerodynamic wind tunnel constructed exclusively for foot moisture.',
        imagePrompt: 'Photorealistic commercial product photography, clean white studio background, showing an open rain umbrella holding a single sock stretched wide open while an electric fan blows directly into the sock opening, centered product shot, realistic studio lighting'
      };

      return res.status(200).json({
        success: true,
        selectedItems: matchedNames,
        invention,
        imageUrl: generateInventionImage(invention.name, matchedNames, invention.imagePrompt)
      });
    }

    if (sortedKey === 'magnet+sunglasses+toothbrush') {
      const invention = {
        name: 'Magnetic Tooth Guardian',
        idea: 'The sunglasses protect your eyes while the magnet supposedly guides the toothbrush.',
        problemSolved: 'The terrifying danger of looking uncool while brushing, plus the fear of missing your mouth.',
        marketDemand: 'Banned by every certified dentist in the world.',
        complexity: 'Absurd. Attempting to guide oral hygiene with magnetic forces.',
        environment: 'Zero enamel protection and high eye strain in bathroom lighting.',
        price: '₹80 (Coolness guaranteed, clean teeth optional)',
        scores: {
          uselessness: 98,
          creativity: 96,
          ridiculousness: 97,
          wasteOfMoney: 94,
          overall: 96
        },
        roast: 'Finally, dental equipment that makes you look like a blind secret agent fighting plaque.',
        imagePrompt: 'Photorealistic commercial product photography, clean white studio background, showing dark sunglasses attached to a manual toothbrush with a horseshoe magnet wrapped around the bristles, centered product shot, sharp focus, realistic studio lighting'
      };

      return res.status(200).json({
        success: true,
        selectedItems: matchedNames,
        invention,
        imageUrl: generateInventionImage(invention.name, matchedNames, invention.imagePrompt)
      });
    }

    // 6. Verify AI API key is present (Gemini or Groq)
    const rawGeminiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
    const geminiKey = (rawGeminiKey && rawGeminiKey !== 'your_gemini_api_key_here') ? rawGeminiKey : null;
    const groqKey = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.trim() : '';

    if (!geminiKey && !groqKey) {
      return res.status(500).json({
        success: false,
        message: 'No AI API key found. Please add a valid GEMINI_API_KEY or GROQ_API_KEY in your .env file.'
      });
    }

    // 7. Define AI prompts with strict item adherence and comedy logic
    const selectedItemsList = matchedNames.join(', ');
    const systemPrompt = `
You are the HEAD INVENTOR of "ITHENTHINA?", a comedy game where players combine 2 or 3 everyday items into a single, hilariously useless invention.

==================================================
STRICTEST RULE: ONLY USE THE SELECTED ITEMS
==================================================
The user has chosen EXACTLY these items:
${selectedItemsList}

- You must ONLY use the chosen items: ${selectedItemsList}.
- NEVER introduce, mention, or include ANY unrelated objects, tools, or items.
- Every part of the invention, its name, description, problem solved, roast, and image prompt must strictly and exclusively revolve around: ${selectedItemsList}.

==================================================
COMEDIC FORMULA & INSPIRATION (Create similar ones)
==================================================
In our lab, every chosen item is given an absurdly overcomplicated, contradictory, or useless mechanical job:
- Example A (Bucket + Wheel + Umbrella): Name: "Bucket Umbrella Simulator" — The wheel is used to transport the bucket around, and the umbrella is used to make sure the water inside the bucket does not get wet.
- Example B (Book + Wheel + Candle): Name: "Rolling Study Machine" — The book travels around continuously on wheels while the candle provides completely unnecessary lighting.
- Example C (Umbrella + Sock + Fan): Name: "Emergency Sock Dryer" — The umbrella holds the sock open while the fan dries it.
- Example D (Toothbrush + Sunglasses + Magnet): Name: "Magnetic Tooth Guardian" — The sunglasses protect your eyes while the magnet supposedly guides the toothbrush.

When given the current items (${selectedItemsList}):
1. Assign each chosen item a ridiculous, backwards, over-engineered mechanical function.
2. Invent a clean, funny product name based DIRECTLY on the chosen items.
3. Solve a hilarious, non-existent problem.
4. Give cartoon logic, silly startup pitch, "Shark Tank gone completely mad" humor.

==================================================
FUNNY PRODUCT NAME RULES (IMPORTANT!)
==================================================
Create a clean, funny, descriptive name for this contraption based directly on the items (e.g., "Bucket Umbrella Simulator", "Rolling Study Machine", "Shoe Toasting Apparatus", "Banana Telephone Device").

DO NOT USE:
- NO numbers like "3000", "5000", "2000", "9000", or "X".
- NO cliché suffixes like "Pro", "Ultra", "Max", "Plus", "TM", or "v2".
- Keep the name simple, funny, and descriptive like "[Item] [Item] Simulator" or "[Item] [Action] Machine".

==================================================
THE DUMB PROBLEM & SILLY PURPOSE
==================================================
Create a completely useless, non-existent problem that this contraption allegedly solves using ONLY ${selectedItemsList}.

==================================================
IMAGE PROMPT (FOR IMAGE GENERATOR)
==================================================
Provide an imagePrompt that describes ONLY the physical combination of: ${selectedItemsList}.
Describe:
- How ${selectedItemsList} are physically connected together into one wacky gadget.
- Detailed realistic materials and construction.
- Clean white studio background, centered commercial product shot.
- NO people, NO human hands, NO extra background furniture, NO unrelated items.

==================================================
ROAST
==================================================
Write ONE short, savage punchline roasting this specific product and its absurd combination of ${selectedItemsList}.
Do NOT make jokes about unrelated objects or random tools.

==================================================
OUTPUT SCHEMA
==================================================
Return ONLY valid JSON with no markdown and no extra text outside the JSON:

{
  "name": "Catchy funny descriptive name like 'Bucket Umbrella Simulator' or 'Rolling Study Machine' (NO numbers, NO 3000, NO Pro/Ultra)",
  "idea": "One or two simple sentences explaining how this absurd contraption combines ${selectedItemsList} to do something completely useless",
  "problemSolved": "The non-existent, funny problem this invention pretends to solve",
  "marketDemand": "A funny short sentence explaining why nobody wants it (e.g. 'Zero — even the inventor's mom refused a free sample.', 'Banned by every school in the world.', 'Only purchased by accident at 3 AM.')",
  "complexity": "How unnecessarily complicated it is to build",
  "environment": "Humorous environmental or practical consequence",
  "price": "A small cheap amount in Rupees with a funny short remark in parentheses (e.g. '₹70 (Duct tape included)', '₹65 (Non-refundable regret)', '₹80 (Warranty void immediately)')",
  "scores": {
    "uselessness": 95,
    "creativity": 88,
    "ridiculousness": 94,
    "wasteOfMoney": 92,
    "overall": 93
  },
  "roast": "One funny savage roast specifically about this invention and the chosen items",
  "imagePrompt": "Commercial studio product photography on a clean white background showing a single contraption physically combining ${selectedItemsList}, centered shot, sharp focus, realistic textures"
}
`;

    const userPrompt = `Invent a hilarious, completely useless product made ONLY from: ${selectedItemsList}. Make sure every field in the JSON relates STRICTLY to these items and nothing else!`;


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

    // 10. Build enriched image URL from invention name, selected items, and AI imagePrompt
    const imageUrl = invention.imagePrompt
      ? generateInventionImage(invention.name, matchedNames, invention.imagePrompt)
      : null;

    // 11. Return the structured invention with image URL
    return res.status(200).json({
      success: true,
      selectedItems: matchedNames,
      invention,
      imageUrl
    });
  } catch (error) {
    console.error('Invention generation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating invention'
    });
  }
});

// @route   GET /api/inventions
// @desc    Get all saved inventions for Hall of Uselessness (newest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const savedInventions = await SavedInvention.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .lean();

    // Map each document to clean, top-level fields needed by the Hall of Uselessness
    const inventions = savedInventions.map((item) => ({
      _id: item._id,
      name: item.invention?.name || 'Untitled Invention',
      idea: item.invention?.idea || '',
      selectedItems: item.selectedItems || [],
      price: item.invention?.price || '',
      scores: item.invention?.scores || {},
      roast: item.invention?.roast || '',
      problemSolved: item.invention?.problemSolved || '',
      marketDemand: item.invention?.marketDemand || '',
      complexity: item.invention?.complexity || '',
      environment: item.invention?.environment || '',
      image: item.imageUrl || null,
      creator: item.user?.name || 'Anonymous Inventor',
      createdAt: item.createdAt
    }));

    return res.status(200).json({
      success: true,
      count: inventions.length,
      inventions
    });
  } catch (error) {
    console.error('Hall of Uselessness fetch error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching Hall of Uselessness inventions'
    });
  }
});

// @route   POST /api/inventions/save
// @desc    Save an invention to the logged-in user's history
// @access  Private (Requires Bearer token)
router.post('/save', protect, async (req, res) => {
  try {
    const { selectedItems, invention, imageUrl } = req.body;

    // 1. Validation
    if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide selectedItems as a non-empty array'
      });
    }

    if (!invention || typeof invention !== 'object' || !invention.name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid invention object with at least a name'
      });
    }

    // 2. Save to database linked to the authenticated user
    const savedInvention = await SavedInvention.create({
      user: req.user._id,
      selectedItems,
      invention,
      imageUrl: imageUrl || null
    });

    return res.status(201).json({
      success: true,
      message: 'Invention saved to history successfully',
      savedInvention
    });
  } catch (error) {
    console.error('Save invention error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error saving invention to history'
    });
  }
});

// @route   GET /api/inventions/history
// @desc    Get all saved inventions for the logged-in user
// @access  Private (Requires Bearer token)
router.get('/history', protect, async (req, res) => {
  try {
    const history = await SavedInvention.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    console.error('Fetch history error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching invention history'
    });
  }
});

// @route   DELETE /api/inventions/history/:id
// @desc    Delete a saved invention from history
// @access  Private (Requires Bearer token)
router.delete('/history/:id', protect, async (req, res) => {
  try {
    const saved = await SavedInvention.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!saved) {
      return res.status(404).json({
        success: false,
        message: 'Saved invention not found or you are not authorized to delete it'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Invention removed from history successfully'
    });
  } catch (error) {
    console.error('Delete history item error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error deleting invention from history'
    });
  }
});

module.exports = router;
