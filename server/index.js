const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMid");
const cookieParser = require("cookie-parser");
const theatreRouter = require("./routers/theatre");
const theatreFilterRouter = require("./routers/theatreFilter");
const childTheatreRouter = require("./routers/childrenTheatre");
const activityTheatreRouter = require("./routers/activity.js");
const activityFilterRouter = require("./routers/activityFilter.js");
const actorRouter = require("./routers/actor.js");
const userRoutes = require("./routers/user");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//  Static Files
app.use("/images", express.static("uploads"));
//Routers
app.use("/api/theatre", theatreRouter);
app.use("/api/theatreFilter", theatreFilterRouter);
app.use("/api/childTheatre", childTheatreRouter);
app.use("/api/activityTheatre", activityTheatreRouter);
app.use("/api/activityFilter", activityFilterRouter);
app.use("/api/actorTheatre", actorRouter);
app.use("/api/users", userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
