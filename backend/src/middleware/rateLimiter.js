import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
    try {
        const {success} = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({message:"Too many request, Please try again letter"});
        }
        next();
    } catch (error) {
        console.log("Error within Ratelimiter", error);
        next(error);
    }
}

export default rateLimiter;