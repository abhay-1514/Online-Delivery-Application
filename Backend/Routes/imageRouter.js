const express = require('express');
const router = express.Router();
const path = require('path');

// Serve images from the uploads folder
router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/', filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send('Image not found');
      }
    });
  });

module.exports = router;