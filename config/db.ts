import { ObjectId } from 'mongodb';
import mongoose, { Condition } from 'mongoose';
export const getDbConnection = () => mongoose.connection;
export const getCollectionId: Condition<ObjectId> = (id: string) => { return new ObjectId(id) }
export const connectDB = async (dbURI: string, dbName: string) => {
    try {
        await mongoose.connect(dbURI, { dbName });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
}