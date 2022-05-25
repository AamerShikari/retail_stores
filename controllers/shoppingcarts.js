const ShoppingCart = require("../models/shoppingcart");
const Item = require("../models/item");
const { ConfigurationServicePlaceholders } = require("aws-sdk/lib/config_service_placeholders");

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
        const carts = await ShoppingCart.find({user: req.user}).populate('user').populate('shop').exec()
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
        let cart;
        if(req.body.type === "shop"){
            cart = await ShoppingCart.find({shop: req.body.id}).populate('shop').exec()
        } else {
            cart = await ShoppingCart.find({user: req.body.id}).populate('user').exec()
        }
        const item = await Item.find({id: req.body.item})
        console.log(item, "Item old")
        const newItem = await Item.create({name: item.name+ " : In Cart3", quantity: req.body.quantity, price: item.price, isPurchased: false, photoUrl: item.photoUrl});
        console.log(req.body.quantity);
        console.log(typeof(req.body.quantity), "quantity req")
        console.log(typeof(item[0].quantity), "quantity item")
        item[0].quantity = item[0].quantity - Number(req.body.quantity);
        console.log(item[0].quantity)
        console.log(item, "Item old fixed")
        // console.log(newItem, "Item new")
        // console.log(cart, "Carty boi")
        // cart.items.push(newItem)

        // console.log(cart, "<- value of cart")

    } catch (err) {
        console.log(err);
    }
}