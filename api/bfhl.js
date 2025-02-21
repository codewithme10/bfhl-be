
const express = require("express");
const app = express();

app.use(express.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// We'll handle GET and POST on "/"
app.all("/", (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({ operation_code: 1 });
  } else if (req.method === "POST") {
    try {
      const { data } = req.body;
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: "Invalid input. 'data' must be an array."
        });
      }

      const numbers = [];
      const alphabets = [];
      data.forEach((item) => {
        if (/^\d+$/.test(item)) {
          numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item);
        }
      });

      let highest_alphabet = [];
      if (alphabets.length) {
        let max = alphabets[0];
        alphabets.forEach((letter) => {
          if (letter.toUpperCase() > max.toUpperCase()) {
            max = letter;
          }
        });
        highest_alphabet.push(max);
      }

      return res.status(200).json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_alphabet
      });
    } catch (error) {
      return res.status(500).json({
        is_success: false,
        message: "Server error: " + error.toString()
      });
    }
  } else {
  
    return res.status(405).json({ message: "Method Not Allowed" });
  }
});

module.exports = app;
