import * as mongoose from "mongoose";

interface UrlDocument extends mongoose.Document {
    longUrl: string
    shortUrl: string
    expirationTime: string
    startDate: Date
    expiryDate: Date
}

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    expirationTime: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
    }
});

export const Url = mongoose.model<UrlDocument>('url', UrlSchema);