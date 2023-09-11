const axios = require("axios");
// Import the requireAuth middleware
const requireAuth = require("./middleware");

exports.homeRoutes = (req, res) => {
  res.render("index");
};
exports.video_chat = (req, res) => {
  res.render("video_chat");
};
exports.text_chat = (req, res) => {
  res.render("text_chat");
};
exports.admin = (req, res) => {
  res.render("admin");
};
exports.login = (req, res) => {
  res.render("login");
};

// Define the profile route with the middleware
exports.profile = [
  requireAuth,
  (req, res) => {
    res.render("profile");
  },
];
