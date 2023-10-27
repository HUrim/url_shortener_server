// ToDo: crud controllers

import { Request, Response } from "express";
import { nanoid }  from 'nanoid';
import { validateUrl } from "../utils/utils";
import { getDbConnection } from "../config/db";
import { Url } from "../models/Url";
const URL_COLLECTION = "Urls"
// const baseShortUrl = process.env.BASE_SHORT_URL
export const getUrls = async (req: Request, res: Response) => {
    await getDbConnection().collection(URL_COLLECTION).find({}).toArray().then(doc => {
        console.log(doc)
        res.status(200).send(doc)
    }).catch(err => {
        res.status(500).send({message: "Internal server error", err: err})
    })
}

export const createUrl = async (req: Request, res: Response) => {
    const { longUrl, expirationTime, startDate, expiryDate } = req.body
    
    const generatedID = nanoid(6);
    console.log(generatedID)
    if(validateUrl(longUrl)) {
        try {
            let url = await getDbConnection().collection(URL_COLLECTION).findOne({ longUrl });
            if (url) {
                res.json(url)
            } else {
                const shortUrl = `${process.env.BASE_SHORT_URL!}/${generatedID}`;
                url = new Url({
                    longUrl,
                    shortUrl,
                    expirationTime,
                    startDate,
                    expiryDate
                })
                getDbConnection().collection(URL_COLLECTION).insertOne(url).then((doc: any) => {
                    console.log("url data saved!")
                    res.json({message: doc})
                }).catch(err => {
                    console.error("Error while saving data: ", err)
                    res.status(500).send("Url data not saved!")
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Server Error')
        }
    }
    console.log("Here to post url")
}