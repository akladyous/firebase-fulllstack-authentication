import express from 'express';
import fakeData from "../../util/fakeData.json" assert {type: 'json'}
export const testRoute = express.Router();

testRoute.get('/test', (req, res, next) => {
    res.status(200).json(fakeData)
});

