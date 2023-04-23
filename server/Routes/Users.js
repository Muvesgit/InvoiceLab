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

	// res.send("test text");
})

// get one
router.get('/:id', getUserById, (req, res) =>{ //this route calls a middleware
	console.log(req.params.id)
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
router.patch('/:id', getUserById, async (req, res) =>{
	if(req.body.firstName != null){
		res.user.firstName = req.body.firstName
	}

	try{
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	}
	catch (error){
		res.status(400).json({ message: error })
	}
})

// delete
router.delete('/:id', (req, res) =>{
	
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