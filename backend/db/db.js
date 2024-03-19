import mongoose from "mongoose";

const connect = async() =>{
    try {
      await mongoose.connect(process.env.DATABASE)
      console.log('connected to mongodb');
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }

}
export default connect;

