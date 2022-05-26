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
        console.log("Before Cart")
        const cart = await ShoppingCart.find({_id: req.body.id}).populate('shop').populate('user').populate('items').exec()
        console.log("AFter Cart")
        // const item = await Item.find({id: req.body.item}, function(err, item){
        //     console.log(item, "This is the Item from find")
        // })
        console.log(req.body.item, "Body Item")
        const item = await Item.findOne({id: req.body.item});
        console.log(item.quantity, " and ", Number(item.quantity) - Number(req.body.quantity), "Repair Item")
        item.quantity = Number(item.quantity) - Number(req.body.quantity);
        item.save(function(err){
            console.log(err)
        })
        console.log(item, "This it the new Repair Item")

        const newItem = await Item.create({name: item.name+ " :In Cart9", quantity: req.body.quantity, price: item.price, isPurchased: false, photoUrl: item.photoUrl, user: req.user});
        console.log(newItem, "with user")
        cart[0].items.push(newItem);
        cart[0].save(function(err) {
            console.log(err);
        });

        // if(item.quantity === 0){
        //     Item.findOneAndDelete({id: req.body.item}, function(err){
        //         console.log(err)
        //     })
        // }
        res.status(201).json({cart: cart})

    } catch (err) {
        console.log(err);
    }
}