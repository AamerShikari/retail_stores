const express = require("express");
const router = express.Router();
const itemCtrl = require("../../controllers/items");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
router.get("/", itemCtrl.index);
router.post('/', upload.single('photo'), itemCtrl.create)
router.get("/:item_id", itemCtrl.find)

/*---------- Protected Routes ----------*/

module.exports = router;
