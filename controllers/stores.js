const Store = require("../models/store");
const Item = require("../models/item");
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
const { v4: uuidv4 } = require('uuid');

module.exports = {
    index, 
    create,
    details
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const stores = await Store.find({}).populate('user').exec()
        res.status(200).json({stores})
    } catch(err){
        console.log(err)
    }
}

async function details(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const items = await Item.find({user: req.body.owner}).populate('user').populate('store').exec()
        res.status(200).json({items})
    } catch(err){
        console.log(err)
    }
}

function create(req, res){
    console.log(req.file, 'THIS THE BODY -> ', req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' error from aws')
            const store = await Store.create({name: req.body.name, user: req.user, photoUrl: data.Location});
            console.log(store, "THIS IS THE NEW STORE")
			// make sure the post we're sending back has the user populated
			await store.populate('user');
		
            res.status(201).json({store: store})
        })

    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}