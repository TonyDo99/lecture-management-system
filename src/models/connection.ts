// eslint-disable-file no-console
import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.DB_URI || "";

/**
 * Function to connect to MongoDB
 */
async function connectDatabase() {
  try {
    const config: ConnectOptions = {
      // Options for a stable connection
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    await mongoose.connect(MONGO_URI, config);

    console.log("✅ Connected to MongoDB successfully !");
  } catch (error) {
    console.error("🚨 MongoDB Connection Error:", error);
  }
}

/**
 * Handle MongoDB connection errors after initial connection
 */
mongoose.connection.on("error", (err) => {
  console.error("🚨 MongoDB Connection Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected. Attempting to reconnect...");
  connectDatabase(); // Auto-reconnect
});

/**
 * Graceful shutdown
 */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("👋 MongoDB connection closed due to application termination");
  process.exit(0);
});

export default connectDatabase();
