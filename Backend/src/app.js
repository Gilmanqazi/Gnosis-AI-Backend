import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// Routes imports
import authRouter from "./Routes/auth.route.js";
import chatRouter from "./Routes/chat.route.js";

const app = express();

// Trust proxy for secure cookies on Render/Vercel
app.set("trust proxy", 1);

// --- 🌐 MIDDLEWARE ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// --- 🔒 CORS SETUP ---
// 'origin' mein apna Vercel wala link daaliye
app.use(cors({
    origin: ["https://your-project-name.vercel.app", "http://localhost:5173"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- 🚀 HEALTH CHECK ROUTE ---
// Isse aap check kar payenge ki Render live hai ya nahi
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Gnosis AI Backend is live and running!"
    });
});

// --- 🎯 API ROUTES ---
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// --- ⚠️ GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;