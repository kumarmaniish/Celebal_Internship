const asyncHandler=require("express-async-handler");
const Contact=require('../models/contactModel');
// because  by using this we dont have to write the try catch block in order the handle the error async handler will do this task
// @desc Gett all Contacts
//@route Get/api/contacts
//@access private

const getContact= asyncHandler(async(req,res)=>{    
    const contacts= await Contact.find({
        user_id:req.user_id
    });
    res.status(200).json(contacts);
})

// @desc Gett all Contacts for id 
//@route Get/api/contacts/id
//@access private

const getContactId=asyncHandler(async(req,res)=>{   
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc create Contacts 
//@route Get/api/contacts
//@access private

const createContactId=asyncHandler(async(req,res)=>{
    console.log("The create contact is ", req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,email,phone,
        user_id:req.user_id
    })
    res.status(201).json(contact);
})
 
// @desc update all Contacts for id 
//@route Get/api/contacts/id
//@access private

const updateContactId=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to updtae other user contacts")
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true},
    );
    res.status(200).json(updatedContact);
})

// @desc delete Contacts for id 
//@route Get/api/contacts/id
//@access private

const deleteContactId=asyncHandler(async(req,res)=>{
    const contact=await Contact.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to updtae other user contacts")
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
   
})

module.exports={getContact, getContactId, createContactId, updateContactId, deleteContactId}