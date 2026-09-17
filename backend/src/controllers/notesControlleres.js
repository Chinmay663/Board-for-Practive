import Note from "../models/Note.js"

//get all Notes
export async function getAllNotes (req, res) {
    try{
        const notes= await Note.find();
        res.status(200).json(notes);

    }catch(error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//get Notes Sorted by time of creation Latest first
// will fetch when /api/notes/latest is called
export async function getSortLatestFirst (req, res) {
    try{
        const notes= await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);

    }catch(error){
        console.error("Error in getSortLatestFirst controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


//get Notes by ID
export async function getNotesById (req, res) {
    try{
        const notes= await Note.findById(req.params.id);
        if(!notes) return res.status(404).json({message:"Note not found"});
        res.status(200).json(notes);

    }catch(error){
        console.error("Error in getNotesById controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//create Note
export async function createNote (req, res) {
    try {
        const {title,content}=req.body;
        const newNote = new Note({title,content});
        const saved = await newNote.save();
        res.status(201).json({
            message: "Note created successfully",
            note: saved
        });

    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//Update or Change in Note
export async function updateNote (req, res) {
    try {
        const {title,content}=req.body;
        const updateNote= await Note.findByIdAndUpdate(req.params.id,{"title":title,"content":content},{new:true});
        if(!updateNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({
            message:"Updated Succesfully",
            note: updateNote
        });
    } catch (error) {
        console.error("Error in Update controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//Delete Notes
export async function deleteNote (req, res) {
    try {
        const deleteNote= await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({
            message:"Delete Succesfully",
            note: deleteNote//will return json which is about to be deleted
        });
    } catch (error) {
        console.error("Error in Delete controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}



