import express from 'express';
export const home = express.Router();

home.get('/', (req, res) => {
    res.status(200).json({ message: "home page" })
});

