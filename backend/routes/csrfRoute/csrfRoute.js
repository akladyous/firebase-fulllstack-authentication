import express from 'express';
export const csrfRoute = express.Router();

csrfRoute.get('/csrf', (req, res, next) => {
    const token = req.csrfToken()
    console.log('generated csrf token : ', token)
    res.cookie('XSRF-TOKEN', token).sendStatus(200);
})
