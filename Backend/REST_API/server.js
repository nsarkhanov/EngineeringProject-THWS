
const express = require("express");
const cors = require("cors");
const app = express();
//const http = require('http');
//const { Server: SocketServer } = require('socket.io');
const initRoutes = require("./app/routes/picture.routes");


//const server = http.createServer(app);
//const io = new SocketServer(server, {
//  cors: {
//    origin: 'http://localhost:4200',
//  }
//});

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
//app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// let port = 8080;
// app.listen(port, () => {
//   console.log(`Running at localhost:${port}`);
// });




// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose.set("strictQuery", false);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome Kopro mongodb connector" });
});


require("./app/routes/skill_human.routes")(app);
require("./app/routes/skill_robot.routes")(app);
require("./app/routes/criteria.routes")(app);
require("./app/routes/assembly_sequence_plan_details.routes")(app);
require("./app/routes/dimension_per_component.routes")(app);
require("./app/routes/working_area.routes")(app);
require("./app/routes/assembly_sequence_step_detail.routes")(app);
require("./app/routes/heart_rate_sensor.routes")(app);
require("./app/routes/imu_sensor.routes")(app);
require("./app/routes/brain_sensor.routes")(app);
require("./app/routes/skin_sensor.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}.`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Define the socket endpoint
io.on('connection', (socket) => {
  console.log('Client connected (socket connection)');

  // Listen for 'subscribe' events from the client
  socket.on('subscribe', (params) => {
    console.log('Received subscription:', params.graphNumber);
    
    // Get the model to watch based on the parameters
    const models = [db.brain_sensor, db.heart_rate, db.imu_sensor, db.skin_sensor];
    const model = models[params.graphNumber-1];

    const changeStream = model.watch();
    // Listen for changes in the model
    changeStream.on('change', (change) => {
      // Emit the change to the subscribed client
      socket.emit('data', change);
    });
    // Listen for an 'unsubscribe' event
    socket.on('unsubscribe', () => {
      console.log(`Unsubscribed from ${modelName}`);
      changeStream.close();
    });
  });

});

