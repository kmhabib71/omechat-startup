const mongoose = require("mongoose");
var schema = new mongoose.Schema(
  {
    active: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["admin", "regular"],
    default: "regular",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  loginHistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      action: String,
    },
  ],
  // Address field
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  // Profile photo field
  profilePhoto: {
    type: String, // You can store the URL or file path of the profile photo
  },
  // Other user-specific fields as needed
});

const videoSessionSchema = new mongoose.Schema({
  sessionID: {
    type: String,
    unique: true,
    required: true,
  },
  participants: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User collection
        required: true,
      },
      username: String,
    },
  ],

  startTime: {
    type: Date, // Store the start time of the video session
  },
  endTime: {
    type: Date, // Store the end time of the video session
  },
  // Other session-specific fields, such as video call configuration
  duration: {
    type: Number, // Duration in milliseconds
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const VideoSession = mongoose.model("VideoSession", videoSessionSchema);
const UserDB = mongoose.model("ome", schema);
const User = mongoose.model("User", userSchema);

module.exports = { UserDB, User, VideoSession };
