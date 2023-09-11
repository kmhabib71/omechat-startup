// JavaScript to open and close the modal

// Get the Sign Up modal and buttons
const modal = document.getElementById("signupModal");
const inmodal = document.getElementById("signinModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Open the modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";

  modal.classList.add("fade-in");
});

// Close the modal when the close button or outside the modal is clicked
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("fade-out"); // Add fade-out class
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fade-out"); // Remove fade-out class
  }, 300); // Set the timeout to match the animation duration (0.5s)
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fade-out"); // Remove fade-out class
    }, 300); // Set the timeout to match the animation duration (0.5s)
  }
});

// Prevent the form from submitting (this is just a basic example)
// const signupForm = document.getElementById("signupForm");
// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // You can add form validation and submission logic here
// });
const loginPrompt = document.getElementById("loginPrompt");
// Get the Sign In modal and buttons
const inModal = document.getElementById("signinModal");
const openInModalBtn = document.getElementById("openInModalBtn");
const closeINModalBtn = document.getElementById("closeInModalBtn");

// Open the modal
loginPrompt.addEventListener("click", () => {
  modal.style.display = "none";
  modal.classList.remove("fade-out");

  inModal.style.display = "block";
  inModal.classList.add("fade-in");
});

openInModalBtn.addEventListener("click", () => {
  inModal.style.display = "block";

  inModal.classList.add("fade-in");
});

// Close the modal when the close button or outside the modal is clicked
closeINModalBtn.addEventListener("click", () => {
  inModal.classList.add("fade-out"); // Add fade-out class
  setTimeout(() => {
    inModal.style.display = "none";
    inModal.classList.remove("fade-out"); // Remove fade-out class
  }, 300); // Set the timeout to match the animation duration (0.5s)
});

window.addEventListener("click", (e) => {
  if (e.target == inModal) {
    inModal.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
      inModal.style.display = "none";
      inModal.classList.remove("fade-out"); // Remove fade-out class
    }, 300); // Set the timeout to match the animation duration (0.5s)
  }
});

// Prevent the form from submitting (this is just a basic example)
// const signInForm = document.getElementById("signInForm");
// signInForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // You can add form validation and submission logic here
// });

signupPrompt.addEventListener("click", () => {
  inModal.style.display = "none";
  inModal.classList.add("fade-out");

  modal.style.display = "block";
  modal.classList.remove("fade-in");
});

// ...........Processing SignUp data............

const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  let isValid = true;

  // Reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(emailInput.value)) {
    isValid = false;
    emailError.textContent = "Invalid email format";
  }

  // Validate password (e.g., at least 8 characters)
  if (passwordInput.value.length < 8) {
    isValid = false;
    passwordError.textContent = "Password must be at least 8 characters long";
  }

  // Validate confirmPassword (must match password)
  if (passwordInput.value !== confirmPasswordInput.value) {
    isValid = false;
    confirmPasswordError.textContent = "Passwords do not match";
  }

  if (!isValid) {
    e.preventDefault(); // Prevent form submission if there are errors
  } else {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // If passwords match, proceed with registration
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });
    const messageContainer = document.getElementById("messageContainer");

    if (response.ok) {
      // Clear any previous messages
      messageContainer.textContent = "";

      // Create a success message element
      const successMessage = document.createElement("div");
      successMessage.classList.add("success-message"); // Apply CSS styling if needed
      successMessage.textContent = "Registration successful";

      // Append the success message to the message container
      messageContainer.appendChild(successMessage);

      // Optionally, you can set a timeout to clear the message after a few seconds
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 5000); // Clear message after 5 seconds (adjust as needed)
      // Redirect or perform other actions as needed
      modal.style.display = "none";
      modal.classList.add("fade-out");
      emailInput.value = "";
      passwordInput.value = "";
      confirmPasswordInput.value = "";
    } else {
      // messageContainer.textContent = "Registration failed";
      const errorMessages = await response.text(); // Get the error message from the response
      const errorMessageJSON = JSON.parse(errorMessages);

      // Extract the message property
      const errorMessage = errorMessageJSON.message;
      const successMessage = document.createElement("div");
      successMessage.classList.add("fail-message"); // Apply CSS styling if needed
      successMessage.textContent = errorMessage;

      // Append the success message to the message container
      messageContainer.appendChild(successMessage);

      // Optionally, you can set a timeout to clear the message after a few seconds
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 5000); // Clear message after 5 seconds (adjust as needed)
    }
  }
});
// ...........Processing SignIn data............

const signInForm = document.getElementById("signInForm");
const inemailInput = document.getElementById("inEmail");
const inpasswordInput = document.getElementById("inPassword");

const inemailError = document.getElementById("inemailError");
const inpasswordError = document.getElementById("inpasswordError");

document.getElementById("signInForm").addEventListener("submit", async (e) => {
  let inisValid = true;

  // Reset error messages
  inemailError.textContent = "";
  inpasswordError.textContent = "";

  // Validate email
  const inemailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!inemailPattern.test(inemailInput.value)) {
    inisValid = false;
    inemailError.textContent = "Invalid email format";
  }

  // Validate password (e.g., at least 8 characters)
  if (inpasswordInput.value.length < 8) {
    inisValid = false;
    inpasswordError.textContent = "Password must be at least 8 characters long";
  }

  // Validate confirmPassword (must match password)
  // if (passwordInput.value !== confirmPasswordInput.value) {
  //   isValid = false;
  //   confirmPasswordError.textContent = "Passwords do not match";
  // }

  if (!inisValid) {
    e.preventDefault(); // Prevent form submission if there are errors
  } else {
    e.preventDefault();

    const inemail = document.getElementById("inEmail").value;
    const inpassword = document.getElementById("inPassword").value;

    // If passwords match, proceed with registration
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inemail, inpassword }),
    });
    const messageContainer = document.getElementById("messageContainer");

    if (response.ok) {
      // Clear any previous messages
      messageContainer.textContent = "";

      // Create a success message element
      const successMessage = document.createElement("div");
      successMessage.classList.add("success-message"); // Apply CSS styling if needed
      successMessage.textContent = "Login successful";

      // Append the success message to the message container
      messageContainer.appendChild(successMessage);

      // Optionally, you can set a timeout to clear the message after a few seconds
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 5000); // Clear message after 5 seconds (adjust as needed)
      // Redirect or perform other actions as needed
      inmodal.style.display = "none";
      inmodal.classList.add("fade-out");
      inemailInput.value = "";
      inpasswordInput.value = "";
    } else {
      // messageContainer.textContent = "Registration failed";
      const errorMessages = await response.text(); // Get the error message from the response
      const errorMessageJSON = JSON.parse(errorMessages);

      // Extract the message property
      const errorMessage = errorMessageJSON.message;
      const successMessage = document.createElement("div");
      successMessage.classList.add("fail-message"); // Apply CSS styling if needed
      successMessage.textContent = errorMessage;

      // Append the success message to the message container
      messageContainer.appendChild(successMessage);

      // Optionally, you can set a timeout to clear the message after a few seconds
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 5000); // Clear message after 5 seconds (adjust as needed)
    }
  }
});
