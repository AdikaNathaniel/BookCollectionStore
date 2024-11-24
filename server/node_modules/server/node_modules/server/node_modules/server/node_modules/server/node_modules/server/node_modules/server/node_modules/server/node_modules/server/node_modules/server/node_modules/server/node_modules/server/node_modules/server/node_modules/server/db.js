import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    try {
        await mongoose.connect(process.env.URL);
        
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
    }
};

export { Connection };