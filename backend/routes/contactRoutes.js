const express=require('express');
const router=express.Router();
const {
    getContact,
    getContactId,
    createContactId,
    updateContactId,
    deleteContactId,
}=require('../controllers/contactController');
const validateToken=require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(createContactId);
router.route("/:id").get(getContactId).put(updateContactId).delete(deleteContactId);


// router.route("/").get(getContact);

// router.route("/:id").get(getContactId);

// router.route("/").post(createContactId);

// router.route("/:id").put(updateContactId);

// router.route("/:id").delete(deleteContactId);

module.exports=router;