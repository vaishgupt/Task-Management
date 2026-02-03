import mongoose from "mongoose";

const connectDB =async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected");
  }catch(err){
    console.error("Error",err);
    
    
  }
}

export default connectDB;