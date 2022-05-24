const ShoppingCart = require("../models/shoppingcart");

module.exports = {
    index, 
    create,
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const carts = await ShoppingCart.find({user: req.user}).populate('user').exec()
        res.status(200).json({carts})
    } catch(err){
        console.log(err)
    }
}

async function create(req, res){
    console.log(req.file, 'THIS THE BODY FOR THE CART -> ', req.body, 'this is create method', req.user)
    try {
        let cart;
        if (req.body.shop){
            console.log("THE SHOP CALL HAS BEEN TRIGGERED")
            cart = await ShoppingCart.create({shop: req.body.shop, user: req.user});
        } else {
            cart = await ShoppingCart.create({user: req.user});
        }
        
        console.log(cart, "THIS IS THE NEW ShoppingCart")
        await cart.populate('user');
        res.status(201).json({cart: cart})
        
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

