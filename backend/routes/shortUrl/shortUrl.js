import express from 'express';
export const shortUrlRoute = express.Router();
import { get } from '../../controllers/get.js'
import { post } from '../../controllers/post.js'

shortUrlRoute.get('/shorturl', get);
shortUrlRoute.post('/shorturl', post);

