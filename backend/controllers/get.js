import validUrl from 'valid-url'
import UAParser from "ua-parser-js"

// import UrlModel from "../models/UrlModel.js"
// const url = "https://www.google.com"

// if (validUrl.isUri(url)) {
//     console.log('ok')
// } else {
//     console.log('ko')
// }
export const get = (req, res) => {
    const parser = new UAParser()
    parser.setUA(req.headers['user-agent'])
    const result = parser.getResult()
    console.log(result)
    res.status(200).json({ data: 'aaaaa' })
}

