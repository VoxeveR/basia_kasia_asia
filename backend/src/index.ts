import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";
import { migrate } from "../db/migrate";

const app = express();
const PORT = 3000;

const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

migrate(db);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + SQLite + TypeScript working!");
});


app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;

  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, email });
    }
  );
});

app.get("/users", (_req: Request, res: Response) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
