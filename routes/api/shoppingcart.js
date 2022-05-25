const express = require("express");
const router = express.Router();
const shoppingcartCtrl = require("../../controllers/shoppingcarts");
/*---------- Public Routes ----------*/
router.get("/", shoppingcartCtrl.index);
router.post('/', shoppingcartCtrl.create)
router.post('/addItem', shoppingcartCtrl.add)

/*---------- Protected Routes ----------*/

module.exports = router;
