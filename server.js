const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/NewBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique
  },
});

const upload = multer({ storage: storage });

const requestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, // Add imageUrl field to store the URL of the uploaded image
  likes: { type: Number, default: 0 },
});

const Request = mongoose.model("Request", requestSchema);

// Create a new request with image upload
app.post("/requests", upload.single("image"), async (req, res) => {
  try {
    const { residentName, content } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get the path of the uploaded image if available
    const newRequest = new Request({ residentName, content, imageUrl });
    const savedRequest = await newRequest.save();
    res.json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all requests
app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Delete a request
app.delete("/requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndDelete(id);
    res.json({
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
