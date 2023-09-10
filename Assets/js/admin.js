// Import the socket.io client library
// const io = require("socket.io-client");

const adminSocket = io("/admin"); // Use the correct namespace

adminSocket.on("connect", () => {
  console.log("Connected to the admin panel namespace");

  // Request user data from the server
  adminSocket.emit("requestUserData");

  // Receive user data from the server
  adminSocket.on("userData", (userData) => {
    console.log("Received user data from the server:", userData);
    // Handle user data received from the server
  });
  adminSocket.on("userinfo", (data) => {
    // console.log(" user connected:", data);
    var totalUsers = data.length;
    // Handle the new user connection (e.g., update the admin UI)
    const element = document.querySelector(".online-browser-number");

    // Update the content of the element with user information
    element.textContent = totalUsers;
  });

  // Your admin panel-specific socket.io logic here
});

// JavaScript to open and close the modal

// Get the modal and buttons
const modal = document.getElementById("signupModal");
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
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // You can add form validation and submission logic here
});
