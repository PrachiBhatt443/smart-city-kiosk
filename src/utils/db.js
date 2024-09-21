import mongoose from "mongoose";

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
          });
        console.log("connected");
    }
    catch(err)
    {
        throw new Error("Connection failed");
    }
}
export default connect;