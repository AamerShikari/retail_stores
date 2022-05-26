const ShoppingCart = require("../models/shoppingcart");
const Item = require("../models/item");

module.exports = {
    index, 
    create,
    add
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const carts = await ShoppingCart.find({user: req.user}).populate('user').populate('shop').populate('items').exec()
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

async function add(req, res) {
    console.log(req.body, '<- Body is here!');
    try {
        const cart = await ShoppingCart.find({_id: req.body.id}).populate('shop').populate('user').populate('items').exec()
        const item = await Item.findOneAndUpdate({id: req.body.item}, (elem) =>{
            console.log(Number(elem.quantity) - Number(req.body.quantity), "CHECK ME OUT BITCH")
            return {quantity: Number(elem.quantity) - Number(req.body.quantity)}
        })
        console.log(item, "Item old")
        const newItem = await Item.create({name: item.name+ " :In Cart2", quantity: req.body.quantity, price: item.price, isPurchased: false, photoUrl: item.photoUrl});
        cart[0].items.push(newItem);
        cart[0].save(function(err) {
            console.log(err);
        });

    } catch (err) {
        console.log(err);
    }
}