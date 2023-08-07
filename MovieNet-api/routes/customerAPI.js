
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

//modelling
const customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
    },
    name:{
        type:String,
    },
    phone:{
        type:Number,
    }
})
const Customer = mongoose.model('customers', customerSchema)

//get
router.get('/',async(req,res)=>{
    const customers = await Customer.find()
    return res.send(customers);
})

//post
router.post('/',async(req,res)=>{
    const result = validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone:req.body.phone
    })
    try{
        const result = await customer.save();
        res.send(result);
    }
    catch(err){
        res.send(err.message);
    }
})

//put
router.put('/:name', async(req,res)=>{
    const customer = await Customer.findOneAndUpdate({name:req.params.name},{
        $set:{
            isGold: req.body.isGold,
            name: req.body.name,
            phone:req.body.phone
        }
    },{new:true})
    if(!customer) return res.send('customer not found');
    res.send(customer);
})
 
//delete
router.delete('/:name', async(req,res)=>{
    const customer = await Customer.findOneAndRemove({name:req.params.name})
    if(!customer) return res.send('customer not found');
    res.send(customer)
})

//joi
function validate(customer){
    const schema = {
        name:Joi.string().min(4).max(10).required(),
        phone:Joi.number().required(),
        isGold:Joi.boolean().required(),
    }
    return Joi.validate(customer, schema);
}

exports.customerAPI = router;
exports.customerSchema = customerSchema;
exports.Customer = Customer;