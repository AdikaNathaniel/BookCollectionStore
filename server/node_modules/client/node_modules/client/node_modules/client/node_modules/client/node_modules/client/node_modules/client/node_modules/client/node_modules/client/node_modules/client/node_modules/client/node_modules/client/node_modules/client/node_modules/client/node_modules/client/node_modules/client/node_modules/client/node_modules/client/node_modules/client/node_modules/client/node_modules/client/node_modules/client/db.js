import mongoose from "mongoose";
import { config } from 'dotenv';
config();


const Connection = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
      
        await mongoose.connect(mongoUrl, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add connection timeout and socket timeout
            connectTimeoutMS: 10000, // 10 seconds
            socketTimeoutMS: 45000,  // 45 seconds
        });

        // Create a test collection and document
        const testSchema = new mongoose.Schema({
            name: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        });

        // This will create both the database and collection
        const TestModel = mongoose.model('TestCollection', testSchema);

        // Create a test document
        await TestModel.create({ name: 'test_document' });

        console.log("Connected and Database Created");

        // Print all available databases
        const admin = mongoose.connection.db.admin();
        const dbList = await admin.listDatabases();
        console.log("Available databases:", dbList.databases.map(db => db.name));

    } catch (err) {
        console.log("Error:", err);
        // Log more detailed error information
        console.log("Error Name:", err.name);
        console.log("Error Message:", err.message);
    }
};

export { Connection };