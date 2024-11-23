#!/usr/bin/env node

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generatePassword(length, options) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specials = "!@#$%^&*()_+[]{}|;:,.<>?";
  let characters = "";

  if (options.lowercase) characters += lowercase;
  if (options.uppercase) characters += uppercase;
  if (options.numbers) characters += numbers;
  if (options.specials) characters += specials;

  if (!characters) {
    throw new Error("No character types selected! Please include at least one type.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function askQuestions() {
  rl.question("Enter the desired password length: ", (lengthInput) => {
    const length = parseInt(lengthInput);
    if (isNaN(length) || length <= 0) {
      console.log("Invalid length. Please enter a positive number.");
      rl.close();
      return;
    }

    rl.question("Include lowercase letters? (y/n): ", (lowercaseInput) => {
      rl.question("Include uppercase letters? (y/n): ", (uppercaseInput) => {
        rl.question("Include numbers? (y/n): ", (numbersInput) => {
          rl.question("Include special characters? (y/n): ", (specialsInput) => {
            const options = {
              lowercase: lowercaseInput.toLowerCase() === "y",
              uppercase: uppercaseInput.toLowerCase() === "y",
              numbers: numbersInput.toLowerCase() === "y",
              specials: specialsInput.toLowerCase() === "y",
            };

            try {
              const password = generatePassword(length, options);
              console.log(`Generated Password: ${password}`);
            } catch (error) {
              console.error(error.message);
            } finally {
              rl.close();
            }
          });
        });
      });
    });
  });
}

askQuestions();
