const mongoose = require("mongoose");
var UserDB = require("../model/model");

exports.create = (req, res) => {
  const user = new UserDB({
    active: "yes",
    status: "0",
  });

  user
    .save(user)
    .then((data) => {
      res.send(data._id);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occoured while creating a create operation",
      });
    });
};

exports.leavingUserUpdate = (req, res) => {
  const userid = req.params.id;
  console.log("Leaving userid is: ", userid);

  UserDB.updateOne({ _id: userid }, { $set: { active: "no", status: "0" } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${userid} Maybe user not found!`,
        });
      } else {
        res.send("1 document updated");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};
exports.updateOnOtherUserClosing = (req, res) => {
  const userid = req.params.id;
  console.log("Leaving userid is: ", userid);

  UserDB.updateOne({ _id: userid }, { $set: { active: "yes", status: "0" } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${userid} Maybe user not found!`,
        });
      } else {
        res.send("1 document updated");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

// exports.newUserUpdate = (req, res) => {
//   const userid = req.params.id;
//   console.log("Revisited userid is: ", userid);

//   UserDB.updateOne({ _id: userid }, { $set: { active: "yes" } })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update user with ${userid} Maybe user not found!`,
//         });
//       } else {
//         res.send("1 document updated");
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error update user information" });
//     });
// };
exports.newUserUpdate = (req, res) => {
  const userid = req.params.id;

  // Step 2: Check if the omeID exists in the MongoDB Atlas database
  UserDB.findOne({ _id: userid })
    .then((user) => {
      if (user) {
        // omeID exists in the database, you can proceed with your logic here
        UserDB.updateOne({ _id: userid }, { $set: { active: "yes" } })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update user with ${userid} Maybe user not found!`,
              });
            } else {
              res.send("1 document updated");
            }
          })
          .catch((err) => {
            res.status(500).send({ message: "Error update user information" });
          });
        console.log("omeID exists in the database.");
        // Do any further actions here...
      } else {
        // omeID does not exist in the database
        console.log("omeID does not exist in the database.");

        // Step 3: Remove the omeID from localStorage
        // localStorage.removeItem("omeID");

        // Step 4: Create a new user in MongoDB and obtain the new user's ID

        const newUser = new UserDB({
          active: "yes",
          status: "0",
        });
        newUser
          .save(newUser)
          .then((data) => {
            // Obtain the new user's ID from the saved data
            const newUserID = data._id;

            // Step 5: Use the obtained user ID (newUserID) as the new omeID
            var newOmeID = newUserID;

            // Step 6: Store the new omeID in both MongoDB and the browser's localStorage
            // Store the new omeID in localStorage
            // localStorage.setItem("omeID", newOmeID);
            res.send({ omeID: newOmeID });
          })
          .catch((err) => {
            console.error("Error saving new user to the database:", err);
            // Handle any errors that occur during saving the new user
          });
      }
    })
    .catch((err) => {
      console.error("Error querying the database:", err);
      // Handle any errors that occur during database query
    });
};

exports.updateOnEngagement = (req, res) => {
  const userid = req.params.id;
  console.log("Revisited userid is: ", userid);

  UserDB.updateOne({ _id: userid }, { $set: { status: "1" } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${userid} Maybe user not found!`,
        });
      } else {
        res.send("1 document updated");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};
exports.updateOnNext = (req, res) => {
  const userid = req.params.id;
  console.log("Revisited userid is: ", userid);

  UserDB.updateOne({ _id: userid }, { $set: { status: "0" } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${userid} Maybe user not found!`,
        });
      } else {
        res.send("1 document updated");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};
function isValidObjectId(id) {
  // Check if the ID is a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    const objectId = new mongoose.Types.ObjectId(id);
    const idString = objectId.toString();

    // Check if the resulting ID string matches the original input
    if (id === idString) {
      return true;
    }
  }

  return false;
}
exports.remoteUserFind = (req, res) => {
  const omeID = req.body.omeID;

  if (isValidObjectId(omeID)) {
    UserDB.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(omeID) },
          active: "yes",
          status: "0",
        },
      },
      { $sample: { size: 1 } },
    ])
      .limit(1)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving user information.",
        });
      });
  } else {
    console.log("Invalid ID");
  }
};

exports.getNextUser = (req, res) => {
  const omeID = req.body.omeID;
  const remoteUser = req.body.remoteUser;
  let excludedIds = [omeID, remoteUser];

  UserDB.aggregate([
    {
      $match: {
        _id: { $nin: excludedIds.map((id) => new mongoose.Types.ObjectId(id)) },
        active: "yes",
        status: "0",
      },
    },
    { $sample: { size: 1 } },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occured while retriving user information.",
      });
    });
};
exports.deleteAllRecords = (req, res) => {
  UserDB.deleteMany({})
    .then(() => {
      res.send("All records deleted successfully");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all records",
      });
    });
};
