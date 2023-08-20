const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

connectDB();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "Assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "Assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "Assets/js")));

app.use("/", require("./Server/routes/router"));

var server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  allowEIO3: true, //False by default
});

var userConnection = [];

io.on("connection", (socket) => {
  console.log("Socket id is: ", socket.id);
  socket.emit("mySocketId", socket.id);
  socket.on("userconnect", (data) => {
    console.log("Logged in username", data.displayName);
    userConnection.push({
      connectionId: socket.id,
      user_id: data.displayName,
      engaged: false,
    });
    userConnection.map(function (user) {
      const use = { "userid: ": user.user_id, Engaged: user.engaged };
      console.log(use);
    });
    var userCount = userConnection.length;
    console.log("UserCount", userCount);
    userConnection.map(function (user) {
      console.log("Username is: ", user.user_id);
      console.log("Engaged is: ", user.engaged);
    });
  });
  // socket.to(socket.id).emit("socketid", socket.id);
  socket.on("findUnengagedUser", (data) => {
    const unengagedUser = userConnection.find(
      (user) => !user.engaged && user.connectionId !== socket.id
    );
    // const firstUser = userConnection.find(
    //   (user) => user.connectionId !== data.username
    // );
    if (unengagedUser) {
      const senderUser = userConnection.find(
        (user) => user.connectionId === socket.id
      );
      if (senderUser) {
        senderUser.engaged = true;
        console.log("UserUser is", senderUser);
      }

      unengagedUser.engaged = true;
      // firstUser.engaged = true;
      // console.log("firstUser", firstUser.engaged);
      socket.emit("startChat", unengagedUser.connectionId);
      console.log("engaged user", unengagedUser.engaged);
    }
  });
  socket.on("findNextUnengagedUser", (data) => {
    const availableUsers = userConnection.filter(
      (user) =>
        !user.engaged &&
        user.connectionId !== socket.id &&
        user.connectionId !== data.remoteUser
    );

    if (availableUsers.length > 0) {
      const randomUser =
        availableUsers[Math.floor(Math.random() * availableUsers.length)];
      randomUser.engaged = true;
      socket.emit("startChat", randomUser.connectionId);
    }
  });
  socket.on("offerSentToRemote", (data) => {
    var offerReceiver = userConnection.find(
      (o) => o.user_id === data.remoteUser
    );
    if (offerReceiver) {
      console.log("OfferReceiver user is: ", offerReceiver.connectionId);
      socket.to(offerReceiver.connectionId).emit("ReceiveOffer", data);
    }
  });
  socket.on("answerSentToUser1", (data) => {
    var answerReceiver = userConnection.find(
      (o) => o.user_id === data.receiver
    );
    if (answerReceiver) {
      console.log("answerReceiver user is: ", answerReceiver.connectionId);
      socket.to(answerReceiver.connectionId).emit("ReceiveAnswer", data);
    }
  });
  socket.on("candidateSentToUser", (data) => {
    var candidateReceiver = userConnection.find(
      (o) => o.user_id === data.remoteUser
    );
    userConnection.map(function (user) {
      const use = { "userid: ": user.user_id, Engaged: user.engaged };
      console.log(use);
    });
    if (candidateReceiver) {
      console.log(
        "candidateReceiver user is: ",
        candidateReceiver.connectionId
      );
      socket.to(candidateReceiver.connectionId).emit("candidateReceiver", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // var disUser = userConnection.find((p) => (p.connectionId = socket.id));
    // if (disUser) {
    // Reset engagement status of the disconnected user
    // const disconnectedUser = connectedUsers.find(user => user.socketId === socket.id);
    // if (disconnectedUser) {
    //   disconnectedUser.engaged = false;
    // }

    userConnection = userConnection.filter((p) => p.connectionId !== socket.id);
    console.log(
      "Rest users username are: ",
      userConnection.map(function (user) {
        return { "userid: ": user.user_id, Engaged: user.engaged };
      })
    );
    // }
  });
  socket.on("remoteUserClosed", (data) => {
    var closedUser = userConnection.find((o) => o.user_id === data.remoteUser);
    if (closedUser) {
      console.log("closedUser user is: ", closedUser.connectionId);
      closedUser.engaged = false;
      socket.to(closedUser.connectionId).emit("closedRemoteUser", data);
    }
  });

  function myFunction() {
    userConnection.map(function (user) {
      const use = { "userid: ": user.user_id, Engaged: user.engaged };
      console.log(use);
    });
  }

  // const interval = setInterval(myFunction, 2000); // 2000 milliseconds = 2 seconds

  // To stop the interval after a certain number of repetitions (e.g., stop after 10 times):
  // const repetitions = 10;
  // let count = 0;

  // const interval = setInterval(() => {
  //   myFunction();

  //   count++;
  //   if (count === repetitions) {
  //     clearInterval(interval); // Stop the interval
  //   }
  // }, 2000);
});
