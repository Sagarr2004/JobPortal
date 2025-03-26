
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// // import isAuthenticated from "./middlewares/isAuthenticated.js";
// // import {Job} from "./models/job.model.js"

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// // const corsOptions = {
// //     origin: function (origin, callback) {
// //         if (!origin || allowedOrigins.includes(origin)) {
// //             callback(null, true);
// //         } else {
// //             console.error(`Blocked by CORS: ${origin}`);
// //             callback(null, false);
// //         }
// //     },
// //     credentials: true
// // };

// // app.use(cors(corsOptions));

// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true, // ✅ Ensures cookies can be sent
// };
// app.use(cors(corsOptions));

// // API routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// // app.delete("/job/delete/:id", isAuthenticated, async (req, res) => {

// //     console.log("Delete Job Function Called");
// //         console.log("Job ID Received:", req.params.id);
    
// //         try {
// //             const id = req.params.id; // ✅ Corrected extraction
// //             if (!id) {
// //                 return res.status(400).json({ message: "Job ID is required.", success: false });
// //             }
    
// //             const job = await Job.findByIdAndDelete(id);
// //             if (!job) {
// //                 return res.status(404).json({ message: "Job not found.", success: false });
// //             }
    
// //             console.log("Job Deleted Successfully:", job);
// //             return res.status(200).json({ message: "Job deleted successfully.", success: true });
// //         } catch (error) {
// //             console.error("Error deleting job:", error);
// //             return res.status(500).json({ message: "Internal server error.", success: false });
// //         }
// // });


// // Global Error Handling
// app.use((err, req, res, next) => {
//     console.error("Unhandled Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
// });

// // Start server after DB connection
// const PORT = process.env.PORT || 8000;

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
//     } catch (error) {
//         console.error("❌ Database connection failed:", error);
//         process.exit(1);
//     }
// };

// startServer();



// index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import {Notification} from "./models/notifications.models.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware to inject io instance into each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/job", jobRoute);


app.delete("/api/v1/job/deleteNotifications", async (req, res) => {
    try {
      await Notification.deleteMany({}); // Delete all notifications
      res.json({ message: "Notifications deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notifications" });
    }
  });

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server after DB connection
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
