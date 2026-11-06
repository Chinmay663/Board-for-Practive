import mongoose from "mongoose";
//1 scheme

const noteSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title:{
            type:String,
            required: true,
        },
        content:{
            type:String,
            required: true,
        },
    },
    {timestamps:true}
);

//2 model based on scheme
const Note= mongoose.model("Note",noteSchema);

export default Note;
