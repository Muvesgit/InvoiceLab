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

// create
router.post('/', async (req, res) =>{
	const user = new User({
		// TO DO: fill with all necessary data and make checks
	})

	try{
		const newUser = await user.save();
		res.status(201).json(newUser) //201 - successfully create smth
	}
	catch(error){
		res.status(400).json({ message: err.message }) //400 - bad data
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