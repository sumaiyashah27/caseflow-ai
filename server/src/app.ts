import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json, urlencoded } from "express";
import authRoutes from "./routes/auth";
import aiRoutes from "./routes/ai";
import docRoutes from "./routes/documents";
import caseRoutes from "./routes/cases";
import searchRoutes from "./routes/search";
import { initDb } from "./services/db";
import { ensureIndex } from "./services/elastic";

const app = express();
app.use(helmet());
app.use(cors());
app.use(json({ limit: "2mb" }));
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, message: "CaseFlow AI backend is healthy 🚀" })
);

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/documents", docRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/search", searchRoutes);

initDb()
  .then(() => console.log("DB ready"))
  .catch(console.error);
ensureIndex()
  .then(() => console.log("Elasticsearch ready"))
  .catch(console.error);

export default app;
