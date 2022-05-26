const express = require("express");
const router = express.Router();
const storeCtrl = require("../../controllers/stores");
const itemCtrl = require("../../controllers/items");
const multer = require("multer");
const store = require("../../models/store");
const upload = multer();
/*---------- Public Routes ----------*/
router.get("/", storeCtrl.index);
router.post('/', upload.single('photo'), storeCtrl.create)
router.get("/:store_id/main", storeCtrl.details);
router.post('/:store_id/:item_id', itemCtrl.find)

/*---------- Protected Routes ----------*/

module.exports = router;
