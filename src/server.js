import express from "express";
import multer from "multer";
import { toDataURL } from "qrcode";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

const app = express();
const port = 3000;

// Get the current module's file path
const currentModulePath = fileURLToPath(import.meta.url);

// Calculate the directory path
const currentDirectory = dirname(currentModulePath);

// Set up file upload using Multer
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Serve the uploaded files
app.use(express.static(join(currentDirectory, "uploads")));

// Handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("upload", req, res);
  // Save the uploaded file with a unique name
  const fileName = Date.now() + "-" + req.file.originalname;
  req.file.fileName = fileName;
  const filePath = join(currentDirectory, "uploads", fileName);

  // Move the uploaded file to the uploads directory
  writeFileSync(filePath, req.file.buffer);

  // Generate a QR code pointing to the file
  const downloadURL = `http://10.1.1.88:${port}/uploads/${fileName}`;
  const qrCode = toDataURL(downloadURL);

  // Send the QR code as a response
  qrCode.then((dataUrl) => {
    res.send(dataUrl);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
