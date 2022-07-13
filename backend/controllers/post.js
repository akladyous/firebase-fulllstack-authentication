import validUrl from 'valid-url'
import UAParser from "ua-parser-js"
import Urls from "../models/UrlModel.js"
import { nanoid } from "nanoid";

import { lookup } from "dns";
import { URL } from 'node:url';

export const post = async (req, res) => {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'URL is required' })
    if (!validUrl.isUri(url)) return res.status(400).json({ error: 'URL is not valid' })

    const parser = new UAParser()
    parser.setUA(req.headers['user-agent'])
    const result = parser.getResult()
    // console.log(result)

    try {
        const oUrl = new URL(url)
        lookup(oUrl.hostname, (err) => {
            if (err) return res.status(400).json({ error: 'URL is not valid' })
        })
        const shortUrl = await Urls.create({
            originalUrl: url,
            shortUrl: nanoid(8)
        })
        console.log(shortUrl)
        return res.status(200).json(shortUrl)
    } catch (error) {
        debugger
        console.log(error)
        return res.status(400).json({ error: 'URL is not valid' })
    }
}
