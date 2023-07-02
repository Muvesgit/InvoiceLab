const express = require('express')
const router = express.Router()
const Invoice = require('../Models/Invoice')

// get all
router.get('/', async (req, res) =>{
	try{
		const invoices = await Invoice.find()
		res.json(invoices);
	}
	catch(error){
		res.status(500).json({ message: err.message }) //500 - server error
	}
})

router.get('/users/:id', async (req, res) =>{
	try{
		const invoices = await Invoice.find({ userId: req.params.id });
		res.json(invoices);
	}
	catch(error){
		res.status(500).json({ message: err.message }) //500 - server error
	}
})

// get one
router.get('/:id', getInvoiceById, (req, res) =>{ //this route calls a middleware
	res.send(res.invoice)
})

// post invoice
router.post('/', async (req, res) =>{
	let invoice = new Invoice({
		userId: req.body.userId,
		docType: req.body.docType,
		docNr: req.body.docNr,
		docDate: req.body.docDate,
		vat: req.body.vat,
		docCurrency: req.body.docCurrency,
		docMessage: req.body.docMessage,
		company: req.body.company,
		client: req.body.client,
		products: req.body.products,
	});

	try{
		const newInvoice = await invoice.save();
		res.status(201).json(newInvoice) //201 - successfully create smth
	}
	catch(err){
		console.log(err);
		res.status(400).json({ message: err.message }) //400 - bad data
	}
})

// this is middleware
async function getInvoiceById(req, res, next){
	let invoice;
	try{
		invoice = await Invoice.findById(req.params.id)
		if(invoice == null){
			return res.status(404).json({ message: 'Could not find invoice' });
		}
	}
	catch(error){
		return res.status(500).json({ message: error.message });
	}

	res.invoice = invoice;
	next();
}

module.exports = router