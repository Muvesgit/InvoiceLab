const express = require('express')
const router = express.Router()
const User = require('../Models/User')

// get all
router.get('/', async (req, res) =>{
	try{
		const users = await User.find()
		res.json(users);
	}
	catch(error){
		res.status(500).json({ message: err.message }) //500 - server error
	}
})

// get one
router.get('/:id', getUserById, (req, res) =>{ //this route calls a middleware
	res.send(res.user)
})

// register
router.post('/', async (req, res) =>{
	let existingUser = await User.findOne({ email : req.body.email.toLowerCase() });
	if(existingUser){
		return res.status(409).json({ message: "A User with this email address already exists! Please provide a different one!" }) //409 - conflicting data
	}

	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
	});
	user.setPassword(req.body.password);

	try{
		const newUser = await user.save();
		res.status(201).json(newUser) //201 - successfully create smth
	}
	catch(err){
		console.log(err);
		res.status(400).json({ message: err.message }) //400 - bad data
	}
})

router.post('/login', async (req, res) =>{
	try{
		let user = await User.findOne({ email : req.body.email.toLowerCase() });

		if (user.validatePassword(req.body.password)) {
			return res.status(201).json({
				message : "Log in successful!",
				status : 201,
				user: user
			})
		}
		else {
			return res.status(400).json({
				message : "The password You have provided does not correspond with the email address."
			});
		}
	}
	catch(err){
		console.log(err);
		return res.status(400).json({
			message : "The email address You have provided could not be found."
		});
	}
})

// update
router.patch('/personalUpdate/:id', getUserById, async (req, res) =>{
	if(req.body.firstName != null && req.body.lastName != null && req.body.email != null){
		res.user.firstName = req.body.firstName
		res.user.lastName = req.body.lastName
		res.user.email = req.body.email
	}

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.patch('/companyUpdate/:id', getUserById, async (req, res) =>{
	if(req.body.name != null && req.body.orgReg != null && req.body.cif != null && req.body.address != null && req.body.bank != null && req.body.account != null){
		res.user.company.name = req.body.name
		res.user.company.orgReg = req.body.orgReg
		res.user.company.cif = req.body.cif
		res.user.company.address = req.body.address
		res.user.company.bank = req.body.bank
		res.user.company.account = req.body.account
	}

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.patch('/addClient/:id', getUserById, async (req, res) =>{
	let newClient = {};

	if(req.body.name != null && req.body.orgReg != null && req.body.cif != null && req.body.address != null && req.body.bank != null && req.body.account != null){
		newClient.name = req.body.name;
		newClient.orgReg = req.body.orgReg;
		newClient.cif = req.body.cif;
		newClient.address = req.body.address;
		newClient.bank = req.body.bank;
		newClient.account = req.body.account;
	}

	res.user.clients.push(newClient);

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.patch('/addProduct/:id', getUserById, async (req, res) =>{
	let newProduct = {};

	if(req.body.name != null && req.body.price){
		newProduct.name = req.body.name;
		newProduct.price = req.body.price;
	}

	res.user.products.push(newProduct);

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.patch('/:id/clientUpdate/:clientId', getUserById, async (req, res) =>{
	let client = res.user.clients.filter((item) => {return item._id == req.params.clientId})[0];

	if(req.body.name != null && req.body.orgReg != null && req.body.cif != null && req.body.address != null && req.body.bank != null && req.body.account != null){
		client.name = req.body.name;
		client.orgReg = req.body.orgReg;
		client.cif = req.body.cif;
		client.address = req.body.address;
		client.bank = req.body.bank;
		client.account = req.body.account;
	}

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.patch('/:id/productUpdate/:productId', getUserById, async (req, res) =>{
	let product = res.user.products.filter((item) => {return item._id == req.params.productId})[0];

	if(req.body.name && req.body.price){
		product.name = req.body.name;
		product.price = Number(req.body.price);
	}

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})


// delete
router.delete('/:id/deleteClient/:clientId', getUserById, async (req, res) =>{
	let client = res.user.clients.filter((item) => {return item._id == req.params.clientId})[0];
	
	let index = res.user.clients.indexOf(client);
	res.user.clients.splice(index, 1);
	
	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

router.delete('/:id/deleteProduct/:productId', getUserById, async (req, res) =>{
	let product = res.user.products.filter((item) => {return item._id == req.params.productId})[0];
	
	let index = res.user.products.indexOf(product);
	res.user.products.splice(index, 1);

	try{
		const updatedUser = await res.user.save()
		return res.status(201).json({
			message : "Update successful!",
			status : 201,
			user: updatedUser
		})
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})



// this is middleware
async function getUserById(req, res, next){
	let user
	try{
		user = await User.findById(req.params.id)
		if(user == null){
			return res.status(404).json({ message: 'Could not find user' });
		}
	}
	catch(error){
		return res.status(500).json({ message: error.message });
	}

	res.user = user
	next()
}

module.exports = router