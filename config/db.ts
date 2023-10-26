import mongoose from 'mongoose';
let db: any
export const getDbConnection = () => mongoose.connection;
export const connectDB = async (dbURI: string, dbName: string) => {
    await mongoose.connect(dbURI, { dbName });
    // console.log(mongoose.connection)
    // db.connection = mongoose.connection;
    console.log('Connected to MongoDB');
}