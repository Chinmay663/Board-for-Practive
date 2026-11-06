import express from "express";
import { getAllNotes,createNote,updateNote,deleteNote,getNotesById,getSortLatestFirst } from "../controllers/notesControllers.js";
import protect from '../middleware/authMiddleware.js'; 

const router=express.Router();

router.get("/",protect, getAllNotes);
router.get("/latest",protect, getSortLatestFirst);
router.get("/:id",protect, getNotesById);
router.post("/",protect, createNote);
router.put("/:id",protect, updateNote); 
router.delete("/:id",protect, deleteNote); 

export default router;