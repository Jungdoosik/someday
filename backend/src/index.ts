import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import prisma from "./lib/prisma";
import { startScheduler } from "./jobs/alarm";

const PORT = process.env.PORT || 3000;

startScheduler();
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    startScheduler();
    console.log("🚀 Scheduler started");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
