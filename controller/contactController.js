const asyncHandler = require("express-async-handler")
const Contact = require("../model/contact")
const {validationResult} =require('express-validator')
const User = require("../model/user")


const getAllContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find().populate("user")
    return res.status(200).json(contacts)
})


const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id).populate("user")
    if(!contact){
      return res.status(400).json({msg:"User does not exist"})
    }
    return res.status(200).json(contact)
})

const createContact=asyncHandler(async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    
    const contact = new Contact({
        fullName:req.body.fullName,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        relationship:req.body.relationship,
        user:req.body.user
    })
    await contact.save()

    const userById = await User.findById(req.body.user)
    userById.contact.push(contact);
    await userById.save();

    
    res.status(200).json({message:"Contact Created Successfully"})    
})

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        throw new Error("Contact Not found")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateContact)
})

const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        throw new Error("Contact Not found")
    }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})


module.exports={getAllContacts,getContact,createContact,updateContact,deleteContact}