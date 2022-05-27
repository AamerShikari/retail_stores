const ShoppingCart = require("../models/shoppingcart");
const Item = require("../models/item");
const User = require("../models/user");

module.exports = {
    index, 
    create,
    add, 
    settle
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
        console.log("Before Cart")
        const cart = await ShoppingCart.find({_id: req.body.id}).populate('shop').populate('user').populate('items').exec()
        console.log("AFter Cart")
        // const item = await Item.find({id: req.body.item}, function(err, item){
        //     console.log(item, "This is the Item from find")
        // })
        console.log(req.body.item, "Body Item")
        const item = await Item.find({_id: req.body.item});
        console.log(item, "I GOTTA KNOW")
        item[0].quantity = Number(item[0].quantity) - Number(req.body.quantity);

        const newItem = await Item.create({name: item[0].name, quantity: req.body.quantity, price: item[0].price, isPurchased: false, photoUrl: item[0].photoUrl, user: req.user});
        console.log(newItem, "with user")
        cart[0].items.push(newItem);
        cart[0].save(function(err) {
            console.log(err);
        });

        if(item[0].quantity <= 0){
            console.log("OH NO WOAH ")
            item[0].isPurchased = true
            item[0].save(function(err){
                console.log(err)
            })
        } else {
            item[0].save(function(err){
                console.log(err)
            })
        }
        res.status(201).json({cart: cart})

    } catch (err) {
        console.log(err);
    }
}

async function settle (req, res) {
    console.log(req.body, "THIS IS THE BODY OF THE TOTAL FUNCTION, Look at me")
    try {
        // const cart = await ShoppingCart.find({_id: req.}).populate('shop').populate('user').populate('items').exec()
    } catch (err){
        console.log(err)
    }
}