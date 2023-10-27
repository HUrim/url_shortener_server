// ToDo: crud controllers

import { Request, Response } from "express";
import { nanoid }  from 'nanoid';
import { expirationAsInt, validateUrl } from "../utils/utils";
import { getDbConnection } from "../config/db";
import { Url } from "../models/Url";
const URL_COLLECTION = "Urls"
// const baseShortUrl = process.env.BASE_SHORT_URL
export const getUrls = async (req: Request, res: Response) => {
    await getDbConnection().collection(URL_COLLECTION).find({}).toArray().then(doc => {
        res.status(200).send(doc)
    }).catch(err => {
        res.status(500).send({message: "Internal server error", err: err})
    })
}

export const createUrl = async (req: Request, res: Response) => {
    const { longUrl, expirationTime, startDate } = req.body
    
    const generatedID = nanoid(6); // added the ability for only 6 characters
    if(validateUrl(longUrl)) {
        try {
            let url = await getDbConnection().collection(URL_COLLECTION).findOne({ longUrl });
            if (url) {
                res.json(url)
            } else {
                const shortUrl = `${process.env.BASE_SHORT_URL!}/${generatedID}`;
                let seconds = expirationAsInt(expirationTime)
                let expiryDate = new Date(new Date(startDate).getTime() + seconds * 1000);
                url = new Url({
                    longUrl,
                    shortUrl,
                    expirationTime,
                    startDate,
                    expiryDate
                })
                getDbConnection().collection(URL_COLLECTION).insertOne(url).then((doc: any) => {
                    res.json({message: doc})
                }).catch(err => {
                    res.status(500).send({message: "Url data not saved!: " + err})
                })
            }
        } catch (error) {
            res.status(500).json('Server Error: ' + error)
        }
    }
}

export const deleteUrl = async (req: Request, res: Response) => {
    const { shortUrl } = req.body
    await (getDbConnection().collection(URL_COLLECTION) as any).deleteOne({shortUrl}, (err: any, doc: any) => { 
        if(err) {
            res.json({message: err});
        } else {
            res.json(doc);
        }
    })
}

export const getShortUrl = async (req: Request, res: Response) => {
    
    const { shortUrlId } = req.params;
    let shortUrl = `${process.env.BASE_SHORT_URL!}/${shortUrlId}`
    await getDbConnection().collection(URL_COLLECTION).findOne({shortUrl}).then(urlData => { 
        if(new Date() > urlData?.expiryDate) {
            return res.status(410).json({error: "Url no longer exists"})
        } else {
            res.redirect(urlData?.longUrl)
        }
    }).catch(err => { 
        res.status(500).json('Server Error: ' + err)
    })
    // app.get('/redirect', (req, res) => {
    //     res.redirect(302, 'https://www.youtube.com/watch?v=cva5NQTnbu4');
    // });
}