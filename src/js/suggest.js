// -------------------------------
// SUGGEST FORM SCRIPT
// -------------------------------

// Select form + fields
const form = document.getElementById("suggest-form");
const titleInput = document.getElementById("title");
const genreInput = document.getElementById("genre");
const reasonInput = document.getElementById("reason");
const emailInput = document.getElementById("email");
const interestInput = document.getElementById("interest");

// Error message elements
const titleError = document.getElementById("title-error");
const genreError = document.getElementById("genre-error");
const reasonError = document.getElementById("reason-error");
const emailError = document.getElementById("email-error");
const interestError = document.getElementById("interest-error");
const successMessage = document.getElementById("success-message");

// -------------------------------
// VALIDATION FUNCTIONS
// -------------------------------

// Movie Title
function validateTitle() {
  if (titleInput.value.trim().length < 2) {
    titleError.textContent = "Title must be at least 2 characters.";
    return false;
  }
  titleError.textContent = "";
  return true;
}

// Genre
function validateGenre() {
  if (!genreInput.value) {
    genreError.textContent = "Please select a genre.";
    return false;
  }
  genreError.textContent = "";
  return true;
}

// Reason
function validateReason() {
  if (reasonInput.value.trim().length < 10) {
    reasonError.textContent = "Please write at least 10 characters.";
    return false;
  }
  reasonError.textContent = "";
  return true;
}

// Email (optional — only validate if filled)
function validateEmail() {
  if (emailInput.value.trim() === "") {
    emailError.textContent = "";
    return true; // email is optional
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(emailInput.value);

  if (!isValid) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }

  emailError.textContent = "";
  return true;
}

// Interest Level (optional)
function validateInterest() {
  if (interestInput.value === "") {
    interestError.textContent = "";
    return true;
  }

  const value = Number(interestInput.value);

  if (value < 1 || value > 5) {
    interestError.textContent = "Value must be between 1 and 5.";
    return false;
  }

  interestError.textContent = "";
  return true;
}

// -------------------------------
// SAVE TO LOCAL STORAGE
// -------------------------------
function saveSuggestion(data) {
  const existing = JSON.parse(localStorage.getItem("suggestions")) || [];
  existing.push(data);
  localStorage.setItem("suggestions", JSON.stringify(existing));
}

// -------------------------------
// FORM SUBMIT HANDLER
// -------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default form behavior

  // Run validations
  const validTitle = validateTitle();
  const validGenre = validateGenre();
  const validReason = validateReason();
  const validEmail = validateEmail();
  const validInterest = validateInterest();

  const formIsValid =
    validTitle && validGenre && validReason && validEmail && validInterest;

  if (!formIsValid) {
    successMessage.textContent = ""; // hide success if anything is wrong
    return; // stop submission
  }

  // Build the suggestion object
  const suggestion = {
    title: titleInput.value.trim(),
    genre: genreInput.value,
    reason: reasonInput.value.trim(),
    email: emailInput.value.trim(),
    interest: interestInput.value.trim(),
    date: new Date().toISOString()
  };

  // Save to local storage
  saveSuggestion(suggestion);

  // Success message
  successMessage.textContent = "Thank you! Your suggestion has been submitted.";
  
  // Clear the form
  form.reset();

  // Clear any error messages after reset
  titleError.textContent = "";
  genreError.textContent = "";
  reasonError.textContent = "";
  emailError.textContent = "";
  interestError.textContent = "";
});

// -------------------------------
// LIVE VALIDATION (optional but nice UX)
// -------------------------------
titleInput.addEventListener("input", validateTitle);
genreInput.addEventListener("change", validateGenre);
reasonInput.addEventListener("input", validateReason);
emailInput.addEventListener("input", validateEmail);
interestInput.addEventListener("input", validateInterest);
