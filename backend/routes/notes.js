const express = require("express");
const router = express.Router();
const NotesModel = require('../models/Notes');
const FetchUser = require('../middleware/FetchUser');
const { body, validationResult } = require('express-validator');

// Route 1 : fetch all teh notes using GET "/api/note/getUser"login required

router.route('/fetchallnotes').get(FetchUser,async(req,res)=>{
    try {
        const notes =await NotesModel.find({user:req.user.id});

    res.json(notes);
    } catch (error) {
        res.json({error:"Something went wrong"});
    }
});



// Route 2 : Add a note using POST "/api/note/addnote"login required

router.route('/addnote').post([
        body('title','Plese Enter Title').isLength({min:3}),
        body('description','Plese Enter Description, and description must be  5 characters').isLength({min:5})
],FetchUser,async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title,description,tag} = req.body;
    const note = await NotesModel.create({
        title,description,tag,user:req.user.id
    })

    res.json({note});
    } catch (error) {
        res.json({error:"internal server error"});
    }
});



// Route 3 : update a note using put "/api/note/updatenote/:id"login required

router.route('/updatenote/:id').put(FetchUser,async(req,res)=>{

const {title,description,tag} =req.body;

const newNote ={};
if(title){
    newNote.title=title;
}

if(description){
    newNote.description=description;
}

if(tag){
    newNote.tag=tag;
}



try {
    // find the note to be updateed and update it
    let note = await NotesModel.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found note");
    }
        if(note.user.toString() !== req.user.id)
        {
        return res.status(401).send("Not Allowed");

        }

        note =  await NotesModel.findByIdAndUpdate(req.params.id,{
            $set:newNote
        },{new:true});
res.json({status:"success"});

} catch (error) {
res.json({error:"internal Error Occoured",e:error.message});
    
}

});


// Route 4 : delete a note using delete "/api/note/deletenote/:id"login required
router.route('/deletenote/:id').delete(FetchUser,async(req,res)=>{

   
    
    
    try {
        // find the note to be updateed and update it
        let note = await NotesModel.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("Not Found note");
        }
            if(note.user.toString() !== req.user.id)
            {
            return res.status(401).send("Not Allowed");
    
            }
    
            note =  await NotesModel.findByIdAndDelete(req.params.id);
    res.json({msg:"note Deleted"});
    
    } catch (error) {
    res.json({error:"internal Error Occoured"});
        
    }
    
    });

module.exports=router;