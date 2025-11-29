const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const uploadFolder = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static(uploadFolder));

// **Mock in-memory DB**
let events = [];

// CREATE Event
app.post("/api/events", (req, res) => {
  const newEvent = { ...req.body, id: Date.now().toString() };
  events.push(newEvent);
  res.json(newEvent);
});

// READ ALL Events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// READ Event by ID
app.get("/api/events/:id", (req, res) => {
  const ev = events.find((e) => e.id === req.params.id);
  if (!ev) return res.status(404).send("Not found");
  res.json(ev);
});

// UPDATE Event
app.put("/api/events/:id", (req, res) => {
  const idx = events.findIndex((e) => e.id === req.params.id);
  if (idx < 0) return res.status(404).send("Not found");
  events[idx] = { ...events[idx], ...req.body };
  res.json(events[idx]);
});

// DELETE Event
app.delete("/api/events/:id", (req, res) => {
  events = events.filter((e) => e.id !== req.params.id);
  res.json({ ok: true });
});

// TEST route
app.get("/", (req, res) => {
  res.send("TangYoo Backend OK!");
});

// Example test API
app.get("/test", (req, res) => {
  res.json({ msg: "Hello from TangYoo backend!" });
});

// Start server
app.listen(4000, () => {
  console.log("TangYoo backend running: http://localhost:4000");
});