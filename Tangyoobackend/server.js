// tangyoo-backend/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// เก็บไฟล์รูปไว้ในโฟลเดอร์ /uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const upload = multer({ dest: uploadDir });

// จำลองฐานข้อมูล event (ในความจริงจะต่อ database)
let events = {}; // { eventId: { ...data... } }

// GET event
app.get("/api/event/:id", (req, res) => {
  const event = events[req.params.id];
  if (!event) return res.status(404).json({ error: "Not found" });
  res.json(event);
});

// CREATE event
app.post("/api/event", (req, res) => {
  const id = Date.now().toString();
  const data = { ...req.body, id };
  events[id] = data;
  res.json(data);
});

// UPDATE event
app.put("/api/event/:id", (req, res) => {
  if (!events[req.params.id]) return res.status(404).json({ error: "Not found" });
  events[req.params.id] = { ...events[req.params.id], ...req.body };
  res.json(events[req.params.id]);
});

// UPLOAD รูป (cover หรือ gallery)
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  // return URL (static serve ใน dev ใช้ path ตรงนี้)
  res.json({ url: `/uploads/${req.file.filename}` });
});

// serve static files (ให้ frontend ดึงรูปที่ upload ไปแสดงได้)
app.use("/uploads", express.static(uploadDir));

// start server
app.listen(PORT, () => {
  console.log(`TangYoo backend running: http://localhost:${PORT}`);
});
