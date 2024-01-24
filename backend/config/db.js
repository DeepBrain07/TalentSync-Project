import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDb = async () => {
	try {
      console.log(process.env.DATABASE_URI)
      const conn = await mongoose.connect(process.env.DATABASE_URI);
	  console.log(`MongoDB connected: ${conn.connection.host}`);
	  console.log(process.env.MONGO_URI)
	} catch (error) {
      console.error(`Error: ${error.message}`);
	  process.exit(1);
	}
}

export default connectDb;