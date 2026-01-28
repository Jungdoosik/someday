import express from "express";
import thoughtRouter from "./routes/thought";
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.json());
app.use("/thought", thoughtRouter);

export default app;
