import mongoose from "mongoose";

export const connectDB= async ()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESFULLY!");
} catch (error) {
    console.error("ERROR CONNECTING MONGODB",error);
    process.exit(1); //exit with failure
}
};