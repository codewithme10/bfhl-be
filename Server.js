const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Proper CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

// Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Handle preflight requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Hard-coded user details
const USER_ID = "Deepa_10";
const EMAIL = "22bcs10272@cuchd.in";
const ROLL_NUMBER = "22BCS10272";


// GET /bfhl => { operation_code: 1 }
app.get("/bfhl", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

// POST /bfhl => handle input
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array.",
      });
    }

    // Separate numeric vs alphabet
    const numbers = [];
    const alphabets = [];
    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    // Highest alphabet (case-insensitive)
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      let max = alphabets[0];
      alphabets.forEach((letter) => {
        if (letter.toUpperCase() > max.toUpperCase()) {
          max = letter;
        }
      });
      highest_alphabet.push(max);
    }

    // Return JSON
    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Server error: " + error.toString(),
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
