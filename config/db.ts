import mongoose from 'mongoose';
let db: any
export const getDbConnection = () => mongoose.connection;
export const connectDB = async (dbURI: string, dbName: string) => {
    try {
        await mongoose.connect(dbURI, { dbName });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
}