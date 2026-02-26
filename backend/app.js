import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import assignmentRoutes from './src/routes/assignmentRoutes.js';
import sqlRoutes from "./src/routes/sqlRoutes.js";
import llmRoutes from "./src/routes/llmRoutes.js";

import { connectToDatabase } from "./src/configdb/PostgreSQL.js";




const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/assignments', assignmentRoutes);
app.use("/api", sqlRoutes);
app.use("/api/llm", llmRoutes);



const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect('mongodb+srv://riteshsoni1138_db_user:tl8mELDmVwyG0Aox@cluster0.g8hoh4v.mongodb.net/?appName=Cluster0');
    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)


}
 start().catch((err) => console.log(err));

connectToDatabase();


app.listen(8000, () => {
    console.log(" app is listning on port 8000")   
});



