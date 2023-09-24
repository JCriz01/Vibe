
import mongoose from "mongoose";

const connectDB = async ()=>{

    try{
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Mongo DB connected: ${connect.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;