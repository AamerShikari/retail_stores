const express = require("express");
const router = express.Router();
const storeCtrl = require("../../controllers/stores");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
router.get("/", storeCtrl.index);
router.post('/', upload.single('photo'), storeCtrl.create)

/*---------- Protected Routes ----------*/

module.exports = router;
